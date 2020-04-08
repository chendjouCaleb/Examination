using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Exceptions;
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
    [Route("api/principals")]
    public class PrincipalController : Controller
    {
        private IRepository<Principal, long> _principalRepository;
        private IRepository<Examination, long> _examinationRepository;
        private ILogger<PrincipalController> _logger;

        public PrincipalController(IRepository<Principal, long> principalRepository,
            IRepository<Examination, long> examinationRepository,
            ILogger<PrincipalController> logger)
        {
            _principalRepository = principalRepository;
            _examinationRepository = examinationRepository;
            _logger = logger;
        }


        [HttpGet("{principalId}")]
        [LoadPrincipal]
        public Principal Find(Principal principal) => principal;


        [HttpGet]
        [RequireQueryParameter("examinationId")]
        [LoadExamination(Source = ParameterSource.Query)]
        public IEnumerable<Principal> List(Examination examination, [FromQuery] int start = 0, [FromQuery] int take = 20)
        {
            IQueryable<Principal> queryable = _principalRepository.Set;

            if (examination != null)
            {
                queryable = queryable.Where(r => r.ExaminationId == examination.Id);
            }

            queryable = queryable.Skip(start).Take(take);

            return queryable.ToList();
        }


        [HttpPost]
        [RequireQueryParameter("examinationId")]
        [LoadExamination(Source = ParameterSource.Query)]
        [AuthorizeExaminationAdmin]
        public CreatedAtActionResult Add( Examination examination, User user, [FromBody] PrincipalForm form)
        {
            if (_principalRepository.Exists(a => a.UserId == form.UserId && examination.Equals(a.Examination)))
            {
                throw new InvalidValueException("{principal.constraints.uniqueUserId}");
            }

            Principal principal = new Principal
            {
                Examination = examination,
                UserId = form.UserId,
                Role = form.Role,
                RegisterUserId = user.Id
            };

            _principalRepository.Save(principal);

            examination.PrincipalCount += 1;
            _examinationRepository.Update(examination);

            _logger.LogInformation($"New Principal: {principal}");

            return CreatedAtAction("Find", new {principal.Id}, principal);
        }


        
        
        
        [HttpPut("{principalId}")]
        [LoadPrincipal(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        public AcceptedResult Update(Principal principal, [FromBody] PrincipalInfoForm form)
        {
            Assert.RequireNonNull(principal, nameof(principal));

            principal.Role = form.Role;
            _principalRepository.Update(principal);
            return Accepted(principal);
        }
        
        
        [HttpDelete("{principalId}")]
        [LoadPrincipal(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        public NoContentResult Delete(Principal principal)
        {
            principal.Examination.PrincipalCount -= 1;
            _examinationRepository.Update(principal.Examination);
            _principalRepository.Delete(principal);

            return NoContent();
        }
        
    }
} 