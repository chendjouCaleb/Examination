﻿using System;
using System.Collections.Generic;
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
    [Route("api/correctors")]
    public class CorrectorController:Controller
    {
        private readonly IRepository<Corrector, long> _correctorRepository;
        private readonly IRepository<Examination, long> _examinationRepository;
        private readonly ILogger<CorrectorController> _logger;


        public CorrectorController(IRepository<Corrector, long> correctorRepository,
            IRepository<Examination, long> examinationRepository, ILogger<CorrectorController> logger)
        {
            _correctorRepository =
                correctorRepository ?? throw new ArgumentNullException(nameof(correctorRepository));
            _examinationRepository =
                examinationRepository ?? throw new ArgumentNullException(nameof(examinationRepository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }


        [HttpGet("{correctorId}")]
        [LoadCorrector]
        public Corrector Find(Corrector corrector) => corrector;

        [HttpGet]
        [LoadExamination(Source = ParameterSource.Query)]
        public IEnumerable<Corrector> List(Examination examination)
        {
            if (examination != null)
            {
                return examination.Correctors;
            }

            return new Corrector[] {};
        }


        [HttpPost]
        [LoadExamination(Source = ParameterSource.Query)]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        public CreatedAtActionResult Add(Examination examination, [FromQuery] string userId)
        {
            if(_correctorRepository.Exists(s => examination.Equals(s.Examination) && s.UserId == userId))
            {
                throw new InvalidValueException("{corrector.constraints.uniqueUserByExamination}");
            }
            Corrector corrector = new Corrector
            {
                UserId = userId,
                Examination = examination
            };

            corrector = _correctorRepository.Save(corrector);

            _logger.LogInformation($"New corrector: {corrector}");
            examination.CorrectorCount += 1;
            _examinationRepository.Update(examination);
            return CreatedAtAction("Find", new { corrector.Id}, corrector);
        }
        
        

        [HttpDelete("{correctorId")]
        [LoadCorrector(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        public NoContentResult Delete(Corrector corrector)
        {
            Assert.RequireNonNull(corrector, nameof(corrector));
            corrector.Examination.CorrectorCount -= 1;
            _examinationRepository.Update(corrector.Examination);
            
            _correctorRepository.Delete(corrector);
            return NoContent() ;
        }

    }
}