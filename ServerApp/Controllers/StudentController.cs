﻿using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Filters;
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
        private IRepository<Examination, long> _examinationRepository;
        private IRepository<Speciality, long> _specialityRepository;
        private IRepository<Student, long> _studentRepository;
        private ILogger<StudentController> _logger;

        public StudentController(IRepository<Examination, long> examinationRepository,
            IRepository<Speciality, long> specialityRepository, IRepository<Student, long> studentRepository,
            ILogger<StudentController> logger)
        {
            _examinationRepository = examinationRepository;
            _specialityRepository = specialityRepository;
            _studentRepository = studentRepository;
            _logger = logger;
        }


        [HttpGet("{studentId}")]
        [LoadStudent]
        public Student Find(Student student) => student;


        [HttpGet]
        [LoadExamination(Source = ParameterSource.Query)]
        public IEnumerable<Student> List(Examination examination, [FromQuery] string userId)
        {
            IQueryable<Student> set = _studentRepository.Set;
            if (examination != null)
            {
                set = set.Where(s => s.Examination.Id == examination.Id);
            }

            if (!string.IsNullOrWhiteSpace(userId))
            {
                set = set.Where(s => s.UserId == userId);
            }

            return set.ToList();
        }


        [HttpPost]
        [LoadExamination(Source = ParameterSource.Query)]
        [LoadSpeciality(Source = ParameterSource.Query)]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        [AuthorizeExaminationAdmin]
        public CreatedAtActionResult Add([FromBody] StudentForm form, [FromQuery] string userId,
            Examination examination, Speciality speciality)
        {
            Assert.RequireNonNull(form, nameof(form));
            Assert.RequireNonNull(examination, nameof(examination));

            if (speciality != null && !examination.Equals(speciality.Examination))
            {
                throw new InvalidOperationException();
            }

            if (speciality == null && examination.RequireSpeciality)
            {
                throw new InvalidOperationException("{student.constraints.requireSpeciality}");
            }

            if (_studentRepository.Exists(s =>
                examination.Equals(s.Examination) && s.RegistrationId == form.RegistrationId))
            {
                throw new InvalidValueException("{student.constraints.uniqueRegistrationId}");
            }

            if (!string.IsNullOrWhiteSpace(userId) && _studentRepository.Exists(s =>
                    examination.Equals(s.Examination) && s.UserId == userId))
            {
                throw new InvalidValueException("{student.constraints.uniqueUser}");
            }

            Student student = new Student
            {
                FullName = form.RegistrationId,
                RegistrationId = form.RegistrationId,
                BirthDate = form.BirthDate,
                Examination = examination
            };
            if (speciality != null)
            {
                student.Speciality = speciality;
                speciality.StudentCount += 1;
                _specialityRepository.Update(speciality);
            }

            if (!string.IsNullOrWhiteSpace(userId))
            {
                student.UserId = userId;
            }

            _studentRepository.Save(student);

            _logger.LogInformation($"New Student: {student}");

            examination.StudentCount += 1;
            _examinationRepository.Update(examination);
            return CreatedAtAction("Find", new {student.Id}, student);
        }

        [HttpPut("{studentId}")]
        [LoadStudent(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        [AuthorizeExaminationAdmin]
        public Student Edit(Student student, [FromBody] StudentForm form)
        {
            student.BirthDate = form.BirthDate;
            student.FullName = form.FullName;

            _studentRepository.Update(student);

            return student;
        }

        [HttpPut("{studentId}/speciality")]
        [LoadStudent(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        [LoadSpeciality(Source = ParameterSource.Query)]
        [AuthorizeExaminationAdmin]
        public StatusCodeResult ChangeSpeciality(Student student, Speciality speciality)
        {
            Assert.RequireNonNull(student, nameof(student));
            Assert.RequireNonNull(speciality, nameof(speciality));

            if (student.ExaminationId != speciality.ExaminationId)
            {
                throw new InvalidProgramException();
            }

            if (student.Speciality != null)
            {
                student.Speciality.StudentCount -= 1;
                _specialityRepository.Update(student.Speciality);
            }

            student.Speciality = speciality;
            _studentRepository.Update(student);
            speciality.StudentCount += 1;
            _specialityRepository.Update(speciality);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{studentId}/registrationId")]
        [LoadStudent(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        [LoadSpeciality(Source = ParameterSource.Query)]
        [AuthorizeExaminationAdmin]
        public StatusCodeResult ChangeRegistrationId(Student student, [FromQuery] string registrationId)
        {
            if (_studentRepository.Exists(s =>
                student.Examination.Equals(s.Examination) && s.RegistrationId == registrationId))
            {
                throw new InvalidValueException("{student.constraints.uniqueRegistrationId}");
            }

            student.RegistrationId = registrationId;

            _studentRepository.Update(student);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{studentId}")]
        [LoadStudent(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        [AuthorizeExaminationAdmin]
        public NoContentResult Delete(Student student)
        {
            if (student.Speciality != null)
            {
                student.Speciality.StudentCount -= 1;
                _specialityRepository.Update(student.Speciality);
            }

            student.Examination.StudentCount -= 1;
            _examinationRepository.Update(student.Examination);

            _studentRepository.Delete(student);
            return NoContent();
        }
    }
}