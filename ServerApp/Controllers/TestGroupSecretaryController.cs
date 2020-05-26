using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Filters;
using Exam.Infrastructure;
using Exam.Loaders;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    [Route("api/testGroup/secretaries")]
    public class TestGroupSecretaryController : Controller
    {
        private readonly IRepository<TestGroupSecretary, long> _testGroupSecretaryRepository;
        private readonly ILogger<TestGroupSecretaryController> _logger;


        public TestGroupSecretaryController(IRepository<TestGroupSecretary, long> testGroupSecretaryRepository, 
            ILogger<TestGroupSecretaryController> logger)
        {
            _testGroupSecretaryRepository = testGroupSecretaryRepository;
            _logger = logger;
        }


        [HttpGet("{testGroupSecretaryId}")]
        [LoadTestGroupSecretary]
        public TestGroupSecretary Find(TestGroupSecretary testGroupSecretary) => testGroupSecretary;

        [HttpGet]
        [LoadExamination(Source = ParameterSource.Query)]
        public IEnumerable<TestGroupSecretary> List(Test test, TestGroup testGroup, int skip = 0, int take = 20)
        {
            IQueryable<TestGroupSecretary> queryable = _testGroupSecretaryRepository.Set;
            
            if (test != null)
            {
                queryable = queryable.Where(p => test.Equals(p.TestGroup.Test));
            }
            if (testGroup != null)
            {
                queryable = queryable.Where(p => testGroup.Equals(p.TestGroup));
            }

            queryable = queryable.Skip(skip).Take(take);
            return queryable.ToList();
        }


        [HttpPost]
        [RequireQueryParameter("testGroupId")]
        [RequireQueryParameter("secretaryId")]
        [LoadTestGroup(TestItemName = "test", ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished}")]
        [LoadSecretary(Source = ParameterSource.Query)]
        public CreatedAtActionResult Add(TestGroup testGroup, Secretary secretary)
        {
            Assert.RequireNonNull(testGroup, nameof(testGroup));
            Assert.RequireNonNull(secretary, nameof(secretary));

            if (!secretary.Examination.Equals(testGroup.Test.Examination))
            {
                throw new IncompatibleEntityException<TestGroup, Secretary>(testGroup, secretary);
            }
            
            
            if (_testGroupSecretaryRepository.Exists(p => testGroup.Equals(p.TestGroup) && secretary.Equals(p.Secretary)))
            {
                throw new InvalidValueException("{testGroupSecretary.constraints.uniqueSecretary}");
            }

            TestGroupSecretary testGroupSecretary = new TestGroupSecretary
            {
                Secretary = secretary,
                TestGroup = testGroup
                
            };

            testGroupSecretary = _testGroupSecretaryRepository.Save(testGroupSecretary);

            _logger.LogInformation($"New testGroupSecretary: {testGroupSecretary}");
            return CreatedAtAction("Find", new {testGroupSecretary.Id}, testGroupSecretary);
        }


        [HttpDelete("{testGroupSecretaryId}")]
        [LoadTestGroupSecretary(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished}")]
        public NoContentResult Delete(TestGroupSecretary testGroupSecretary)
        {
            Assert.RequireNonNull(testGroupSecretary, nameof(testGroupSecretary));
            _testGroupSecretaryRepository.Delete(testGroupSecretary);
            return NoContent();
        }
    }
}