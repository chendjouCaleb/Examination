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
    [Route("api/testGroupCorrectors")]
    public class TestGroupCorrectorController : Controller
    {
        private readonly IRepository<TestGroupCorrector, long> _testGroupCorrectorRepository;
        private readonly ILogger<TestGroupCorrectorController> _logger;


        public TestGroupCorrectorController(IRepository<TestGroupCorrector, long> testGroupCorrectorRepository,
            ILogger<TestGroupCorrectorController> logger)
        {
            _testGroupCorrectorRepository = testGroupCorrectorRepository;
            _logger = logger;
        }


        [HttpGet("{testGroupCorrectorId}")]
        [LoadTestGroupCorrector]
        public TestGroupCorrector Find(TestGroupCorrector testGroupCorrector) => testGroupCorrector;

        [HttpGet]
        [LoadExamination(Source = ParameterSource.Query)]
        public IEnumerable<TestGroupCorrector> List(Test test, TestGroup testGroup, int skip = 0, int take = 20)
        {
            IQueryable<TestGroupCorrector> queryable = _testGroupCorrectorRepository.Set;

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
        [RequireQueryParameter("correctorId")]
        [LoadTestGroup(TestItemName = "test" )]
        [AuthorizeExaminationAdmin]
        [PeriodHaveState(ItemName = "test", State = "PENDING")]
        [LoadCorrector(Source = ParameterSource.Query)]
        public CreatedAtActionResult Add(TestGroup testGroup, Corrector corrector)
        {
            Assert.RequireNonNull(testGroup, nameof(testGroup));
            Assert.RequireNonNull(corrector, nameof(corrector));

            if (!corrector.Examination.Equals(testGroup.Test.Examination))
            {
                throw new IncompatibleEntityException<TestGroup, Corrector>(testGroup, corrector);
            }


            if (_testGroupCorrectorRepository.Exists(
                p => testGroup.Equals(p.TestGroup) && corrector.Equals(p.Corrector)))
            {
                throw new InvalidValueException("{testGroupCorrector.constraints.uniqueCorrector}");
            }

            TestGroupCorrector testGroupCorrector = new TestGroupCorrector
            {
                Corrector = corrector,
                TestGroup = testGroup
            };

            testGroupCorrector = _testGroupCorrectorRepository.Save(testGroupCorrector);

            _logger.LogInformation($"New testGroupCorrector: {testGroupCorrector}");
            return CreatedAtAction("Find", new {testGroupCorrector.Id}, testGroupCorrector);
        }


        [HttpDelete("{testGroupCorrectorId}")]
        [LoadTestGroupCorrector(TestItemName = "test")]
        [AuthorizeExaminationAdmin]
        [PeriodHaveState(ItemName = "test", State = "PENDING")]
        public NoContentResult Delete(TestGroupCorrector testGroupCorrector)
        {
            Assert.RequireNonNull(testGroupCorrector, nameof(testGroupCorrector));
            _testGroupCorrectorRepository.Delete(testGroupCorrector);
            return NoContent();
        }
    }
}