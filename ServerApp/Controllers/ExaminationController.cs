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
using ServerApp.Filters;

namespace Exam.Controllers
{
    [Route("api/examinations")]
    public class ExaminationController : Controller
    {
        private IRepository<Examination, long> _examinationRepository;
        private IRepository<Organisation, long> _organisationRepository;
        private ILogger<ExaminationController> _logger;

        public ExaminationController(IRepository<Examination, long> examinationRepository,
            IRepository<Organisation, long> organisationRepository,
            ILogger<ExaminationController> logger)
        {
            _examinationRepository = examinationRepository;
            _organisationRepository = organisationRepository;
            _logger = logger;
        }

        [HttpGet("{examinationId}")]
        [LoadExamination]
        public Examination Find(Examination examination) => examination;
        
        [HttpGet("find")]
        [RequireQueryParameter("organisationId")]
        [RequireQueryParameter("name")]
        [LoadOrganisation(Source = ParameterSource.Query)]
        public Examination First(Organisation organisation, [FromQuery] string name)
        {
            return _examinationRepository.First(a => organisation.Equals(a.Organisation) && name == a.Name);
        }


        [HttpGet]
        [LoadOrganisation(Source = ParameterSource.Query)]
        public IEnumerable<Examination> List(Organisation organisation,
            [FromQuery] string state, [FromQuery] int? start, [FromQuery] int? end)
        {
            IQueryable<Examination> queryable = _examinationRepository.Set;

            if (organisation != null)
            {
                queryable = queryable.Where(e => e.OrganisationId == organisation.Id);
            }
            if (!string.IsNullOrWhiteSpace(state))
            {
                queryable = queryable.Where(e => e.State == state);
            }

            if (start != null && end != null)
            {
                queryable = queryable.Skip(start.Value).Take(end.Value - start.Value);
            }

            return queryable.ToList();
        }


        [HttpPost]
        [RequireQueryParameter("organisationId")]
        [LoadOrganisation(Source = ParameterSource.Query)]
        [AuthorizeOrganisationAdmin]
        public CreatedAtActionResult Add([FromBody] ExaminationForm model, Organisation organisation, User user)
        {
            if (_examinationRepository.Exists(e => e.Name == model.Name && organisation.Id == e.OrganisationId))
            {
                throw new InvalidValueException("{examination.constraints.uniqueName}");
            }

            if (model.ExpectedEndDate < model.ExpectedStartDate)
            {
                throw new InvalidValueException("{period.constraints.startDate-before-endDate}");
            }

            Examination examination = new Examination
            {
                Organisation = organisation,
                Name = model.Name,
                ExpectedStartDate = model.ExpectedStartDate,
                ExpectedEndDate = model.ExpectedEndDate,
                RequireSpeciality = model.RequireSpeciality,
                RegisterUserId = user.Id
            };

            examination = _examinationRepository.Save(examination);
            organisation.ExaminationCount += 1;
            _organisationRepository.Update(organisation);
            _logger.LogInformation($"New examination: {examination}");

            return CreatedAtAction("Find", new {examination.Id}, examination);
        }

        [HttpPut("{examinationId}/startDate")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        [PeriodHaveState(ItemName = "examination", State = "PENDING",
            ErrorMessage = "{examination.requireState.pending")]
        public StatusCodeResult ChangeStartDate(Examination examination, [FromQuery] DateTime startDate)
        {
            if (examination.ExpectedEndDate < startDate)
            {
                throw new InvalidValueException("{period.constraints.startDate-before-endDate}");
            }

            examination.ExpectedStartDate = startDate;
            _examinationRepository.Update(examination);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{examinationId}/endDate")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished}")]
        public StatusCodeResult ChangeEndDate(Examination examination, [FromQuery] DateTime endDate)
        {
            if (examination.ExpectedStartDate > endDate)
            {
                throw new InvalidValueException("{period.constraints.endDate-before-startDate}");
            }

            examination.ExpectedEndDate = endDate;
            _examinationRepository.Update(examination);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{examinationId}/name")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        public StatusCodeResult ChangeName(Examination examination, [FromQuery] string name)
        {
            Assert.RequireNonNull(examination, nameof(examination));
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentNullException(nameof(name));
            }

            if (_examinationRepository.Exists(e => e.Name == name && examination.OrganisationId == e.OrganisationId))
            {
                throw new InvalidValueException("{examination.constraints.uniqueName}");
            }

            examination.Name = name;

            _examinationRepository.Update(examination);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{examinationId}/specialityState")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        public StatusCodeResult ChangeRequireSpecialityState(Examination examination, [FromQuery] bool state)
        {
            Assert.RequireNonNull(examination, nameof(examination));
            examination.RequireSpeciality = state;
            _examinationRepository.Update(examination);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{examinationId}/start")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(ItemName = "examination", State = "PENDING",
            ErrorMessage = "{examination.requireState.pending")]
        public StatusCodeResult Start(Examination examination)
        {
            Assert.RequireNonNull(examination, nameof(examination));
            examination.StartDate = DateTime.Now;
            _examinationRepository.Update(examination);

            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpPut("{examinationId}/start")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        [PeriodHaveState(ItemName = "examination", State = "PROGRESS",
            ErrorMessage = "{examination.requireState.progress")]
        public StatusCodeResult End(Examination examination)
        {
            Assert.RequireNonNull(examination, nameof(examination));
            examination.EndDate = DateTime.Now;
            _examinationRepository.Update(examination);

            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpPut("{examinationId}/relaunch")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        [PeriodHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireState.finished")]
        public StatusCodeResult Relaunch(Examination examination)
        {
            Assert.RequireNonNull(examination, nameof(examination));
            examination.EndDate = null;
            _examinationRepository.Update(examination);

            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpDelete("{examinationId}")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        public NoContentResult Delete(Examination examination)
        {
            examination.Organisation.ExaminationCount -= 1;
            _organisationRepository.Update(examination.Organisation);
            
            Assert.RequireNonNull(examination, nameof(examination));
            _examinationRepository.Delete(examination);

            _logger.LogInformation($"Delete examination: {examination}");
            return NoContent();
        }
    }
}