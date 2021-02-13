using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
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
    [Route("api/applications")]
    public class ApplicationController : Controller
    {
        private StudentController _studentController;
        private IRepository<Application, long> _applicationRepository;
        private IRepository<Student, long> _studentRepository;
        private ILogger<ApplicationController> _logger;

        public ApplicationController(StudentController studentController,
            IRepository<Application, long> applicationRepository,
            IRepository<Student, long> studentRepository,
            ILogger<ApplicationController> logger)
        {
            _studentController = studentController;
            _applicationRepository = applicationRepository;
            _studentRepository = studentRepository;
            _logger = logger;
        }

        [HttpGet("{applicationId}")]
        [LoadApplication]
        public ObjectResult Find(Application application) => Ok(application);


        [HttpGet]
        public IEnumerable<Application> List([FromQuery] long? levelId,
            [FromQuery] long? departmentId,
            [FromQuery] long? schoolId,
            [FromQuery] long? levelSpecialityId,
            [FromQuery] long? specialityId,
            [FromQuery] string userId)
        {
            if (levelId != null)
            {
                return _applicationRepository.List(s => s.LevelId == levelId);
            }

            if (levelSpecialityId != null)
            {
                return _applicationRepository.List(s => s.LevelSpecialityId == levelSpecialityId);
            }

            if (specialityId != null)
            {
                return _applicationRepository.List(s => s.LevelSpeciality.SpecialityId == specialityId);
            }

            if (departmentId != null)
            {
                return _applicationRepository.List(s => s.Level.DepartmentId == departmentId);
            }
            
            if (schoolId != null)
            {
                return _applicationRepository.List(s => s.Level.Department.SchoolId == schoolId);
            }

            if (!string.IsNullOrWhiteSpace(userId))
            {
                return _applicationRepository.List(s => s.UserId == userId);
            }

            return new Application[] { };
        }

        [HttpGet("find/registrationId")]
        [RequireQueryParameter("registrationId")]
        public Application FindByRegistration([FromQuery] long? schoolId, [FromQuery] long? levelId,
            [FromQuery] string registrationId)
        {
            if (schoolId != null)
            {
                return _applicationRepository.First(a =>
                    a.Level.Department.SchoolId == schoolId && a.RegistrationId == registrationId);
            }

            return _applicationRepository.First(a => a.LevelId == levelId && a.RegistrationId == registrationId);
        }

        [HttpPost]
        [ValidModel]
        [RequireQueryParameter("levelId")]
        [LoadLevel(Source = ParameterSource.Query)]
        [LoadLevelSpeciality(Source = ParameterSource.Query)]
        public CreatedAtActionResult Add([FromBody] ApplicationForm form, Level level,
            LevelSpeciality levelSpeciality, User user)
        {
            Assert.RequireNonNull(level, nameof(level));
            Assert.RequireNonNull(form, nameof(form));
            Assert.RequireNonNull(user, nameof(user));

            if (_studentRepository.Exists(s =>
                level.Department.School.Equals(s.Level.Department.School) && s.UserId == user.Id))
            {
                throw new InvalidOperationException("{application.student.constraints.uniqueUserId}");
            }

            if (levelSpeciality != null && !level.Equals(levelSpeciality.Level))
            {
                throw new IncompatibleEntityException<Level, LevelSpeciality>(level, levelSpeciality);
            }

            if (_applicationRepository.Exists(a => level.Equals(a.Level) && a.UserId == user.Id))
            {
                throw new InvalidOperationException("{application.constraints.uniqueUserId}");
            }

            Application application = new Application
            {
                FullName = form.FullName,
                Gender = form.Gender,
                RegistrationId = form.RegistrationId,
                BirthDate = form.BirthDate,
                Level = level,
                LevelSpeciality = levelSpeciality,
                UserId = user.Id
            };

            _applicationRepository.Save(application);
            _logger.LogInformation($"New Application: {application}");
            return CreatedAtAction("Find", new {application.Id}, application);
        }


        [HttpPut("{applicationId}")]
        [ValidModel]
        [LoadApplication]
        [AuthorizeApplicationAuthor]
        public AcceptedResult Update(Application application, [FromBody] ApplicationForm form)
        {
            application.FullName = form.FullName;
            application.RegistrationId = form.RegistrationId;
            application.BirthDate = form.BirthDate;
            application.Gender = form.Gender;

            _applicationRepository.Update(application);

            return Accepted(application);
        }

        [HttpPut("{applicationId}/levelSpeciality")]
        [LoadApplication]
        [RequireQueryParameter("levelSpecialityId")]
        [LoadLevelSpeciality(Source = ParameterSource.Query)]
        [AuthorizeApplicationAuthor]
        public StatusCodeResult ChangeSpeciality(Application application, LevelSpeciality levelSpeciality)
        {
            Assert.RequireNonNull(application, nameof(application));
            Assert.RequireNonNull(levelSpeciality, nameof(levelSpeciality));


            if (!application.Level.Equals(levelSpeciality.Level))
            {
                throw new IncompatibleEntityException<Application, LevelSpeciality>(application, levelSpeciality);
            }

            application.LevelSpeciality = levelSpeciality;
            _applicationRepository.Update(application);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpDelete("{applicationId}/levelSpeciality")]
        [LoadApplication]
        [AuthorizeApplicationAuthor]
        public StatusCodeResult RemoveSpeciality(Application application)
        {
            Assert.RequireNonNull(application, nameof(application));
            application.LevelSpeciality = null;
            _applicationRepository.Update(application);
            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{applicationId}/accept")]
        [LoadApplication(DepartmentItemName = "department")]
        [IsPrincipal]
        public AcceptedResult Accept(Application application, Principal principal)
        {
            Assert.RequireNonNull(application, nameof(application));
            Assert.RequireNonNull(principal, nameof(principal));

            StudentForm form = new StudentForm
            {
                FullName = application.FullName,
                BirthDate = application.BirthDate,
                Gender = application.Gender,
                RegistrationId = application.RegistrationId
            };

            Student student = _studentController.Add(form, application.Level, application.LevelSpeciality, principal)
                .Value as Student;

            _studentController.ChangeUserId(student, application.UserId);

            application.ProcessUserId = principal.UserId;
            application.ProcessDate = DateTime.Now;
            application.Student = student;
            _applicationRepository.Update(application);

            return Accepted(application);
        }


        [HttpPut("{applicationId}/reject")]
        [LoadApplication(DepartmentItemName = "department")]
        [IsPrincipal]
        public AcceptedResult Reject(Application application, Principal principal)
        {
            Assert.RequireNonNull(application, nameof(application));
            Assert.RequireNonNull(principal, nameof(principal));

            application.ProcessUserId = principal.UserId;
            application.ProcessDate = DateTime.Now;
            _applicationRepository.Update(application);

            return Accepted(application);
        }


        [HttpDelete("{applicationId}")]
        [LoadApplication]
        [AuthorizeApplicationAuthor]
        public NoContentResult Delete(Application application)
        {
            _applicationRepository.Delete(application);
            return NoContent();
        }
    }
}