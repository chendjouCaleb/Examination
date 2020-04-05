using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Exceptions;
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
    [Route("api/organisations")]
    public class OrganisationController:Controller
    {
        private IRepository<Organisation, long> _organisationRepository;
        private ILogger<OrganisationController> _logger;

        public OrganisationController(IRepository<Organisation, long> organisationRepository, 
            ILogger<OrganisationController> logger)
        {
            _organisationRepository = organisationRepository;
            _logger = logger;
        }

        [HttpGet("{organisationId}")]
        [LoadOrganisation]
        public Organisation Find(Organisation organisation) => organisation;

        [HttpGet]
        public IEnumerable<Organisation> List([FromQuery] int start = 0, [FromQuery] int take = 20)
        {
            IQueryable<Organisation> queryable = _organisationRepository.Set.Skip(start).Take(take);

            return queryable.ToList();
        }


        [HttpPost]
        public CreatedAtActionResult Add([FromBody] OrganisationForm form, User user)
        {
            Assert.RequireNonNull(form, nameof(form));

            if (_organisationRepository.Exists(o => o.Identifier == form.Identifier))
            {
                throw new InvalidValueException("{organisation.constraints.UniqueIdentifier");
            }

            Organisation organisation = new Organisation
            {
                Name = form.Name,
                Identifier = form.Identifier,
                Address = form.Address,
                UserId = user.Id,
                AdminUserId = user.Id
            };

            organisation = _organisationRepository.Save(organisation);

            _logger.LogInformation($"New organisation: {organisation}");
            return CreatedAtAction("Find", new {organisation.Id}, organisation);
        }
        

        [HttpPut("{organisationId}/admin")]
        [LoadOrganisation]
        [AuthorizeOrganisationAdmin]
        public StatusCodeResult ChangeAdminUserId(Organisation organisation, [FromQuery] string userId)
        {
            Assert.RequireNonNull(organisation, nameof(organisation));
            Assert.RequireNonNull(userId, nameof(userId));

            organisation.AdminUserId = userId;
            _organisationRepository.Update(organisation);

            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpPut("{organisationId}")]
        [LoadOrganisation]
        [AuthorizeOrganisationAdmin]
        public AcceptedResult Update(Organisation organisation, [FromBody] OrganisationInfoForm form)
        {
            Assert.RequireNonNull(organisation, nameof(organisation));

            organisation.Name = form.Name;
            organisation.Address = form.Address;
            
            _organisationRepository.Update(organisation);

            return Accepted(organisation);
        }
        
        
        [HttpPut("{organisationId}/identifier")]
        [LoadOrganisation]
        [AuthorizeOrganisationAdmin]
        public StatusCodeResult ChangeIdentifier(Organisation organisation, [FromQuery] string identifier)
        {
            Assert.RequireNonNull(organisation, nameof(organisation));
            if (string.IsNullOrWhiteSpace(identifier))
            {
                throw new ArgumentNullException(nameof(identifier));
            }

            if (_organisationRepository.Exists(e => e.Identifier == identifier))
            {
                throw new InvalidValueException("{organisation.constraints.uniqueIdentifier}");
            }

            organisation.Identifier = identifier;

            _organisationRepository.Update(organisation);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpDelete("{organisationId}")]
        [LoadOrganisation]
        [AuthorizeOrganisationAdmin]
        public NoContentResult Delete(Organisation organisation)
        {
            _organisationRepository.Delete(organisation);
            return NoContent();
        }
    }
}