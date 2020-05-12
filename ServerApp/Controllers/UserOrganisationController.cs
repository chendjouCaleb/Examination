using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Loaders;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    [Route("api/organisations/users")]
    public class UserOrganisationController : Controller
    {
        private IRepository<Organisation, long> _organisationRepository;
        private IRepository<Admin, long> _adminRepository;

        public UserOrganisationController(
            IRepository<Organisation, long> organisationRepository,
            IRepository<Admin, long> adminRepository)
        {
            _organisationRepository = organisationRepository;
            _adminRepository = adminRepository;
        }


        [HttpGet]
        [RequireQueryParameters(new[] {"userId", "organisationId"})]
        [LoadOrganisation(Source = ParameterSource.Query)]
        public UserOrganisation Get(Organisation organisation, [FromQuery] string userId)
        {
            return new UserOrganisation
            {
                UserId = userId,
                IsPrincipal = organisation.AdminUserId == userId,
                IsAdmin = _adminRepository.Exists(o => o.OrganisationId ==  organisation.Id && o.UserId == userId) 
            };
        }
    }
}