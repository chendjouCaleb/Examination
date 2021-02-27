using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Exceptions;
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
    [Route("api/testGroupSecretaries")]
    public class TestGroupSecretaryController : Controller
    {
        private readonly IRepository<TestGroupSecretary, long> _testGroupSecretaryRepository;
        private readonly ITestGroupRepository _testGroupRepository;
        private readonly IRepository<Secretary, long> _secretaryRepository;
        private readonly ILogger<TestGroupSecretaryController> _logger;
        public readonly DbContext dbContext;


        public TestGroupSecretaryController(IRepository<TestGroupSecretary, long> testGroupSecretaryRepository,
            ITestGroupRepository testGroupRepository,
            IRepository<Secretary, long> secretaryRepository,
            DbContext dbContext,
            ILogger<TestGroupSecretaryController> logger)
        {
            _testGroupSecretaryRepository = testGroupSecretaryRepository;
            _testGroupRepository = testGroupRepository;
            _secretaryRepository = secretaryRepository;
            this.dbContext = dbContext;
            _logger = logger;
        }


        [HttpGet("{testGroupSecretaryId}")]
        [LoadTestGroupSecretary]
        public TestGroupSecretary Find(TestGroupSecretary testGroupSecretary) => testGroupSecretary;

        [HttpGet]
        [LoadTestGroup(Source = ParameterSource.Query)]
        [LoadSecretary(Source = ParameterSource.Query)]
        [LoadTest(Source = ParameterSource.Query)]
        public IEnumerable<TestGroupSecretary> List(Test test, TestGroup testGroup, Secretary secretary, int skip = 0,
            int take = 20)
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

            if (secretary != null)
            {
                queryable = queryable.Where(p => secretary.Equals(p.Secretary));
            }

            queryable = queryable.Skip(skip).Take(take);
            return queryable.ToList();
        }


        [HttpPost]
        [RequireQueryParameter("testGroupId")]
        [RequireQueryParameter("secretaryId")]
        [LoadTestGroup(Source = ParameterSource.Query, SchoolItemName = "school")]
        [IsPlanner]
        public ObjectResult Add(TestGroup testGroup, [FromQuery] long[] secretaryId)
        {
            List<long> ids = new List<long>();

            foreach (var id in secretaryId)
            {
                if (!_testGroupSecretaryRepository.Exists(s => testGroup.Equals(s.TestGroup) && s.SecretaryId == id))
                {
                    ids.Add(id);
                }
            }

            List<TestGroupSecretary> secretarys = new List<TestGroupSecretary>();

            foreach (var id in ids)
            {
                secretarys.Add(Add(testGroup, id));
            }

            dbContext.SaveChanges();

            return StatusCode(StatusCodes.Status201Created, secretarys);
        }

        public TestGroupSecretary Add(TestGroup testGroup, long id)
        {
            return _Add(testGroup, _secretaryRepository.Find(id));
        }

        public TestGroupSecretary _Add(TestGroup testGroup, Secretary secretary)
        {
            Assert.RequireNonNull(testGroup, nameof(testGroup));
            Assert.RequireNonNull(secretary, nameof(secretary));

            if (!secretary.Department.Equals(_testGroupRepository.GetDepartment(testGroup)))
            {
                throw new IncompatibleEntityException<TestGroup, Secretary>(testGroup, secretary);
            }

            TestGroupSecretary testGroupSecretary = _testGroupSecretaryRepository.First(
                p => testGroup.Equals(p.TestGroup) && secretary.Equals(p.Secretary));
            if (testGroupSecretary != null)
            {
                return testGroupSecretary;
            }

            testGroupSecretary = new TestGroupSecretary
            {
                Secretary = secretary,
                TestGroup = testGroup
            };

            testGroupSecretary = dbContext.Set<TestGroupSecretary>().Add(testGroupSecretary).Entity;

            _logger.LogInformation($"New testGroupSecretary: {testGroupSecretary}");
            return testGroupSecretary;
        }


        [HttpDelete("{testGroupSecretaryId}")]
        [LoadTestGroupSecretary(SchoolItemName = "school")]
        [IsPlanner]
        public NoContentResult Delete(TestGroupSecretary testGroupSecretary)
        {
            Assert.RequireNonNull(testGroupSecretary, nameof(testGroupSecretary));
            var papers = dbContext.Set<Paper>().Where(p => testGroupSecretary.Equals(p.TestGroupSecretary)).ToList();
            
            foreach (Paper paper in papers)
            {
                paper.TestGroupSecretary = null;
                paper.TestGroupSecretaryId = null;
                dbContext.Set<Paper>().Update(paper);
            }

            dbContext.Set<TestGroupSecretary>().Remove(testGroupSecretary);
            dbContext.SaveChanges();
            return NoContent();
        }
    }
}