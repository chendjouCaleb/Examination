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
    [Route("api/admins")]
    public class AdminController : Controller
    {
        private IRepository<Admin, long> _adminRepository;
        private IRepository<Organisation, long> _organisationRepository;
        private ILogger<AdminController> _logger;

        public AdminController(IRepository<Admin, long> adminRepository,
            IRepository<Organisation, long> organisationRepository,
            ILogger<AdminController> logger)
        {
            _adminRepository = adminRepository;
            _organisationRepository = organisationRepository;
            _logger = logger;
        }


        [HttpGet("{adminId}")]
        [LoadAdmin]
        public Admin Find(Admin admin) => admin;


        [HttpGet]
        [RequireQueryParameter("organisationId")]
        [LoadOrganisation(Source = ParameterSource.Query)]
        public IEnumerable<Admin> List(Organisation organisation, [FromQuery] int start = 0, [FromQuery] int take = 20)
        {
            IQueryable<Admin> queryable = _adminRepository.Set;

            if (organisation != null)
            {
                queryable = queryable.Where(r => r.OrganisationId == organisation.Id);
            }

            queryable = queryable.Skip(start).Take(take);

            return queryable.ToList();
        }


        [HttpPost]
        [RequireQueryParameter("organisationId")]
        [LoadOrganisation(Source = ParameterSource.Query)]
        [AuthorizeOrganisationAdmin]
        public CreatedAtActionResult Add( Organisation organisation, User user, [FromBody] AdminForm form)
        {
            if (_adminRepository.Exists(a => a.UserId == form.UserId && organisation.Equals(a.Organisation)))
            {
                throw new InvalidValueException("{admin.constraints.uniqueUserId}");
            }

            Admin admin = new Admin
            {
                Organisation = organisation,
                UserId = form.UserId,
                Role = form.Role,
                RegisterUserId = user.Id
            };

            _adminRepository.Save(admin);

            organisation.AdminCount += 1;
            _organisationRepository.Update(organisation);

            _logger.LogInformation($"New Admin: {admin}");

            return CreatedAtAction("Find", new {admin.Id}, admin);
        }


        
        
        
        [HttpPut("{adminId}")]
        [LoadAdmin(OrganisationItemName = "organisation")]
        [AuthorizeOrganisationAdmin(OrganisationItemName = "organisation")]
        public AcceptedResult Update(Admin admin, [FromBody] AdminInfoForm form)
        {
            Assert.RequireNonNull(admin, nameof(admin));

            admin.Role = form.Role;
            _adminRepository.Update(admin);
            return Accepted(admin);
        }
        
        
        [HttpDelete("{adminId}")]
        [LoadAdmin(OrganisationItemName = "organisation")]
        [AuthorizeOrganisationAdmin(OrganisationItemName = "organisation")]
        public NoContentResult Delete(Admin admin)
        {
            admin.Organisation.AdminCount -= 1;
            _organisationRepository.Update(admin.Organisation);
            _adminRepository.Delete(admin);

            return NoContent();
        }
        
    }
}