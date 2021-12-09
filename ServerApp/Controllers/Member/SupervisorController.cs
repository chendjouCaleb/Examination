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
    [Route("api/supervisors")]
    public class SupervisorController : Controller
    {
        private readonly IRepository<Supervisor, long> _supervisorRepository;
        private readonly MemberController _memberController;
        private readonly ILogger<SupervisorController> _logger;


        public SupervisorController(IRepository<Supervisor, long> supervisorRepository,
            MemberController memberController,
            ILogger<SupervisorController> logger)
        {
            _supervisorRepository = supervisorRepository;
            _memberController = memberController;
            _logger = logger;
        }


        [HttpGet("{supervisorId}")]
        [LoadSupervisor]
        public Supervisor Get(Supervisor supervisor) => supervisor;

        [HttpGet]
        [LoadDepartment(Source = ParameterSource.Query)]
        public IEnumerable<Supervisor> List([FromQuery] long? departmentId, [FromQuery] string userId)
        {
            if (departmentId != null)
            {
                return _supervisorRepository.List(c => c.DepartmentId == departmentId.Value);
            }

            if (userId != null)
            {
                return _supervisorRepository.List(c => c.UserId == userId);
            }

            return new Supervisor[] { };
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
                if (!_supervisorRepository.Exists(s => department.Equals(s.Department) && s.UserId == id))
                {
                    ids.Add(id);
                }
            }

            List<Supervisor> supervisors = new List<Supervisor>();

            foreach (var id in ids)
            {
                supervisors.Add(_Add(department, id));
            }

            return StatusCode(StatusCodes.Status201Created, supervisors);
        }


        public Supervisor _Add(Department department, [FromQuery] string userId)
        {
            Assert.RequireNonNull(department, nameof(department));
            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new ArgumentNullException(nameof(userId));
            }

            if (_supervisorRepository.Exists(s => department.Equals(s.Department) && s.UserId == userId))
            {
                throw new InvalidValueException("{supervisor.constraints.uniqueUserByDepartment}");
            }

            Supervisor supervisor = new Supervisor
            {
                UserId = userId,
                Member = _memberController._Add(department.School, userId),
                Department = department
            };

            supervisor = _supervisorRepository.Save(supervisor);

            _logger.LogInformation($"New supervisor: {supervisor}");
            return supervisor;
        }


        [HttpDelete("{supervisorId}")]
        [LoadSupervisor(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public NoContentResult Delete(Supervisor supervisor)
        {
            Assert.RequireNonNull(supervisor, nameof(supervisor));
            _supervisorRepository.Delete(supervisor);
            return NoContent();
        }
    }
}