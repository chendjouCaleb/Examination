using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Loaders.Courses;
using Exam.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers.Courses
{
    [Route("api/scores")]
    public class ScoreController : Controller
    {
        private readonly IRepository<Score, long> _scoreRepository;
        private readonly IRepository<Course, long> _courseRepository;

        public ScoreController(IRepository<Score, long> scoreRepository, IRepository<Course, long> courseRepository)
        {
            _scoreRepository = scoreRepository;
            _courseRepository = courseRepository;
        }


        [HttpGet("{scoreId}")]
        [LoadScore]
        public Score Find(Score score) => score;

        [HttpGet("find/name")]
        [RequireQueryParameters(new[] {"scoreId", "name"})]
        public Score FindByName([FromQuery] long courseId, [FromQuery] string name)
        {
            return this._scoreRepository.First(s => s.CourseId == courseId && s.Name == name);
        }


        [HttpGet]
        [LoadCourse(ParameterName = "courseId", Source = ParameterSource.Query)]
        [RequireQueryParameter("courseId")]
        public IEnumerable<Score> List(Course course)
        {
            return _scoreRepository.Set.Where(g => course.Equals(g.Course)).ToList();
        }


        [HttpPost]
        [RequireQueryParameter("courseId")]
        [LoadCourse(DepartmentItemName = "department", Source = ParameterSource.Query)]
        [IsDepartmentPrincipal]
        public CreatedAtActionResult Add(Course course, [FromBody] ScoreForm form)
        {
            Assert.RequireNonNull(course, nameof(course));
            Assert.RequireNonNull(form, nameof(form));

            double totalRadical = _scoreRepository.List(g => course.Equals(g.Course))
                                      .Sum(e => e.Radical)
                                  + form.Radical;

            if (_scoreRepository.Exists(t => course.Equals(t.Course) && t.Name == form.Name))
            {
                throw new InvalidValueException("{score.constraints.uniqueName}");
            }

            if (totalRadical > course.Radical)
            {
                throw new InvalidValueException("{score.constraints.totalLowerOrEqualsThanRadical}");
            }

            Score score = new Score
            {
                Name = form.Name,
                Radical = form.Radical,
                Course = course
            };

            _scoreRepository.Save(score);

            if (!course.MultipleScore)
            {
                course.MultipleScore = true;
                _courseRepository.Update(course);
            }

            return CreatedAtAction("Find", new {score.Id}, score);
        }


        [HttpPut("{scoreId}/name")]
        [LoadScore(DepartmentItemName = "department", CourseItemName = "course")]
        [RequireQueryParameter("name")]
        [IsDepartmentPrincipal]
        public StatusCodeResult ChangeName(Score score, [FromQuery] string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentNullException(nameof(name));
            }

            if (_scoreRepository.Exists(t => score.Course.Equals(t.Course) && t.Name == name))
            {
                throw new InvalidValueException("{score.constraints.uniqueName}");
            }

            score.Name = name;
            _scoreRepository.Update(score);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpDelete("{scoreId}")]
        [LoadScore(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public NoContentResult Delete(Score score)
        {
            Course course = score.Course;
            _scoreRepository.Delete(score);
            if (_scoreRepository.Count(s => course.Equals(s.Course)) == 0)
            {
                course.MultipleScore = false;
                _courseRepository.Update(course);
            }

            return NoContent();
        }
    }
}