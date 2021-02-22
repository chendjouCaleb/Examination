using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Filters;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Persistence.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    [Route("api/testGroupSupervisors")]
    public class TestGroupSupervisorController : Controller
    {
        private readonly IRepository<TestGroupSupervisor, long> _testGroupSupervisorRepository;
        private readonly ITestGroupRepository _testGroupRepository;
        private readonly IRepository<Supervisor, long> _supervisorRepository;
        private readonly ILogger<TestGroupSupervisorController> _logger;
        private readonly DbContext _dbContext;


        public TestGroupSupervisorController(IRepository<TestGroupSupervisor, long> testGroupSupervisorRepository,
            ITestGroupRepository testGroupRepository, 
            IRepository<Supervisor, long> supervisorRepository,
            DbContext dbContext,
            ILogger<TestGroupSupervisorController> logger)
        {
            _testGroupSupervisorRepository = testGroupSupervisorRepository;
            _testGroupRepository = testGroupRepository;
            _supervisorRepository = supervisorRepository;
            _dbContext = dbContext;
            _logger = logger;
        }

        [HttpGet("{testGroupSupervisorId}")]
        [LoadTestGroupSupervisor]
        public TestGroupSupervisor Get(TestGroupSupervisor testGroupSupervisor) => testGroupSupervisor;

        public TestGroupSupervisor Find(TestGroup testGroup, Supervisor supervisor)
        {
            return _testGroupSupervisorRepository
                .First(p => testGroup.Equals(p.TestGroup) && supervisor.Equals(p.Supervisor));
        }

        [HttpGet]
        [LoadTestGroup(Source = ParameterSource.Query)]
        [LoadSupervisor(Source = ParameterSource.Query)]
        [LoadTest(Source = ParameterSource.Query)]
        public IEnumerable<TestGroupSupervisor> List(Test test, TestGroup testGroup, Supervisor supervisor,
            int skip = 0, int take = 20)
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
        [LoadTestGroup(Source = ParameterSource.Query, SchoolItemName = "school", TestItemName = "test")]
        [IsPlanner]
        [PeriodDontHaveState(ItemName = "test", State = "FINISHED")]
        public ObjectResult Add(TestGroup testGroup, [FromQuery] long[] supervisorId)
        {
            List<long> ids = new List<long>();

            foreach (var id in supervisorId)
            {
                if (!_testGroupSupervisorRepository.Exists(s => testGroup.Equals(s.TestGroup) && s.SupervisorId == id))
                {
                    ids.Add(id);
                }
            }

            List<TestGroupSupervisor> supervisors = new List<TestGroupSupervisor>();

            foreach (var id in ids)
            {
                supervisors.Add(_Add(testGroup, id));
            }

            _dbContext.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, supervisors);
        }


        public TestGroupSupervisor _Add(TestGroup testGroup, long supervisorId)
        {
            return _Add(testGroup, _supervisorRepository.Find(supervisorId));
        }


        public TestGroupSupervisor _Add(TestGroup testGroup, Supervisor supervisor,
            [FromQuery] bool isPrincipal = false)
        {
            Assert.RequireNonNull(testGroup, nameof(testGroup));
            Assert.RequireNonNull(supervisor, nameof(supervisor));

            if (!supervisor.Department.Equals(_testGroupRepository.GetDepartment(testGroup)))
            {
                throw new IncompatibleEntityException<TestGroup, Supervisor>(testGroup, supervisor);
            }

            TestGroupSupervisor testGroupSupervisor = Find(testGroup, supervisor);

            if (testGroupSupervisor != null)
            {
                return testGroupSupervisor;
            }

            testGroupSupervisor = new TestGroupSupervisor
            {
                Supervisor = supervisor,
                TestGroup = testGroup,
                IsPrincipal = isPrincipal
            };

            testGroupSupervisor = _dbContext.Set<TestGroupSupervisor>().Add(testGroupSupervisor).Entity;

            _logger.LogInformation($"New testGroupSupervisor: {testGroupSupervisor}");
            return testGroupSupervisor;
        }


        [HttpPut("{testGroupSupervisorId}/principal")]
        [LoadTestGroupSupervisor(SchoolItemName = "school", TestItemName = "test")]
        [IsPlanner]
        [PeriodDontHaveState(ItemName = "test", State = "FINISHED")]
        public StatusCodeResult SetPrincipalSupervisor(TestGroupSupervisor testGroupSupervisor)
        {
            Assert.RequireNonNull(testGroupSupervisor, nameof(testGroupSupervisor));
            testGroupSupervisor.IsPrincipal = !testGroupSupervisor.IsPrincipal;
            _testGroupSupervisorRepository.Update(testGroupSupervisor);

            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpDelete("{testGroupSupervisorId}")]
        [LoadTestGroupSupervisor(SchoolItemName = "school", TestItemName = "test")]
        [IsPlanner]
        [PeriodHaveState(ItemName = "test", State = "PENDING")]
        public NoContentResult Delete(TestGroupSupervisor testGroupSupervisor)
        {
            Assert.RequireNonNull(testGroupSupervisor, nameof(testGroupSupervisor));
            var papers = _dbContext.Set<Paper>().Where(p => testGroupSupervisor.Equals(p.TestGroupSupervisor)).ToList();
            
            foreach (Paper paper in papers)
            {
                paper.TestGroupSupervisor = null;
                paper.TestGroupSupervisorId = null;
                _dbContext.Set<Paper>().Update(paper);
            }

            _dbContext.Set<TestGroupSupervisor>().Remove(testGroupSupervisor);
            _dbContext.SaveChanges();
            return NoContent();
        }
    }
}