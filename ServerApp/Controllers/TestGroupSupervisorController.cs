﻿using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Filters;
using Exam.Infrastructure;
using Exam.Loaders;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    [Route("api/testGroupSupervisors")]
    public class TestGroupSupervisorController : Controller
    {
        private readonly IRepository<TestGroupSupervisor, long> _testGroupSupervisorRepository;
        private readonly IRepository<TestGroup, long> _testGroupRepository;
        private readonly ILogger<TestGroupSupervisorController> _logger;

        public TestGroupSupervisorController(
            IRepository<TestGroupSupervisor, long> testGroupSupervisorRepository, 
            IRepository<TestGroup, long> testGroupRepository, 
            ILogger<TestGroupSupervisorController> logger)
        {
            _testGroupSupervisorRepository = testGroupSupervisorRepository;
            _testGroupRepository = testGroupRepository;
            _logger = logger;
        }

        [HttpGet("{testGroupSupervisorId}")]
        [LoadTestGroupSupervisor]
        public TestGroupSupervisor Find(TestGroupSupervisor testGroupSupervisor) => testGroupSupervisor;

        [HttpGet]
        [LoadExamination(Source = ParameterSource.Query)]
        public IEnumerable<TestGroupSupervisor> List(Test test, TestGroup testGroup, Supervisor supervisor, int skip = 0, int take = 20)
        {
            IQueryable<TestGroupSupervisor> queryable = _testGroupSupervisorRepository.Set;
            
            if (test != null)
            {
                queryable = queryable.Where(p => test.Equals(p.TestGroup.Test));
            }
            if (testGroup != null)
            {
                queryable = queryable.Where(p => testGroup.Equals(p.TestGroup));
            }

            if (supervisor != null)
            {
                queryable = queryable.Where(p => supervisor.Equals(p.Supervisor));
            }

            queryable = queryable.Skip(skip).Take(take);
            return queryable.ToList();
        }


        [HttpPost]
        [RequireQueryParameter("testGroupId")]
        [RequireQueryParameter("supervisorId")]
        [LoadTestGroup(TestItemName = "test", ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        [LoadSupervisor(Source = ParameterSource.Query)]
        [PeriodHaveState(ItemName = "test", State = "PENDING")]
        public CreatedAtActionResult Add(TestGroup testGroup, Supervisor supervisor, [FromQuery] bool isPrincipal = false)
        {
            Assert.RequireNonNull(testGroup, nameof(testGroup));
            Assert.RequireNonNull(supervisor, nameof(supervisor));

            if (!supervisor.Examination.Equals(testGroup.Test.Examination))
            {
                throw new IncompatibleEntityException<TestGroup, Supervisor>(testGroup, supervisor);
            }
            
            
            if (_testGroupSupervisorRepository.Exists(p => testGroup.Equals(p.TestGroup) && supervisor.Equals(p.Supervisor)))
            {
                throw new InvalidValueException("{testGroupSupervisor.constraints.uniqueSupervisor}");
            }

            TestGroupSupervisor testGroupSupervisor = new TestGroupSupervisor
            {
                Supervisor = supervisor,
                TestGroup = testGroup,
                IsPrincipal = isPrincipal
                
            };

            testGroupSupervisor = _testGroupSupervisorRepository.Save(testGroupSupervisor);

            _logger.LogInformation($"New testGroupSupervisor: {testGroupSupervisor}");
            return CreatedAtAction("Find", new {testGroupSupervisor.Id}, testGroupSupervisor);
        }


        [HttpPut("{testGroupSupervisorId}/principal")]
        [LoadTestGroupSupervisor(ExaminationItemName = "examination", TestItemName = "test")]
        [AuthorizeExaminationAdmin]
        [PeriodHaveState(ItemName = "test", State = "PENDING")]
        
        public StatusCodeResult SetPrincipalSupervisor(TestGroupSupervisor testGroupSupervisor)
        {
            Assert.RequireNonNull(testGroupSupervisor, nameof(testGroupSupervisor));
            testGroupSupervisor.IsPrincipal = !testGroupSupervisor.IsPrincipal;
            _testGroupSupervisorRepository.Update(testGroupSupervisor);

            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpDelete("{testGroupSupervisorId}")]
        [LoadTestGroupSupervisor(ExaminationItemName = "examination", TestItemName = "test")]
        [AuthorizeExaminationAdmin]
        [PeriodHaveState(ItemName = "test", State = "PENDING")]
        public NoContentResult Delete(TestGroupSupervisor testGroupSupervisor)
        {
            Assert.RequireNonNull(testGroupSupervisor, nameof(testGroupSupervisor));
            _testGroupSupervisorRepository.Delete(testGroupSupervisor);
            return NoContent();
        }
    }
}