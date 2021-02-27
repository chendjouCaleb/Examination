using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Loaders;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    [Route("api/teachers")]
    public class TeacherController : Controller
    {
        private readonly IRepository<Teacher, long> _teacherRepository;
        private readonly MemberController _memberController;
        private readonly ILogger<TeacherController> _logger;


        public TeacherController(IRepository<Teacher, long> teacherRepository,
            MemberController memberController,
            ILogger<TeacherController> logger)
        {
            _teacherRepository = teacherRepository;
            _memberController = memberController;
            _logger = logger;
        }


        [HttpGet("{teacherId}")]
        [LoadTeacher]
        public Teacher Get(Teacher teacher) => teacher;

        [HttpGet]
        [LoadDepartment(Source = ParameterSource.Query)]
        public IEnumerable<Teacher> List([FromQuery] long? departmentId, [FromQuery] string userId)
        {
            if (departmentId != null)
            {
                return _teacherRepository.List(c => c.DepartmentId == departmentId.Value);
            }

            if (userId != null)
            {
                return _teacherRepository.List(c => c.UserId == userId);
            }

            return new Teacher[] { };
        }


        [HttpPost]
        [RequireQueryParameter("departmentId")]
        [LoadDepartment(Source = ParameterSource.Query)]
        [AuthorizeDepartmentPrincipal]
        public ObjectResult Add(Department department, [FromQuery] string[] userId)
        {
            Assert.RequireNonNull(department, nameof(department));
            Assert.RequireNonNull(userId, nameof(userId));
            List<string> ids = new List<string>();

            foreach (var id in userId)
            {
                if (!_teacherRepository.Exists(s => department.Equals(s.Department) && s.UserId == id))
                {
                    ids.Add(id);
                }
            }

            List<Teacher> teachers = new List<Teacher>();

            foreach (var id in ids)
            {
                teachers.Add(_Add(department, id));
            }

            return StatusCode(StatusCodes.Status201Created, teachers);
        }


        public Teacher _Add(Department department, [FromQuery] string userId)
        {
            Assert.RequireNonNull(department, nameof(department));
            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new ArgumentNullException(nameof(userId));
            }

            if (_teacherRepository.Exists(s => department.Equals(s.Department) && s.UserId == userId))
            {
                throw new InvalidValueException("{teacher.constraints.uniqueUserByDepartment}");
            }

            Teacher teacher = new Teacher
            {
                UserId = userId,
                Member = _memberController._Add(department.School, userId),
                Department = department
            };

            teacher = _teacherRepository.Save(teacher);

            _logger.LogInformation($"New teacher: {teacher}");
            return teacher;
        }


        [HttpDelete("{teacherId}")]
        [LoadTeacher(DepartmentItemName = "department")]
        [AuthorizeDepartmentPrincipal]
        public NoContentResult Delete(Teacher teacher)
        {
            Assert.RequireNonNull(teacher, nameof(teacher));
            _teacherRepository.Delete(teacher);
            return NoContent();
        }
    }
}