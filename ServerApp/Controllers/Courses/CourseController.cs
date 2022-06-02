using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Exceptions;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Loaders.Courses;
using Exam.Models;
using Exam.Persistence.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers.Courses
{
    [RouteAttribute("api/courses")]
    public class CourseController : Controller
    {
        private IRepository<Course, long> _courseRepository;
        private IRepository<LevelSpeciality, long> _levelSpecialityRepository;
        private CourseLevelSpecialityController _courseLevelSpecialityController;
        private ICourseLevelSpecialityRepository _courseLevelSpecialityRepository;
        private ILogger<CourseController> _logger;


        public CourseController(IRepository<Course, long> courseRepository,
            CourseLevelSpecialityController courseLevelSpecialityController,
            IRepository<LevelSpeciality, long> levelSpecialityRepository,
            ICourseLevelSpecialityRepository courseLevelSpecialityRepository,
            ILogger<CourseController> logger)
        {
            _courseRepository = courseRepository;
            _courseLevelSpecialityController = courseLevelSpecialityController;
            _levelSpecialityRepository = levelSpecialityRepository;
            _courseLevelSpecialityRepository = courseLevelSpecialityRepository;
            _logger = logger;
        }


        [HttpGet("{courseId}")]
        [LoadCourse]
        public Course Get(Course course)
        {
            return course;
        }

        [HttpGet("find/code")]
        public Course FindByCode([FromQuery] long departmentId, [FromQuery] string code)
        {
            return _courseRepository.First(c => c.Level.DepartmentId == departmentId && c.Code == code);
        }

        public Course FindByCode(Level level, string code)
        {
            Assert.RequireNonNull(level, nameof(level));
            return _courseRepository.First(c => c.LevelId == level.Id && c.Code == code);
        }

        public Course FindByCode(Department department, string code)
        {
            Assert.RequireNonNull(department, nameof(department));
            return _courseRepository.First(c => c.LevelId == department.Id && c.Code == code);
        }

        [HttpGet]
        public IEnumerable<Course> List([FromQuery] long levelId, 
            [FromQuery] long? departmentId,
            [FromQuery] long? schoolId,
            [FromQuery] long? specialityId)
        {
            if (specialityId != null)
            {
                return _courseLevelSpecialityRepository
                    .List(c => c.LevelSpeciality.SpecialityId == specialityId)
                    .Select(c => c.Course);
            }

            if (schoolId != null)
            {
                return _courseRepository.List(c => c.Level.Department.SchoolId == schoolId);
            }
            
            if (departmentId != null)
            {
                return _courseRepository.List(c => c.Level.DepartmentId == departmentId);
            }

            return _courseRepository.List(c => c.LevelId == levelId);
        }


        [HttpPost]
        [RequireQueryParameter("levelId")]
        [ValidModel]
        [LoadLevel(Source = ParameterSource.Query, DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public CreatedAtActionResult Add([FromBody] CourseForm form, Level level, [FromQuery] long[] levelSpecialityId)
        {
            Course course = Add(form, level);

            if (!course.IsGeneral)
            {
                foreach (var id in levelSpecialityId)
                {
                    _courseLevelSpecialityController.Add(course, _levelSpecialityRepository.Find(id));
                }
            }

            return CreatedAtAction("Get", new {CourseId = course.Id}, course);
        }


        public Course Add(CourseForm form, Level level)
        {
            Assert.RequireNonNull(form, nameof(form));
            Assert.RequireNonNull(level, nameof(level));

            if (FindByCode(level.Department, form.Code) != null)
            {
                throw new UniqueValueException("{course.constraints.uniqueCode}");
            }


            Course course = new Course
            {
                Name = form.Name,
                Code = form.Code,
                Coefficient = form.Coefficient,
                Description = form.Description,
                Radical = form.Radical,
                IsGeneral = form.IsGeneral,
                Level = level,
                Department = level.Department,
                School = level.Department.School
            };
            _courseRepository.Save(course);

            _logger.LogInformation($"Course created: {course}");

            return course;
        }


        [HttpPut("{courseId}")]
        [LoadCourse(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public ObjectResult Edit(Course course, [FromBody] CourseForm form)
        {
            Assert.RequireNonNull(course, nameof(course));
            Assert.RequireNonNull(form, nameof(form));

            Course found = FindByCode(course.Level, form.Code);

            if (found != null && !found.Equals(course))
            {
                throw new UniqueValueException("{course.constraints.uniqueCode}");
            }

            course.Code = form.Code;
            course.Coefficient = form.Coefficient;
            course.Description = form.Description;
            course.Name = form.Name;
            course.Radical = form.Radical;

            _courseRepository.Update(course);
            return Accepted(course);
        }

        [HttpPut("{courseId}/general")]
        [LoadCourse(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public StatusCodeResult General(Course course)
        {
            Assert.RequireNonNull(course, nameof(course));

            // A general cannot have a courseLevelSpeciality.
            _courseLevelSpecialityController.DeleteAll(course);
            course.IsGeneral = true;

            _courseRepository.Update(course);
            return Ok();
        }
        
        
        [HttpPut("{courseId}/chapterText")]
        [LoadCourse(DepartmentItemName = "department", SchoolItemName = "school")]
        [IsPlanner]
        public StatusCodeResult ChapterText(Course course, [FromForm] string chapterText)
        {
            Assert.RequireNonNull(course, nameof(course));
            Assert.RequireNonNull(chapterText, nameof(chapterText));

            course.ChapterText = chapterText;

            _courseRepository.Update(course);
            return Ok();
        }

        [HttpPut("{courseId}/restrict")]
        [LoadCourse(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public StatusCodeResult Restrict(Course course, [FromQuery] long[] levelSpecialityId)
        {
            Assert.RequireNonNull(course, nameof(course));
            Assert.RequireNonNull(levelSpecialityId, nameof(levelSpecialityId));

            course.IsGeneral = false;

            foreach (var id in levelSpecialityId)
            {
                _courseLevelSpecialityController.Add(course, _levelSpecialityRepository.Find(id));
            }

            _courseRepository.Update(course);

            return Ok();
        }


        [HttpDelete("{courseId}")]
        [LoadCourse(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public NoContentResult Delete(Course course)
        {
            _courseLevelSpecialityController.DeleteAll(course);
            _courseRepository.Delete(course);
            _logger.LogInformation($"Course deleted: {course}");
            return NoContent();
        }
    }
}