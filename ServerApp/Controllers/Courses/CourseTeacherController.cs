using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Loaders;
using Exam.Loaders.Courses;
using Exam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers.Courses
{
    [Route("api/courseTeachers")]
    public class CourseTeacherController:Controller
    {
        private DbContext _dbContext;
        private IRepository<CourseTeacher, long> _courseTeacherRepository;
        private ILogger<CourseTeacherController> _logger;

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
        [AuthorizeDepartmentPrincipal]
        public CreatedAtActionResult Add(Course course, Teacher teacher,
            [FromBody] AddCourseTeacherForm form)
        {
            throw new NotImplementedException();
        }

        [HttpPut("{courseTeacherId}/tutorial")]
        [LoadCourseTeacher(DepartmentItemName = "department")]
        [AuthorizeDepartmentPrincipal]
        public StatusCodeResult Tutorial(CourseTeacher courseTeacher)
        {
            throw new NotImplementedException();
        }
        
        [HttpPut("{courseTeacherId}/lecture")]
        [LoadCourseTeacher(DepartmentItemName = "department")]
        [AuthorizeDepartmentPrincipal]
        public StatusCodeResult Lecture(CourseTeacher courseTeacher)
        {
            throw new NotImplementedException();
        }
        
        [HttpPut("{courseTeacherId}/principal")]
        [LoadCourseTeacher(DepartmentItemName = "department")]
        [AuthorizeDepartmentPrincipal]
        public StatusCodeResult IsPrincipal(CourseTeacher courseTeacher)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{courseTeacherId}")]
        [LoadCourseTeacher(DepartmentItemName = "department")]
        [AuthorizeDepartmentPrincipal]
        public NoContentResult Delete(CourseTeacher courseTeacher, [FromQuery] bool courseHour,
            [FromQuery] bool courseSession)
        {
            throw new NotImplementedException();
        }
    }
}