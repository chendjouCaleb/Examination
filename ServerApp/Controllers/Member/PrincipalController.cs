using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Loaders;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    [Route("api/principals")]
    public class PrincipalController : Controller
    {
        private readonly IRepository<Principal, long> _principalRepository;
        private readonly MemberController _memberController;
        private readonly ILogger<PrincipalController> _logger;


        public PrincipalController(IRepository<Principal, long> principalRepository,
            MemberController memberController,
            ILogger<PrincipalController> logger)
        {
            _principalRepository = principalRepository;
            _memberController = memberController;
            _logger = logger;
        }


        [HttpGet("{principalId}")]
        [LoadPrincipal]
        public Principal Get(Principal principal) => principal;

        [HttpGet]
        [LoadDepartment(Source = ParameterSource.Query)]
        public IEnumerable<Principal> List([FromQuery] long? departmentId, [FromQuery] string userId)
        {
            if (departmentId != null)
            {
                return _principalRepository.List(c => c.DepartmentId == departmentId.Value);
            }

            if (userId != null)
            {
                return _principalRepository.List(c => c.UserId == userId);
            }

            return new Principal[] { };
        }


        [HttpPost]
        [RequireQueryParameter("departmentId")]
        [LoadDepartment(Source = ParameterSource.Query)]
        [AuthorizeDepartmentPrincipal]
        public ObjectResult Add(Department department, [FromQuery] string[] userId)
        {
            Assert.RequireNonNull(department, nameof(department));
            Assert.RequireNonNull(userId, nameof(userId));
            List<string> ids = new List<string>();

            foreach (var id in userId)
            {
                if (!_principalRepository.Exists(s => department.Equals(s.Department) && s.UserId == id))
                {
                    ids.Add(id);
                }
            }

            List<Principal> principals = new List<Principal>();

            foreach (var id in ids)
            {
                principals.Add(_Add(department, id));
            }

            return StatusCode(StatusCodes.Status201Created, principals);
        }


        public Principal _Add(Department department, [FromQuery] string userId)
        {
            Assert.RequireNonNull(department, nameof(department));
            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new ArgumentNullException(nameof(userId));
            }

            if (_principalRepository.Exists(s => department.Equals(s.Department) && s.UserId == userId))
            {
                throw new InvalidValueException("{principal.constraints.uniqueUserByDepartment}");
            }

            Principal principal = new Principal
            {
                UserId = userId,
                Member = _memberController._Add(department.School, userId),
                Department = department
            };

            principal = _principalRepository.Save(principal);

            _logger.LogInformation($"New principal: {principal}");
            return principal;
        }


        [HttpDelete("{principalId}")]
        [LoadPrincipal(DepartmentItemName = "department")]
        [AuthorizeDepartmentPrincipal]
        public NoContentResult Delete(Principal principal)
        {
            Assert.RequireNonNull(principal, nameof(principal));
            _principalRepository.Delete(principal);
            return NoContent();
        }
    }
}