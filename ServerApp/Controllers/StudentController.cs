using System;
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
            IRepository<Speciality, long> specialityRepository, 
            IRepository<Student, long> studentRepository,
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
        
        [HttpGet("find")]
        [RequireQueryParameter("examinationId")]
        [RequireQueryParameter("registrationId")]
        [LoadExamination(Source = ParameterSource.Query)]
        public Student First(Examination examination, [FromQuery] string registrationId)
        {
            return _studentRepository.First(a => examination.Equals(a.Examination) && registrationId == a.RegistrationId);
        }


        [HttpGet]
        [LoadExamination(Source = ParameterSource.Query)]
        [LoadSpeciality(Source = ParameterSource.Query)]
        public IEnumerable<Student> List(Examination examination, Speciality speciality, [FromQuery] string userId)
        {
            IQueryable<Student> set = _studentRepository.Set;
            if (examination != null)
            {
                set = set.Where(s => s.Examination.Id == examination.Id);
            }
            
            if (speciality != null)
            {
                set = set.Where(s => s.Speciality.Id == speciality.Id);
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
        [RequireQueryParameter("examinationId")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished}")]
        [AuthorizePrincipal]
        public CreatedAtActionResult Add(Examination examination, Speciality speciality, 
            [FromBody] StudentForm form, User user )
        {
            
            Assert.RequireNonNull(user, nameof(user));
            Assert.RequireNonNull(form, nameof(form));
            Assert.RequireNonNull(examination, nameof(examination));

            if (speciality != null && !examination.Equals(speciality.Examination))
            {
                throw new InvalidOperationException("{entity.constraints.incompatible}");
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
            
            Student student = new Student
            {
                FullName = form.FullName,
                RegistrationId = form.RegistrationId,
                BirthDate = form.BirthDate,
                Examination = examination,
                RegisterUserId = user.Id,
                Gender = form.Gender
            };
            if (speciality != null)
            {
                student.Speciality = speciality;
                speciality.StudentCount += 1;
                _specialityRepository.Update(speciality);
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
            ErrorMessage = "{examination.requireNoState.finished}")]
        [AuthorizePrincipal]
        public Student Update(Student student, [FromBody] StudentFormInfo form)
        {
            student.BirthDate = form.BirthDate;
            student.FullName = form.FullName;
            student.Gender = form.Gender;

            _studentRepository.Update(student);

            return student;
        }


        [HttpPut("{studentId}/group")]
        [LoadStudent(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished}")]
        [LoadGroup(Source = ParameterSource.Query)]
        [AuthorizePrincipal]
        public StatusCodeResult ChangeGroup(Student student, Group group)
        {
            CheckGroup(group, student.Examination);
            student.Group = group;
            
            _studentRepository.Update(student);
            return StatusCode(StatusCodes.Status202Accepted);
        }


        public void CheckGroup(Group group, Examination examination)
        {
            if (group == null)
            {
                throw new ArgumentNullException(nameof(group));
            }

            if (examination == null) throw new ArgumentNullException(nameof(examination));
            if (examination.Equals(group.Examination))
            {
                throw new InvalidOperationException("");
            }
        }
        

        [HttpPut("{studentId}/speciality")]
        [LoadStudent(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished}")]
        [LoadSpeciality(Source = ParameterSource.Query)]
        [AuthorizePrincipal]
        public StatusCodeResult ChangeSpeciality(Student student, Speciality speciality = null)
        {
            Assert.RequireNonNull(student, nameof(student));
            

            if (speciality != null && student.Examination.Id != speciality.Examination.Id)
            {
                throw new InvalidOperationException();
            } 
            
            
            if ( speciality == null &&  student.Examination.RequireSpeciality)
            {
                throw new InvalidOperationException("{student.constraints.requireSpeciality}");
            }

            if (student.Speciality != null)
            {
                student.Speciality.StudentCount -= 1;
                _specialityRepository.Update(student.Speciality);
            }

            student.Speciality = speciality;
            _studentRepository.Update(student);

            if (speciality != null)
            {
                speciality.StudentCount += 1;
                _specialityRepository.Update(speciality);
            }
            

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{studentId}/registrationId")]
        [LoadStudent(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished}")]
        [LoadSpeciality(Source = ParameterSource.Query)]
        [AuthorizePrincipal]
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
        
        
        [HttpPut("{studentId}/userId")]
        [LoadStudent(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished}")]
        [LoadSpeciality(Source = ParameterSource.Query)]
        [AuthorizePrincipal]
        public StatusCodeResult ChangeUserId(Student student, [FromQuery] string userId)
        {
            
            if (!string.IsNullOrWhiteSpace(userId) && _studentRepository.Exists(s =>
                    student.Examination.Equals(s.Examination) && s.UserId == userId))
            {
                throw new InvalidValueException("{student.constraints.uniqueUserId}");
            }

            student.UserId = userId;

            _studentRepository.Update(student);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpDelete("{studentId}")]
        [LoadStudent(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished}")]
        [AuthorizePrincipal]
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