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
    [Route("api/secretaries")]
    public class SecretaryController : Controller
    {
        private readonly IRepository<Secretary, long> _secretaryRepository;
        private readonly MemberController _memberController;
        private readonly ILogger<SecretaryController> _logger;


        public SecretaryController(IRepository<Secretary, long> secretaryRepository,
            MemberController memberController,
            ILogger<SecretaryController> logger)
        {
            _secretaryRepository = secretaryRepository;
            _memberController = memberController;
            _logger = logger;
        }


        [HttpGet("{secretaryId}")]
        [LoadSecretary]
        public Secretary Get(Secretary secretary) => secretary;

        [HttpGet]
        [LoadDepartment(Source = ParameterSource.Query)]
        public IEnumerable<Secretary> List([FromQuery] long? departmentId, [FromQuery] string userId)
        {
            if (departmentId != null)
            {
                return _secretaryRepository.List(c => c.DepartmentId == departmentId.Value);
            }

            if (userId != null)
            {
                return _secretaryRepository.List(c => c.UserId == userId);
            }

            return new Secretary[] { };
        }


        [HttpPost]
        [RequireQueryParameter("departmentId")]
        [LoadDepartment(Source = ParameterSource.Query)]
        [IsDepartmentPrincipal]
        public ObjectResult Add(Department department, [FromQuery] string[] userId)
        {
            Assert.RequireNonNull(department, nameof(department));
            Assert.RequireNonNull(userId, nameof(userId));
            List<string> ids = new List<string>();

            foreach (var id in userId)
            {
                if (!_secretaryRepository.Exists(s => department.Equals(s.Department) && s.UserId == id))
                {
                    ids.Add(id);
                }
            }

            List<Secretary> secretaries = new List<Secretary>();

            foreach (var id in ids)
            {
                secretaries.Add(_Add(department, id));
            }

            return StatusCode(StatusCodes.Status201Created, secretaries);
        }


        public Secretary _Add(Department department, [FromQuery] string userId)
        {
            Assert.RequireNonNull(department, nameof(department));
            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new ArgumentNullException(nameof(userId));
            }

            if (_secretaryRepository.Exists(s => department.Equals(s.Department) && s.UserId == userId))
            {
                throw new InvalidValueException("{secretary.constraints.uniqueUserByDepartment}");
            }

            Secretary secretary = new Secretary
            {
                UserId = userId,
                Member = _memberController._Add(department.School, userId),
                Department = department
            };

            secretary = _secretaryRepository.Save(secretary);

            _logger.LogInformation($"New secretary: {secretary}");
            return secretary;
        }


        [HttpDelete("{secretaryId}")]
        [LoadSecretary(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public NoContentResult Delete(Secretary secretary)
        {
            Assert.RequireNonNull(secretary, nameof(secretary));
            _secretaryRepository.Delete(secretary);
            return NoContent();
        }
    }
}