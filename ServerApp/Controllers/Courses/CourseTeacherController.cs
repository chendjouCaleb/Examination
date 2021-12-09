using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Loaders.Courses;
using Exam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers.Courses
{
    [Route("api/courseTeachers")]
    public class CourseTeacherController:Controller
    {
        private DbContext _dbContext;
        private IRepository<CourseTeacher, long> _courseTeacherRepository;

        public CourseTeacherController(DbContext dbContext, IRepository<CourseTeacher, long> courseTeacherRepository)
        {
            _dbContext = dbContext;
            _courseTeacherRepository = courseTeacherRepository;
        }

        [HttpGet("{courseTeacherId}")]
        public CourseTeacher Get(long courseTeacherId)
        {
            CourseTeacher courseTeacher = _dbContext.Set<CourseTeacher>().Find(courseTeacherId);
            return courseTeacher;
        }

        [HttpGet]
        public IEnumerable<CourseTeacher> List([FromQuery] long? courseId, [FromQuery] long? teacherId)
        {
            if (courseId != null)
            {
                return _courseTeacherRepository.List(c => c.CourseId == courseId);
            }
            
            if (teacherId != null)
            {
                return _courseTeacherRepository.List(c => c.TeacherId == teacherId);
            }

            return new CourseTeacher[] { };
        }


        [HttpPost]
        [LoadCourse(Source = ParameterSource.Query, DepartmentItemName = "department")]
        [LoadTeacher(Source = ParameterSource.Query)]
        [IsDepartmentPrincipal]
        [ValidModel]
        public CreatedAtActionResult Add(Course course, Teacher teacher,
            [FromBody] AddCourseTeacherForm form)
        {
            Assert.RequireNonNull(course, nameof(course));
            Assert.RequireNonNull(teacher, nameof(teacher));
            Assert.RequireNonNull(form, nameof(form));

            if (!teacher.Department.Equals(course.Level.Department))
            {
                throw new IncompatibleEntityException(course, teacher);
            }

            if (_courseTeacherRepository.Exists(c => course.Equals(c.Course) && teacher.Equals(c.Teacher)))
            {
                throw new InvalidOperationException("{courseTeacher.constraints.unique}");
            }

            CourseTeacher courseTeacher = new CourseTeacher
            {
                Course = course,
                Teacher = teacher,
                Tutorial = form.Tutorial,
                Lecture = form.Lecture
            };

            if (form.IsPrincipal)
            {
                _RemoveAllPrincipalRole(course);
                courseTeacher.IsPrincipal = true;
            }

            _dbContext.Add(courseTeacher);
            _dbContext.SaveChanges();

            return CreatedAtAction("Get", new {courseTeacherId = courseTeacher.IsPrincipal}, courseTeacher);
        }

        [HttpPut("{courseTeacherId}/tutorial")]
        [LoadCourseTeacher(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public StatusCodeResult Tutorial(CourseTeacher courseTeacher)
        {
            Assert.RequireNonNull(courseTeacher, nameof(courseTeacher));
            courseTeacher.Tutorial = !courseTeacher.Tutorial;
            _courseTeacherRepository.Update(courseTeacher);

            return Ok();
        }
        
        [HttpPut("{courseTeacherId}/lecture")]
        [LoadCourseTeacher(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public StatusCodeResult Lecture(CourseTeacher courseTeacher)
        {
            Assert.RequireNonNull(courseTeacher, nameof(courseTeacher));
            courseTeacher.Lecture = !courseTeacher.Lecture;
            _courseTeacherRepository.Update(courseTeacher);

            return Ok();
        }
        
        [HttpPut("{courseTeacherId}/principal")]
        [LoadCourseTeacher(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public StatusCodeResult IsPrincipal(CourseTeacher courseTeacher)
        {
            Assert.RequireNonNull(courseTeacher, nameof(courseTeacher));
            _RemoveAllPrincipalRole(courseTeacher.Course);

            courseTeacher.IsPrincipal = true;
            _dbContext.Update(courseTeacher);
            _dbContext.SaveChanges();

            return Ok();
        }

        private void _RemoveAllPrincipalRole(Course course)
        {
            IList<CourseTeacher> courseTeachers = _dbContext.Set<CourseTeacher>()
                .Where(c => c.CourseId == course.Id).ToArray();

            foreach (var item in courseTeachers)
            {
                item.IsPrincipal = false;
                _dbContext.Update(item);
            }
        }

        [HttpDelete("{courseTeacherId}")]
        [LoadCourseTeacher(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public NoContentResult Delete(CourseTeacher courseTeacher, [FromQuery] bool courseHour,
            [FromQuery] bool courseSession)
        {
            _courseTeacherRepository.Delete(courseTeacher);
            return NoContent();
        }
    }
}