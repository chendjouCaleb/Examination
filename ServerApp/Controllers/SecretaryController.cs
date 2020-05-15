using System;
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
    [Route("api/secretaries")]
    public class SecretaryController:Controller
    {
        private readonly IRepository<Secretary, long> _secretaryRepository;
        private readonly ILogger<SecretaryController> _logger;


        public SecretaryController(IRepository<Secretary, long> secretaryRepository,
            ILogger<SecretaryController> logger)
        {
            _secretaryRepository =
                secretaryRepository ?? throw new ArgumentNullException(nameof(secretaryRepository));
            
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }


        [HttpGet("{secretaryId}")]
        [LoadSecretary]
        public Secretary Find(Secretary secretary) => secretary;

        [HttpGet]
        [LoadExamination(Source = ParameterSource.Query)]
        public IEnumerable<Secretary> List(Examination examination)
        {
            if (examination != null)
            {
                return examination.Secretaries;
            }

            return new Secretary[] {};
        }


        [HttpPost]
        [RequireQueryParameter("examinationId")]
        [LoadExamination(Source = ParameterSource.Query)]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        public ObjectResult Add(Examination examination, User user, [FromQuery] string[] userId)
        {
            List<string> ids = new List<string>();

            foreach (var id in userId)
            {
                if(!_secretaryRepository.Exists(s => examination.Equals(s.Examination) && s.UserId == id))
                {
                    ids.Add(id);
                }
            }
            
            List<Secretary> secretaries = new List<Secretary>();

            foreach (var id in ids)
            {
                secretaries.Add(_Add(examination, user, id));
            }

            return StatusCode(StatusCodes.Status201Created, secretaries);
        }


        public Secretary _Add(Examination examination, User user, string userId)
        {
            if(_secretaryRepository.Exists(s => examination.Equals(s.Examination) && s.UserId == userId))
            {
                throw new InvalidValueException("{secretary.constraints.uniqueUserByExamination}");
            }
            Secretary secretary = new Secretary
            {
                UserId = userId,
                RegisterUserId = user.Id,
                Examination = examination
            };

            secretary = _secretaryRepository.Save(secretary);

            _logger.LogInformation($"New secretary: {secretary}");
            return secretary;
        }
        
        

        [HttpDelete("{secretaryId}")]
        [LoadSecretary(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        public NoContentResult Delete(Secretary secretary)
        {
            Assert.RequireNonNull(secretary, nameof(secretary));
            _secretaryRepository.Delete(secretary);
            return NoContent() ;
        }

    }
}