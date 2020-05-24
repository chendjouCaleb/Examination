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
    [Route("api/supervisors")]
    public class SupervisorController:Controller
    {
        private readonly IRepository<Supervisor, long> _supervisorRepository;
        private readonly IRepository<Examination, long> _examinationRepository;
        private readonly ILogger<SupervisorController> _logger;


        public SupervisorController(IRepository<Supervisor, long> supervisorRepository,
            IRepository<Examination, long> examinationRepository, ILogger<SupervisorController> logger)
        {
            _supervisorRepository =
                supervisorRepository ?? throw new ArgumentNullException(nameof(supervisorRepository));
            _examinationRepository =
                examinationRepository ?? throw new ArgumentNullException(nameof(examinationRepository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }


        [HttpGet("{supervisorId}")]
        [LoadSupervisor]
        public Supervisor Find(Supervisor supervisor) => supervisor;

        [HttpGet]
        [LoadExamination(Source = ParameterSource.Query)]
        public IEnumerable<Supervisor> List(Examination examination)
        {
            if (examination != null)
            {
                return examination.Supervisors;
            }

            return new Supervisor[] {};
        }


        [HttpPost]
        [LoadExamination(Source = ParameterSource.Query)]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished}")]
        public ObjectResult Add(Examination examination, [FromQuery] string[] userId)
        {
            List<string> ids = new List<string>();

            foreach (var id in userId)
            {
                if(!_supervisorRepository.Exists(s => examination.Equals(s.Examination) && s.UserId == id))
                {
                    ids.Add(id);
                }
            }
            
            List<Supervisor> supervisors = new List<Supervisor>();

            foreach (var id in ids)
            {
                supervisors.Add(_Add(examination, id));
            }

            return StatusCode(StatusCodes.Status201Created, supervisors);
        }
        
        
        public Supervisor _Add(Examination examination, string userId)
        {
            if(_supervisorRepository.Exists(s => examination.Equals(s.Examination) && s.UserId == userId))
            {
                throw new InvalidValueException("{supervisor.constraints.uniqueUserByExamination}");
            }
            Supervisor supervisor = new Supervisor
            {
                UserId = userId,
                Examination = examination
            };

            supervisor = _supervisorRepository.Save(supervisor);

            _logger.LogInformation($"New supervisor: {supervisor}");
            return supervisor;
        }
        

        [HttpDelete("{supervisorId}")]
        [LoadSupervisor(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished}")]
        public NoContentResult Delete(Supervisor supervisor)
        {
            Assert.RequireNonNull(supervisor, nameof(supervisor));
            _examinationRepository.Update(supervisor.Examination);
            
            _supervisorRepository.Delete(supervisor);
            return NoContent() ;
        }

    }
}