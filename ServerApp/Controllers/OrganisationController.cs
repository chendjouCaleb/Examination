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
using Exam.Models.Statistics;
using Exam.Persistence.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    [Route("api/organisations")]
    public class OrganisationController : Controller
    {
        private IOrganisationRepository _organisationRepository;
        private ILogger<OrganisationController> _logger;

        public OrganisationController(IOrganisationRepository organisationRepository,
            ILogger<OrganisationController> logger)
        {
            _organisationRepository = organisationRepository;
            _logger = logger;
        }

        [HttpGet("{organisationId}")]
        [LoadOrganisation]
        public Organisation Find(Organisation organisation)
        {
            organisation.Statistics = Statistics(organisation);
            return organisation;
        }

        [HttpGet("find/identifier/{identifier}")]
        public Organisation FindByIdentifier(string identifier) =>
            _organisationRepository.First(o => o.Identifier == identifier);

        [HttpGet]
        public IEnumerable<Organisation> List([FromQuery] int start = 0, [FromQuery] int take = 20)
        {
            IQueryable<Organisation> queryable = _organisationRepository.Set.Skip(start).Take(take);
            return queryable.ToList();
        }

        [HttpGet("{organisationId}/statistics")]
        [LoadOrganisation]
        public OrganisationStatistics Statistics(Organisation organisation)
        {
            return _organisationRepository.Statistics(organisation);
        }


        [HttpPost]
        public CreatedAtActionResult Add([FromBody] OrganisationForm form, User user)
        {
            Assert.RequireNonNull(form, nameof(form));
            Assert.RequireNonNull(user, nameof(user));


            if (_organisationRepository.Exists(o => o.Identifier == form.Identifier))
            {
                throw new InvalidValueException("{organisation.constraints.uniqueIdentifier}");
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
        [AuthorizePrincipalAdmin]
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
        [AuthorizePrincipalAdmin]
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
        [AuthorizePrincipalAdmin]
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
        [AuthorizePrincipalAdmin]
        public NoContentResult Delete(Organisation organisation)
        {
            _organisationRepository.Delete(organisation);
            return NoContent();
        }
    }
}