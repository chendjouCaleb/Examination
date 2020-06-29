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
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    [Route("api/testGroupCorrectors")]
    public class TestGroupCorrectorController : Controller
    {
        private readonly IRepository<TestGroupCorrector, long> _testGroupCorrectorRepository;
        private readonly IRepository<Corrector, long> _correctorRepository;
        private readonly ILogger<TestGroupCorrectorController> _logger;


        public TestGroupCorrectorController(IRepository<TestGroupCorrector, long> testGroupCorrectorRepository,
            IRepository<Corrector, long> correctorRepository,
            ILogger<TestGroupCorrectorController> logger)
        {
            _testGroupCorrectorRepository = testGroupCorrectorRepository;
            _correctorRepository = correctorRepository;
            _logger = logger;
        }


        [HttpGet("{testGroupCorrectorId}")]
        [LoadTestGroupCorrector]
        public TestGroupCorrector Find(TestGroupCorrector testGroupCorrector) => testGroupCorrector;

        [HttpGet]
        [LoadExamination(Source = ParameterSource.Query)]
        public IEnumerable<TestGroupCorrector> List(Test test, TestGroup testGroup, Corrector corrector, int skip = 0, int take = 20)
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
            
            if (corrector != null)
            {
                queryable = queryable.Where(p => corrector.Equals(p.Corrector));
            }

            queryable = queryable.Skip(skip).Take(take);
            return queryable.ToList();
        }


        [HttpPost]
        [RequireQueryParameter("testGroupId")]
        [RequireQueryParameter("correctorId")]
        [LoadTestGroup(Source = ParameterSource.Query, TestItemName = "test", ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        
        public ObjectResult Add(TestGroup testGroup, [FromQuery] long[] correctorId)
        {
            List<long> ids = new List<long>();

            foreach (var id in correctorId)
            {
                if(!_testGroupCorrectorRepository.Exists(s => testGroup.Equals(s.TestGroup) && s.CorrectorId == id))
                {
                    ids.Add(id);
                }
            }
            
            List<TestGroupCorrector> correctors = new List<TestGroupCorrector>();

            foreach (var id in ids)
            {
                correctors.Add(_Add(testGroup, id));
            }

            return StatusCode(StatusCodes.Status201Created, correctors);
        }


        public TestGroupCorrector _Add(TestGroup testGroup, long correctorId)
        {
            return _Add(testGroup, _correctorRepository.Find(correctorId));
        }
        
        
        public TestGroupCorrector _Add(TestGroup testGroup, Corrector corrector)
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
            return testGroupCorrector;
        }


        [HttpDelete("{testGroupCorrectorId}")]
        [LoadTestGroupCorrector(TestItemName = "test", ExaminationItemName = "examination")]
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