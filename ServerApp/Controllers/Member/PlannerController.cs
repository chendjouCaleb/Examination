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
    [Route("api/planners")]
    public class PlannerController : Controller
    {
        private readonly IRepository<Planner, long> _plannerRepository;
        private readonly MemberController _memberController;
        private readonly ILogger<PlannerController> _logger;


        public PlannerController(IRepository<Planner, long> plannerRepository,
            MemberController memberController,
            ILogger<PlannerController> logger)
        {
            _plannerRepository = plannerRepository;
            _memberController = memberController;
            _logger = logger;
        }


        [HttpGet("{plannerId}")]
        [LoadPlanner]
        public Planner Get(Planner planner) => planner;

        [HttpGet]
        [LoadSchool(Source = ParameterSource.Query)]
        public IEnumerable<Planner> List([FromQuery] long? schoolId, [FromQuery] string userId)
        {
            if (schoolId != null)
            {
                return _plannerRepository.List(c => c.SchoolId == schoolId.Value);
            }

            if (userId != null)
            {
                return _plannerRepository.List(c => c.UserId == userId);
            }

            return new Planner[] { };
        }

        [HttpGet("isPlanner")]
        public bool IsPlanner([FromQuery] long? schoolId, [FromQuery] string userId)
        {
            Assert.RequireNonNull(schoolId, nameof(schoolId));
            Assert.RequireNonNull(userId, nameof(userId));
            return _plannerRepository.Exists(p => p.UserId == userId && p.SchoolId == schoolId);
        }


        [HttpPost]
        [RequireQueryParameter("schoolId")]
        [LoadSchool(Source = ParameterSource.Query)]
        [AuthorizeSchoolPrincipal]
        public ObjectResult Add(School school, [FromQuery] string[] userId)
        {
            Assert.RequireNonNull(school, nameof(school));
            Assert.RequireNonNull(userId, nameof(userId));
            List<string> ids = new List<string>();

            foreach (var id in userId)
            {
                if (!_plannerRepository.Exists(s => school.Equals(s.School) && s.UserId == id))
                {
                    ids.Add(id);
                }
            }

            List<Planner> planners = new List<Planner>();

            foreach (var id in ids)
            {
                planners.Add(_Add(school, id));
            }

            return StatusCode(StatusCodes.Status201Created, planners);
        }


        public Planner _Add(School school, [FromQuery] string userId)
        {
            Assert.RequireNonNull(school, nameof(school));
            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new ArgumentNullException(nameof(userId));
            }

            if (_plannerRepository.Exists(s => school.Equals(s.School) && s.UserId == userId))
            {
                throw new InvalidValueException("{planner.constraints.uniqueUserBySchool}");
            }

            Planner planner = new Planner
            {
                UserId = userId,
                Member = _memberController._Add(school, userId),
                School = school
            };

            planner = _plannerRepository.Save(planner);

            _logger.LogInformation($"New Planner: {planner}");
            return planner;
        }


        [HttpDelete("{plannerId}")]
        [LoadPlanner(SchoolItemName = "school")]
        [AuthorizeSchoolPrincipal]
        public NoContentResult Delete(Planner planner)
        {
            Assert.RequireNonNull(planner, nameof(planner));
            _plannerRepository.Delete(planner);
            return NoContent();
        }
    }
}