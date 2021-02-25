using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    [Route("api/students")]
    public class StudentController : Controller
    {
        private IRepository<Student, long> _studentRepository;
        private ILogger<StudentController> _logger;

        public StudentController(
            IRepository<Student, long> studentRepository,
            ILogger<StudentController> logger)
        {
            _studentRepository = studentRepository;
            _logger = logger;
        }


        [HttpGet("{studentId}")]
        [LoadStudent]
        public Student Get(Student student) => student;

        [HttpGet("find/registrationId")]
        [RequireQueryParameter("schoolId")]
        [RequireQueryParameter("registrationId")]
        public Student First(long schoolId, [FromQuery] string registrationId)
        {
            return _studentRepository.First(s =>
                schoolId == s.Level.Department.SchoolId && registrationId == s.RegistrationId);
        }

        [HttpGet("count")]
        public long Count([FromQuery] long? levelId,
            [FromQuery] long? schoolId,
            [FromQuery] long? departmentId,
            [FromQuery] long? levelSpecialityId,
            [FromQuery] long? specialityId,
            [FromQuery] string userId)
        {
            var query = _studentRepository.Set;
            if (levelId != null)
            {
                query = query.Where(s => s.LevelId == levelId);
            }

            if (levelSpecialityId != null)
            {
                query = query.Where(s => s.LevelSpecialityId == levelSpecialityId);
            }

            if (specialityId != null)
            {
                query = query.Where(s => s.LevelSpecialityId != null && s.LevelSpeciality.SpecialityId == specialityId);
            }

            if (departmentId != null)
            {
                query = query.Where(s => s.Level.DepartmentId == departmentId);
            }
            
            if (schoolId != null)
            {
                query = query.Where(s => s.Level.Department.SchoolId == schoolId);
            }

            if (!string.IsNullOrWhiteSpace(userId))
            {
                query = query.Where(s => s.UserId == userId);
            }

            return query.LongCount();
        }

        [HttpGet]
        public IEnumerable<Student> List([FromQuery] long? levelId,
            [FromQuery] long? schoolId,
            [FromQuery] long? departmentId,
            [FromQuery] long? levelSpecialityId,
            [FromQuery] long? specialityId,
            [FromQuery] string userId)
        {
            if (levelId != null)
            {
                return _studentRepository.List(s => s.LevelId == levelId);
            }

            if (levelSpecialityId != null)
            {
                return _studentRepository.List(s => s.LevelSpecialityId == levelSpecialityId);
            }

            if (specialityId != null)
            {
                return _studentRepository.List(s => s.LevelSpecialityId != null && s.LevelSpeciality.SpecialityId == specialityId);
            }

            if (departmentId != null)
            {
                return _studentRepository.List(s => s.Level.DepartmentId == departmentId);
            }
            
            if (schoolId != null)
            {
                return _studentRepository.List(s => s.Level.Department.SchoolId == schoolId);
            }

            if (!string.IsNullOrWhiteSpace(userId))
            {
                return _studentRepository.List(s => s.UserId == userId);
            }

            return new Student[] { };
        }


        [HttpPost]
        [ValidModel]
        [RequireQueryParameter("levelId")]
        [LoadLevel(Source = ParameterSource.Query, DepartmentItemName = "department")]
        [LoadLevelSpeciality(Source = ParameterSource.Query)]
        [IsPrincipal]
        public CreatedAtActionResult Add([FromBody] StudentForm form, Level level,
            LevelSpeciality levelSpeciality, Principal principal)
        {
            Assert.RequireNonNull(principal, nameof(principal));
            Assert.RequireNonNull(form, nameof(form));
            Assert.RequireNonNull(level, nameof(level));
            Assert.RequireNonNull(level.Department, nameof(level.Department));
            Assert.RequireNonNull(level.Department.School, nameof(level.Department.School));

            if (levelSpeciality != null && !level.Equals(levelSpeciality.Level))
            {
                throw new IncompatibleEntityException<Level, LevelSpeciality>(level, levelSpeciality);
            }

            if (_studentRepository.Exists(s =>
                level.Department.School.Equals(s.Level?.Department?.School) && s.RegistrationId == form.RegistrationId))
            {
                throw new InvalidValueException("{student.constraints.uniqueRegistrationId}");
            }

            Student student = new Student
            {
                FullName = form.FullName,
                RegistrationId = form.RegistrationId,
                BirthDate = form.BirthDate,
                Level = level,
                LevelSpeciality = levelSpeciality,
                RegisterUserId = principal.UserId,
                Gender = form.Gender
            };

            student = _studentRepository.Save(student);

            _logger.LogInformation($"New Student: {student}");
            return CreatedAtAction("Get", new {student.Id}, student);
        }

        [HttpPut("{studentId}")]
        [ValidModel]
        [LoadStudent(DepartmentItemName = "department")]
        [IsPrincipal]
        public Student Update(Student student, [FromBody] StudentFormInfo form)
        {
            student.BirthDate = form.BirthDate;
            student.FullName = form.FullName;
            student.Gender = form.Gender;

            _studentRepository.Update(student);
            return student;
        }


        [HttpPut("{studentId}/level")]
        [RequireQueryParameter("levelId")]
        [LoadStudent(DepartmentItemName = "department")]
        [LoadLevel(Source = ParameterSource.Query)]
        [LoadLevelSpeciality(Source = ParameterSource.Query)]
        [IsPrincipal]
        public StatusCodeResult ChangeLevel(Student student, Level level, LevelSpeciality levelSpeciality = null)
        {
            Assert.RequireNonNull(student, nameof(student));
            Assert.RequireNonNull(level, nameof(level));

            if (student.Level.DepartmentId != level.DepartmentId)
            {
                throw new IncompatibleEntityException<Student, Level>(student, level);
            }

            if (levelSpeciality != null && level.Id != levelSpeciality.LevelId)
            {
                throw new IncompatibleEntityException(level, levelSpeciality);
            }

            student.Level = level;
            student.LevelSpeciality = levelSpeciality;
            _studentRepository.Update(student);
            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpDelete("{studentId}/levelSpeciality")]
        [LoadStudent(DepartmentItemName = "department")]
        [LoadLevelSpeciality(Source = ParameterSource.Query)]
        [IsPrincipal]
        public StatusCodeResult RemoveLevelSpeciality(Student student)
        {
            Assert.RequireNonNull(student, nameof(student));

            if (student.LevelSpeciality == null)
            {
                return StatusCode(StatusCodes.Status202Accepted);
            }

            student.LevelSpeciality = null;
            _studentRepository.Update(student);
            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{studentId}/registrationId")]
        [LoadStudent(DepartmentItemName = "department")]
        [IsPrincipal]
        public StatusCodeResult ChangeRegistrationId(Student student, [FromQuery] string registrationId)
        {
            Assert.RequireNonNull(student, nameof(student));
            Assert.RequireNonNull(student.Level, nameof(student.Level));
            Assert.RequireNonNull(student.Level.Department, nameof(student.Level.Department));
            Assert.RequireNonNull(student.Level.Department.School, nameof(student.Level.Department.School));

            if (_studentRepository.Exists(s =>
                student.Level.Department.School.Equals(s.Level.Department.School) &&
                s.RegistrationId == registrationId))
            {
                throw new InvalidValueException("{student.constraints.uniqueRegistrationId}");
            }

            student.RegistrationId = registrationId;
            _studentRepository.Update(student);
            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{studentId}/userId")]
        [RequireQueryParameter("userId")]
        [LoadStudent(DepartmentItemName = "department")]
        [IsPrincipal]
        public StatusCodeResult ChangeUserId(Student student, [FromQuery] string userId)
        {
            Assert.RequireNonNull(student, nameof(student));
            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new ArgumentNullException(nameof(userId));
            }

            if (_studentRepository.Exists(s =>
                student.Level.Department.School.Equals(s.Level.Department.School) && s.UserId == userId))
            {
                throw new InvalidValueException("{student.constraints.uniqueUserId}");
            }

            student.UserId = userId;

            _studentRepository.Update(student);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpDelete("{studentId}/userId")]
        [LoadStudent(DepartmentItemName = "department")]
        [IsPrincipal]
        public StatusCodeResult RemoveUserId(Student student)
        {
            Assert.RequireNonNull(student, nameof(student));
            student.UserId = null;
            _studentRepository.Update(student);
            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpDelete("{studentId}")]
        [LoadStudent(DepartmentItemName = "department")]
        [IsPrincipal]
        public NoContentResult Delete(Student student)
        {
            _studentRepository.Delete(student);
            return NoContent();
        }
    }
}