using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers.Courses
{
    [Route("api/scores")]
    public class ScoreController : Controller
    {
        private readonly DbContext _dbContext;

        public ScoreController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet("{scoreId}")]
        [LoadScore]
        public Score Find(Score score) => score;

        [HttpGet("find/name")]
        [RequireQueryParameters(new[] {"scoreId", "name"})]
        public Score FindByName([FromQuery] long courseId, [FromQuery] string name)
        {
            return _dbContext.Set<Score>().First(s => s.CourseId == courseId && s.Name == name);
        }


        [HttpGet]
        [LoadCourse(ParameterName = "courseId", Source = ParameterSource.Query)]
        [RequireQueryParameter("courseId")]
        public IEnumerable<Score> List(Course course)
        {
            return _dbContext.Set<Score>().Where(g => course.Equals(g.Course)).ToList();
        }


        [HttpPost]
        [RequireQueryParameter("courseId")]
        [LoadCourse(DepartmentItemName = "department", Source = ParameterSource.Query)]
        [IsDepartmentPrincipal]
        public CreatedAtActionResult Add(Course course, [FromBody] ScoreForm form)
        {
            Assert.RequireNonNull(course, nameof(course));
            Assert.RequireNonNull(form, nameof(form));

            double totalRadical = _dbContext.Set<Score>().Where(g => course.Equals(g.Course))
                                      .Sum(e => e.Radical)
                                  + form.Radical;

            if (_dbContext.Set<Score>().Any(t => course.Equals(t.Course) && t.Name == form.Name))
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

            _dbContext.Set<Score>().Add(score);

            if (!course.MultipleScore)
            {
                course.MultipleScore = true;
                _dbContext.Set<Course>().Update(course);
            }

            _dbContext.SaveChanges();

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

            if (_dbContext.Set<Score>().Any(t => score.Course.Equals(t.Course) && t.Name == name))
            {
                throw new InvalidValueException("{score.constraints.uniqueName}");
            }

            score.Name = name;
            _dbContext.Set<Score>().Update(score);
            _dbContext.SaveChanges();

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpDelete("{scoreId}")]
        [LoadScore(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public NoContentResult Delete(Score score)
        {
            Course course = score.Course;
            _dbContext.Set<Score>().Remove(score);
            if (_dbContext.Set<Score>().Count(s => course.Equals(s.Course)) == 0)
            {
                course.MultipleScore = false;
                _dbContext.Set<Course>().Update(course);
            }

            _dbContext.SaveChanges();
            return NoContent();
        }

        
        [HttpDelete]
        [RequireQueryParameter("courseId")]
        [LoadCourse(DepartmentItemName = "department", Source = ParameterSource.Query)]
        [IsDepartmentPrincipal]
        public async Task<NoContentResult> DeleteAll(Course course)
        {
            var scores = await _dbContext.Set<Score>().Where(s => s.CourseId == course.Id).ToListAsync();
            _dbContext.RemoveRange(scores);
            
            course.MultipleScore = false;
            _dbContext.Set<Course>().Update(course);
            
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}