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
    [Route("api/testGroupSecretaries")]
    public class TestGroupSecretaryController : Controller
    {
        private readonly IRepository<TestGroupSecretary, long> _testGroupSecretaryRepository;
        private readonly IRepository<Secretary, long> _secretaryRepository;
        private readonly ILogger<TestGroupSecretaryController> _logger;


        public TestGroupSecretaryController(IRepository<TestGroupSecretary, long> testGroupSecretaryRepository, 
            IRepository<Secretary, long> secretaryRepository,
            ILogger<TestGroupSecretaryController> logger)
        {
            _testGroupSecretaryRepository = testGroupSecretaryRepository;
            _secretaryRepository = secretaryRepository;
            _logger = logger;
        }


        [HttpGet("{testGroupSecretaryId}")]
        [LoadTestGroupSecretary]
        public TestGroupSecretary Find(TestGroupSecretary testGroupSecretary) => testGroupSecretary;

        [HttpGet]
        [LoadTestGroup(Source = ParameterSource.Query)]
        [LoadSecretary(Source = ParameterSource.Query)]
        [LoadTest(Source = ParameterSource.Query)]
        public IEnumerable<TestGroupSecretary> List(Test test, TestGroup testGroup, Secretary secretary, int skip = 0, int take = 20)
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
        [LoadTestGroup(Source = ParameterSource.Query, TestItemName = "test", ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        
        public ObjectResult Add(TestGroup testGroup, [FromQuery] long[] secretaryId)
        {
            List<long> ids = new List<long>();

            foreach (var id in secretaryId)
            {
                if(!_testGroupSecretaryRepository.Exists(s => testGroup.Equals(s.TestGroup) && s.SecretaryId == id))
                {
                    ids.Add(id);
                }
            }
            
            List<TestGroupSecretary> secretarys = new List<TestGroupSecretary>();

            foreach (var id in ids)
            {
                secretarys.Add(Add(testGroup, id));
            }

            return StatusCode(StatusCodes.Status201Created, secretarys);
        }

        public TestGroupSecretary Add(TestGroup testGroup, long id)
        {
            return Add(testGroup, _secretaryRepository.Find(id));
        }
        
        public TestGroupSecretary Add(TestGroup testGroup, Secretary secretary)
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
            return testGroupSecretary;
        }


        [HttpDelete("{testGroupSecretaryId}")]
        [LoadTestGroupSecretary(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        [PeriodHaveState(ItemName = "test", State = "PENDING")]
        public NoContentResult Delete(TestGroupSecretary testGroupSecretary)
        {
            Assert.RequireNonNull(testGroupSecretary, nameof(testGroupSecretary));
            _testGroupSecretaryRepository.Delete(testGroupSecretary);
            return NoContent();
        }
    }
}