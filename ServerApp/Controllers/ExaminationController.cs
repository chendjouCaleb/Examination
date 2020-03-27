using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Exceptions;
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
        private ILogger<ExaminationController> _logger;

        public ExaminationController(IRepository<Examination, long> examinationRepository,
            ILogger<ExaminationController> logger)
        {
            _examinationRepository = examinationRepository;
            _logger = logger;
        }

        [HttpGet("{examinationId}")]
        [LoadExamination]
        public Examination Find(Examination examination) => examination;


        [HttpGet]
        public IEnumerable<Examination> List([FromQuery] int? start, [FromQuery] int? end)
        {
            if (start != null && end != null)
            {
                return _examinationRepository.Set.Skip(start.Value).Take(end.Value - start.Value);
            }

            return _examinationRepository.List();
        }


        [HttpPost]
        public CreatedAtActionResult Add([FromBody] ExaminationForm model, string userId)
        {
            if (_examinationRepository.Exists(e => e.Name == model.Name))
            {
                throw new InvalidValueException("{examination.constraints.uniqueName}");
            }

            if (model.ExpectedEndDate < model.ExpectedStartDate)
            {
                throw new InvalidValueException("{period.constraints.startDate-before-endDate}");
            }

            Examination examination = new Examination
            {
                UserId = userId,
                AdminUserId = userId,
                Name = model.Name,
                ExpectedStartDate = model.ExpectedStartDate,
                ExpectedEndDate = model.ExpectedEndDate,
                RequireSpeciality = model.RequireSpeciality
            };

            examination = _examinationRepository.Save(examination);
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
            ErrorMessage = "{examination.requireNoState.finished")]
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


        [HttpPut("{examinationId}/admin")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        public StatusCodeResult ChangeAdminUserId(Examination examination, [FromQuery] string userId)
        {
            Assert.RequireNonNull(examination, nameof(examination));
            Assert.RequireNonNull(userId, nameof(userId));

            examination.AdminUserId = userId;
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

            if (_examinationRepository.Exists(e => e.Name == name))
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
            examination.RealStartDate = DateTime.Now;
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
            examination.RealEndDate = DateTime.Now;
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
            examination.RealEndDate = null;
            _examinationRepository.Update(examination);

            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpDelete("{examinationId}")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        public NoContentResult Delete(Examination examination)
        {
            Assert.RequireNonNull(examination, nameof(examination));
            _examinationRepository.Delete(examination);

            _logger.LogInformation($"Delete examination: {examination}");
            return NoContent();
        }
    }
}