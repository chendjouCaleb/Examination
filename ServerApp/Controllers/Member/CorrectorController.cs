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
    [Route("api/correctors")]
    public class CorrectorController : Controller
    {
        private readonly IRepository<Corrector, long> _correctorRepository;
        private readonly MemberController _memberController;
        private readonly ILogger<CorrectorController> _logger;


        public CorrectorController(IRepository<Corrector, long> correctorRepository,
            MemberController memberController,
            ILogger<CorrectorController> logger)
        {
            _correctorRepository = correctorRepository;
            _memberController = memberController;
            _logger = logger;
        }


        [HttpGet("{correctorId}")]
        [LoadCorrector]
        public Corrector Get(Corrector corrector) => corrector;

        [HttpGet]
        [LoadDepartment(Source = ParameterSource.Query)]
        public IEnumerable<Corrector> List([FromQuery] long? departmentId, [FromQuery] string userId)
        {
            if (departmentId != null)
            {
                return _correctorRepository.List(c => c.DepartmentId == departmentId.Value);
            }

            if (userId != null)
            {
                return _correctorRepository.List(c => c.UserId == userId);
            }

            return new Corrector[] { };
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
                if (!_correctorRepository.Exists(s => department.Equals(s.Department) && s.UserId == id))
                {
                    ids.Add(id);
                }
            }

            List<Corrector> correctors = new List<Corrector>();

            foreach (var id in ids)
            {
                correctors.Add(_Add(department, id));
            }

            return StatusCode(StatusCodes.Status201Created, correctors);
        }


        public Corrector _Add(Department department, [FromQuery] string userId)
        {
            Assert.RequireNonNull(department, nameof(department));
            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new ArgumentNullException(nameof(userId));
            }

            if (_correctorRepository.Exists(s => department.Equals(s.Department) && s.UserId == userId))
            {
                throw new InvalidValueException("{corrector.constraints.uniqueUserByDepartment}");
            }

            Corrector corrector = new Corrector
            {
                UserId = userId,
                Member = _memberController._Add(department.School, userId),
                Department = department
            };

            corrector = _correctorRepository.Save(corrector);

            _logger.LogInformation($"New corrector: {corrector}");
            return corrector;
        }


        [HttpDelete("{correctorId}")]
        [LoadCorrector(DepartmentItemName = "department")]
        [AuthorizeDepartmentPrincipal]
        public NoContentResult Delete(Corrector corrector)
        {
            Assert.RequireNonNull(corrector, nameof(corrector));
            _correctorRepository.Delete(corrector);
            return NoContent();
        }
    }
}