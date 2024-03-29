﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Exam.Authorizers;
using Exam.Destructors;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Filters;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Models;
using Exam.Persistence.Repositories;
using Microsoft.AspNetCore.Http; 
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging; 

namespace Exam.Controllers
{
    [Route("api/examinations")]
    public class ExaminationController : Controller
    {
        private readonly IExaminationRepository _examinationRepository;

        private readonly ILogger<ExaminationController> _logger;

        private readonly IServiceProvider _serviceProvider;

        public ExaminationController(IExaminationRepository examinationRepository,
            ILogger<ExaminationController> logger,
            IServiceProvider serviceProvider)
        {
            _examinationRepository = examinationRepository;
            _logger = logger;
            _serviceProvider = serviceProvider;
        }

        public ExaminationController(IExaminationRepository examinationRepository,
            ILogger<ExaminationController> logger)
        {
            _examinationRepository = examinationRepository;
            _logger = logger;
        }

        [HttpGet("{examinationId}")]
        public Examination Find(long examinationId)
        {
            Examination examination = _examinationRepository.Find(examinationId);
            var statistics = _examinationRepository.Statistics(examination);

            JsonSerializerOptions options = new JsonSerializerOptions();
            options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            examination.Statistics = JsonSerializer.Serialize(statistics, options);
            return examination;
        }

        [HttpGet("find/name")]
        [RequireQueryParameters(new[] {"semesterId", "name"})]
        [LoadSemester(Source = ParameterSource.Query)]
        public Examination First(Semester semester, [FromQuery] string name)
        {
            return _examinationRepository.First(a => semester.Equals(a.Semester) && name == a.Name);
        }


        [HttpGet]
        public IEnumerable<Examination> List(
            [FromQuery] long? schoolId,
            [FromQuery] long? yearId,
            [FromQuery] long? semesterId, [FromQuery] string state)
        {
            IQueryable<Examination> queryable = _examinationRepository.Set;

            if (schoolId != null)
            {
                queryable = queryable.Where(e => e.Semester.Year.SchoolId == schoolId);
            }
            
            if (yearId != null)
            {
                queryable = queryable.Where(e => e.Semester.YearId == yearId);
            }
            
            if (semesterId != null)
            {
                queryable = queryable.Where(e => e.SemesterId == semesterId);
            }
            
            if (!string.IsNullOrWhiteSpace(state))
            {
                queryable = queryable.Where(e => e.State == state);
            }

            return queryable.ToList();
        }


        [HttpPost]
        [ValidModel]
        [RequireQueryParameter("semesterId")]
        [LoadSemester(Source = ParameterSource.Query, SchoolItemName = "school")]
        [IsDirector]
        public CreatedAtActionResult Add(Semester semester, [FromBody] ExaminationForm form)
        {
            ExaminationBuilder builder = new ExaminationBuilder(_serviceProvider);
            Examination examination = builder.Create(semester, form);
            return CreatedAtAction("Find", new {examination.Id}, examination);
        }


        public Examination _Add(ExaminationForm form, Semester semester)
        {
            Assert.RequireNonNull(form, nameof(form));
            Assert.RequireNonNull(semester, nameof(semester));

            if (_examinationRepository.Exists(e => e.Name == form.Name && semester.Id == e.SemesterId))
            {
                throw new InvalidValueException("{examination.constraints.uniqueName}");
            }

            if (form.ExpectedEndDate < form.ExpectedStartDate)
            {
                throw new InvalidValueException("{period.constraints.startDate-before-endDate}");
            }

            Examination examination = new Examination
            {
                Semester = semester,
                Name = form.Name,
                ExpectedStartDate = form.ExpectedStartDate,
                ExpectedEndDate = form.ExpectedEndDate
            };
            return examination;
        }

        [HttpPut("{examinationId}/startDate")]
        [LoadExamination(SchoolItemName = "school")]
        [IsDirector]
        [PeriodHaveState(ItemName = "examination", State = "PENDING",
            ErrorMessage = "{examination.requireState.pending}")]
        public StatusCodeResult ChangeStartDate(Examination examination, [FromQuery] DateTime startDate)
        {
            if (startDate.IsBefore(DateTime.Now))
            {
                throw new InvalidValueException("{period.constraints.futureStartDate}");
            }

            if (startDate.IsAfter(examination.ExpectedEndDate))
            {
                throw new InvalidValueException("{period.constraints.startDate-before-endDate}");
            }

            examination.ExpectedStartDate = startDate;
            _examinationRepository.Update(examination);

            _logger.LogInformation($"The start date of examination {examination.Id} changed to {startDate}");

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{examinationId}/endDate")]
        [LoadExamination(SchoolItemName = "school")]
        [IsDirector]
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
        [LoadExamination(SchoolItemName = "school")]
        [IsDirector]
        public StatusCodeResult ChangeName(Examination examination, [FromQuery] string name)
        {
            Assert.RequireNonNull(examination, nameof(examination));
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentNullException(nameof(name));
            }

            if (_examinationRepository.Exists(e => e.Name == name && examination.SemesterId == e.SemesterId))
            {
                throw new InvalidValueException("{examination.constraints.uniqueName}");
            }

            examination.Name = name;

            _examinationRepository.Update(examination);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{examinationId}/start")]
        [LoadExamination(SchoolItemName = "school")]
        [IsDirector]
        [PeriodHaveState(ItemName = "examination", State = "PENDING",
            ErrorMessage = "{examination.requireState.pending}")]
        public StatusCodeResult Start(Examination examination)
        {
            Assert.RequireNonNull(examination, nameof(examination));
            examination.StartDate = DateTime.Now;
            _examinationRepository.Update(examination);

            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpPut("{examinationId}/close")]
        [LoadExamination(SchoolItemName = "school")]
        [IsDirector]
        [PeriodHaveState(ItemName = "examination", State = "PROGRESS",
            ErrorMessage = "{examination.requireState.progress}")]
        public StatusCodeResult End(Examination examination)
        {
            Assert.RequireNonNull(examination, nameof(examination));
            examination.EndDate = DateTime.Now;
            _examinationRepository.Update(examination);

            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpPut("{examinationId}/relaunch")]
        [LoadExamination(SchoolItemName = "school")]
        [IsDirector]
        public StatusCodeResult Relaunch(Examination examination)
        {
            Assert.RequireNonNull(examination, nameof(examination));

            if (examination.EndDate == null)
            {
                throw new InvalidOperationException("{examination.requireState.finished}");
            }

            examination.EndDate = null;
            _examinationRepository.Update(examination);

            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpPut("{examinationId}/statistics")]
        [LoadExamination(SchoolItemName = "school")]
        public OkResult UpdateStatistics(Examination examination)
        {
            Assert.RequireNonNull(examination, nameof(examination));
            _examinationRepository.UpdateStatistics(examination);
            return Ok();
        }


        [HttpDelete("{examinationId}")]
        [LoadExamination(SchoolItemName = "school")]
        [IsDirector]
        public NoContentResult Delete(Examination examination)
        {
            Assert.RequireNonNull(examination, nameof(examination));
            ExaminationDestructor destructor = new ExaminationDestructor(_serviceProvider);
            destructor.Destroy(examination);
            return NoContent();
        }
    }
}