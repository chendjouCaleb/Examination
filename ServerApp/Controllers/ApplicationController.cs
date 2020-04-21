using System;
using System.Collections.Generic;
using System.Linq;
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
    [Route("api/applications")]
    public class ApplicationController : Controller
    {
        private StudentController _studentController;
        private IRepository<Examination, long> _examinationRepository;
        private IRepository<Speciality, long> _specialityRepository;
        private IRepository<Application, long> _applicationRepository;
        private IRepository<Student, long> _studentRepository;
        private IRepository<Group, long> _groupRepository;
        private ILogger<ApplicationController> _logger;

        public ApplicationController(StudentController studentController,
            IRepository<Examination, long> examinationRepository, 
            IRepository<Speciality, long> specialityRepository,
            IRepository<Application, long> applicationRepository, 
            IRepository<Student, long> studentRepository,
            IRepository<Group, long> groupRepository,
            ILogger<ApplicationController> logger)
        {
            _studentController = studentController;
            _examinationRepository = examinationRepository;
            _specialityRepository = specialityRepository;
            _applicationRepository = applicationRepository;
            _studentRepository = studentRepository;
            _groupRepository = groupRepository;
            _logger = logger;
        }

        [HttpGet("{applicationId}")]
        [LoadApplication]
        public ObjectResult Find(Application application) => Ok(application);

        [HttpGet]
        [LoadExamination(Source = ParameterSource.Query)]
        public IEnumerable<Application> List(Examination examination, [FromQuery] int skip = 0,
            [FromQuery] int take = 20)
        {
            IQueryable<Application> queryable = _applicationRepository.Set;

            if (examination != null)
            {
                queryable = queryable.Where(a => examination.Equals(a.Examination));
            }

            return queryable.Skip(skip).Take(take).ToList();
        }


        [HttpPost]
        [LoadExamination(Source = ParameterSource.Query)]
        [LoadSpeciality(Source = ParameterSource.Query)]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished}")]
        [AuthorizeApplicationAuthor]
        public CreatedAtActionResult Add(Examination examination,
            Speciality speciality, [FromBody] ApplicationForm form, User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            if (_studentRepository.Exists(s => examination.Equals(s.Examination)  && user.Id == s.UserId))
            {
                throw new InvalidOperationException("{application.constraints.noStudentUserId}");
            }

            if (speciality != null && !examination.Equals(speciality.Examination))
            {
                throw new InvalidOperationException();
            }

            if (speciality == null && examination.RequireSpeciality)
            {
                throw new InvalidOperationException("{application.constraints.requireSpeciality}");
            }

            if (_applicationRepository.Exists(a => examination.Equals(a.Examination)  && a.UserId == user.Id))
            {
                throw new InvalidOperationException("{application.constraints.uniqueUserId}");
            }

            Application application = new Application
            {
                FullName = form.FullName,
                Gender = form.Gender,
                RegistrationId = form.RegistrationId,
                BirthDate = form.BirthDate,
                Examination = examination,
                UserId = user.Id
            };

            _applicationRepository.Save(application);

            if (speciality != null)
            {
                application.Speciality = speciality;
                speciality.ApplicationCount += 1;
                _specialityRepository.Update(speciality);
            }

            examination.ApplicationCount += 1;
            _examinationRepository.Update(examination);

            _logger.LogInformation($"New Application: {application}");

            return CreatedAtAction("Find", new {application.Id}, application);
        }


        [HttpPut("{applicationId}")]
        [LoadApplication(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
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

        [HttpPut("{applicationId}/speciality")]
        [LoadApplication(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        [LoadSpeciality(Source = ParameterSource.Query)]
        [AuthorizeApplicationAuthor]
        public StatusCodeResult ChangeSpeciality(Application application, Speciality speciality)
        {
            Assert.RequireNonNull(application, nameof(application));
            Assert.RequireNonNull(speciality, nameof(speciality));
            

            if (!application.Examination.Equals(speciality.Examination))
            {
                throw new InvalidProgramException();
            }

            if (application.Speciality != null)
            {
                application.Speciality.ApplicationCount -= 1;
                _specialityRepository.Update(application.Speciality);
            }

            application.Speciality = speciality;
            _applicationRepository.Update(application);

            speciality.ApplicationCount += 1;
            _specialityRepository.Update(speciality);
            
            return StatusCode(StatusCodes.Status202Accepted);
        }
        
        
        [HttpPut("{applicationId}/removeSpeciality")]
        [LoadApplication(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        [AuthorizeApplicationAuthor]
        public StatusCodeResult RemoveSpeciality(Application application )
        {
            Assert.RequireNonNull(application, nameof(application));
            
            if (application.Examination.RequireSpeciality)
            {
                throw new InvalidOperationException("{application.constraints.requireSpeciality}");
            }
            
            if (application.Speciality == null)
            {
                throw new InvalidOperationException("The application should not have speciality");
            }

            application.Speciality.ApplicationCount -= 1;
            _specialityRepository.Update(application.Speciality);

            application.Speciality = null;
            _applicationRepository.Update(application);
            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{applicationId}/accept")]
        [LoadApplication(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        [LoadSpeciality(Source = ParameterSource.Query)]
        [AuthorizeApplicationAuthor]
        public AcceptedResult Accept(Application application, User user, Group group)
        {
            Assert.RequireNonNull(application, nameof(application));
            Assert.RequireNonNull(user, nameof(user));
            Assert.RequireNonNull(group, nameof(group));

            if (!group.Examination.Equals(application.Examination))
            {
                throw new IncompatibleEntityException<Application, Group>(application, group);
            }

            StudentForm form = new StudentForm
            {
                FullName = application.FullName,
                BirthDate = application.BirthDate,
                Gender = application.Gender,
                RegistrationId = application.RegistrationId
            };

            Student student = _studentController
                .Add(application.Examination, application.Speciality, group, form, user)
                .Value as Student;

            _studentController.ChangeUserId(student, application.UserId);

            
            application.ProcessUserId = user.Id;
            application.ProcessDate = DateTime.Now;
            application.Student = student;
            _applicationRepository.Update(application);

            application.Speciality.AcceptedApplicationCount += 1;
            _specialityRepository.Update(application.Speciality);

            application.Examination.AcceptedApplicationCount += 1;
            _examinationRepository.Update(application.Examination);

            return Accepted(application);
        }


        [HttpPut("{applicationId}/reject")]
        [LoadApplication(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        [LoadSpeciality(Source = ParameterSource.Query)]
        [AuthorizeApplicationAuthor]
        public AcceptedResult Reject(Application application, User user)
        {
            Assert.RequireNonNull(application, nameof(application));

            application.ProcessUserId = user.Id;
            application.ProcessDate = DateTime.Now;
            _applicationRepository.Update(application);

            application.Speciality.RejectedApplicationCount += 1;
            _specialityRepository.Update(application.Speciality);

            application.Examination.RejectedApplicationCount += 1;
            _examinationRepository.Update(application.Examination);

            return Accepted(application);
        }


        [HttpPut("{applicationId}/reject")]
        [LoadApplication(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        [LoadSpeciality(Source = ParameterSource.Query)]
        [AuthorizeApplicationAuthor]
        public NoContentResult Cancel(Application application)
        {
            return _Delete(application);
        }


        [HttpPut("{applicationId}")]
        [LoadApplication(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        [LoadSpeciality(Source = ParameterSource.Query)]
        [AuthorizeExaminationAdmin]
        public NoContentResult Delete(Application application)
        {
            return _Delete(application);
        }


        private NoContentResult _Delete(Application application)
        {
            if (application.Speciality != null)
            {
                application.Speciality.ApplicationCount -= 1;
                _specialityRepository.Update(application.Speciality);
            }

            application.Examination.ApplicationCount -= 1;
            _examinationRepository.Update(application.Examination);

            _applicationRepository.Delete(application);
            return NoContent();
        }
    }
}