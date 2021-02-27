using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Persistence.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    [Route("api/testGroupCorrectors")]
    public class TestGroupCorrectorController : Controller
    {
        private readonly ITestGroupRepository _testGroupRepository;
        private readonly IRepository<TestGroupCorrector, long> _testGroupCorrectorRepository;
        private readonly IRepository<Corrector, long> _correctorRepository;
        public readonly DbContext dbContext;
        private readonly ILogger<TestGroupCorrectorController> _logger;

        public TestGroupCorrectorController(ITestGroupRepository testGroupRepository,
            IRepository<TestGroupCorrector, long> testGroupCorrectorRepository,
            IRepository<Corrector, long> correctorRepository,
            DbContext dbContext,
            ILogger<TestGroupCorrectorController> logger)
        {
            _testGroupRepository = testGroupRepository;
            _testGroupCorrectorRepository = testGroupCorrectorRepository;
            _correctorRepository = correctorRepository;
            this.dbContext = dbContext;
            _logger = logger;
        }


        [HttpGet("{testGroupCorrectorId}")]
        [LoadTestGroupCorrector]
        public TestGroupCorrector Find(TestGroupCorrector testGroupCorrector) => testGroupCorrector;

        [HttpGet]
        [LoadTestGroup(Source = ParameterSource.Query)]
        [LoadCorrector(Source = ParameterSource.Query)]
        [LoadTest(Source = ParameterSource.Query)]
        public IEnumerable<TestGroupCorrector> List(Test test, TestGroup testGroup, Corrector corrector, int skip = 0,
            int take = 20)
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
        [LoadTestGroup(Source = ParameterSource.Query, SchoolItemName = "school", TestItemName = "test")]
        [IsPlanner]
        public ObjectResult Add(TestGroup testGroup, [FromQuery] long[] correctorId)
        {
            List<long> ids = new List<long>();

            foreach (var id in correctorId)
            {
                if (!_testGroupCorrectorRepository.Exists(s => testGroup.Equals(s.TestGroup) && s.CorrectorId == id))
                {
                    ids.Add(id);
                }
            }

            List<TestGroupCorrector> correctors = new List<TestGroupCorrector>();

            foreach (var id in ids)
            {
                correctors.Add(_Add(testGroup, id));
            }

            dbContext.SaveChanges();

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

            if (!corrector.Department.Equals(_testGroupRepository.GetDepartment(testGroup)))
            {
                throw new IncompatibleEntityException<TestGroup, Corrector>(testGroup, corrector);
            }

            TestGroupCorrector testGroupCorrector = _testGroupCorrectorRepository.First(
                p => testGroup.Equals(p.TestGroup) && corrector.Equals(p.Corrector));

            if (testGroupCorrector != null)
            {
                return testGroupCorrector;
            }

            testGroupCorrector = new TestGroupCorrector
            {
                Corrector = corrector,
                TestGroup = testGroup
            };

             testGroupCorrector = dbContext.Set<TestGroupCorrector>().Add(testGroupCorrector).Entity;

            _logger.LogInformation($"New testGroupCorrector: {testGroupCorrector}");
            return testGroupCorrector;
        }


        [HttpDelete("{testGroupCorrectorId}")]
        [LoadTestGroupCorrector(SchoolItemName = "school")]
        [IsPlanner]
        public NoContentResult Delete(TestGroupCorrector testGroupCorrector)
        {
            Assert.RequireNonNull(testGroupCorrector, nameof(testGroupCorrector));
            var papers = dbContext.Set<Paper>().Where(p => testGroupCorrector.Equals(p.TestGroupCorrector)).ToList();
            
            foreach (Paper paper in papers)
            {
                paper.TestGroupCorrector = null;
                paper.TestGroupCorrectorId = null;
                dbContext.Set<Paper>().Update(paper);
            }

            dbContext.Set<TestGroupCorrector>().Remove(testGroupCorrector);
            dbContext.SaveChanges();
            return NoContent();
        }
    }
}