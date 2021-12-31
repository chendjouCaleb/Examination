using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Exam.Authorizers;
using Exam.Destructors;
using Exam.Entities;
using Exam.Filters;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Persistence.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using ServerApp.Hubs;

namespace Exam.Controllers
{
    [Route("api/testGroups")]
    public class TestGroupController : Controller
    {
        private readonly ITestGroupRepository _testGroupRepository;
        private readonly ITestRepository _testRepository;
        private readonly DbContext _dbContext;
        private readonly IHubContext<TestGroupHub, ITestGroupHub> _testGroupHub;


        public TestGroupController(ITestGroupRepository testGroupRepository,
            ITestRepository testRepository,
            DbContext dbContext,
            IHubContext<TestGroupHub, ITestGroupHub> testGroupHub)
        {
            _dbContext = dbContext;
            _testGroupRepository = testGroupRepository;
            _testRepository = testRepository;
            _testGroupHub = testGroupHub;
        }


        [HttpGet("{testGroupId}")]
        [LoadTestGroup]
        public TestGroup Find(TestGroup testGroup, User user)
        {
            if (user != null)
            {
                testGroup.Relation = _testGroupRepository.UserTestGroup(testGroup, user.Id);
            }
            return testGroup;
        }

        void _Update(TestGroup testGroup)
        {
            
            testGroup.CorrectedPaperCount = (uint)testGroup.Papers.Count(p => p.Score != null);
            testGroup.PresentPaperCount = (uint)testGroup.Papers.Count(p => p.IsPresent);
            testGroup.PaperCount = (uint) testGroup.Papers.Count;
            testGroup.ConsignedPaperCount = (uint)testGroup.Papers.Count(p => p.SecretaryUserId != null);
            
            _testGroupRepository.Update(testGroup);
        }

        [HttpGet("{testGroupId}/statistics")]
        [LoadTestGroup]
        public TestGroupStatistics GetStatistics(TestGroup testGroup)
        {
            return _testGroupRepository.GetStatistics(testGroup);
        }


        [HttpGet]
        public IEnumerable<TestGroup> List([FromQuery] long[]? testId, [FromQuery] long? roomId,
            [FromQuery] string state, [FromQuery] int skip = 0, [FromQuery] int take = 10)
        {
            IQueryable<TestGroup> queryable = _testGroupRepository.Set;
            

            if (testId != null)
            {
                queryable = queryable.Where(g => testId.Contains(g.TestId));
            }


            if (roomId != null)
            {
                queryable = queryable.Where(g => roomId == g.RoomId);
            }

            if (!string.IsNullOrWhiteSpace(state))
            {
                queryable = queryable.Where(g => g.GetState() == state);
            }

            var collection = queryable.Skip(skip).Take(take);

            return new ItemList<TestGroup>(queryable.ToList(), collection.Count(), take, skip);
        }


        [HttpPost]
        [RequireQueryParameter("roomId")]
        [RequireQueryParameter("testId")]
        [LoadRoom(ParameterName = "roomId", SchoolItemName = "school", Source = ParameterSource.Query)]
        [LoadTest(ParameterName = "testId", Source = ParameterSource.Query)]
        [IsPlanner]
        [PeriodHaveState(ItemName = "test", State = "PENDING")]
        public CreatedAtActionResult Add(Test test, Room room)
        {
            TestGroup testGroup = _Add(test, room);
            return CreatedAtAction("Find", new {testGroup.Id}, testGroup);
        }

        public TestGroup _Add(Test test, Room room)
        {
            Assert.RequireNonNull(test, nameof(test));
            Assert.RequireNonNull(room, nameof(room));

            TestGroup testGroup = _testGroupRepository.First(t => room.Equals(t.Room) && test.Equals(t.Test));

            if (testGroup != null)
            {
                throw new DuplicateObjectException("DUPLICATE_GROUP_ROOM");
            }

            if (!room.School.Equals(_testRepository.GetSchool(test)))
            {
                throw new IncompatibleEntityException<Test, Room>(test, room);
            }

            testGroup = new TestGroup
            {
                Index = (int) _testGroupRepository.Count(t => test.Equals(t.Test)),
                Test = test,
                Room = room,
                Capacity = room.Capacity
            };
            test.TestGroupCount++;

            _dbContext.Set<TestGroup>().Add(testGroup);
            _dbContext.Update(test);

            _dbContext.SaveChanges();

            return testGroup;
        }

        [HttpPut("{testGroupId}/start")]
        [LoadTestGroup(TestItemName = "test")]
        [AuthorizeTestGroupSupervisor(Principal = true)]
        [PeriodHaveState(ItemName = "test", State = "PROGRESS")]
        public StatusCodeResult Start(TestGroup testGroup)
        {
            Assert.RequireNonNull(testGroup, nameof(testGroup));

            if (testGroup.Test.State != PeriodState.PROGRESS)
            {
                throw new InvalidOperationException("{testGroup.constraints.startAfterTest}");
            }

            testGroup.StartDate = DateTime.Now;
            _testGroupRepository.Update(testGroup);
            _testGroupHub.Clients?.All.TestGroupStarted(testGroup);
            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpPut("{testGroupId}/end")]
        [LoadTestGroup(TestItemName = "test")]
        [AuthorizeTestGroupSupervisor(Principal = true)]
        [PeriodHaveState(ItemName = "test", State = "PROGRESS")]
        public StatusCodeResult End(TestGroup testGroup)
        {
            Assert.RequireNonNull(testGroup, nameof(testGroup));

            if (testGroup.GetState() != PeriodState.PROGRESS)
            {
                throw new InvalidOperationException("{testGroup.constraints.endAfterStart}");
            }

            testGroup.EndDate = DateTime.Now;
            _testGroupRepository.Update(testGroup);
            _testGroupHub.Clients?.All.TestGroupEnded(testGroup);
            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpPut("{testGroupId}/restart")]
        [LoadTestGroup(TestItemName = "test")]
        [AuthorizeTestGroupSupervisor(Principal = true)]
        [PeriodHaveState(ItemName = "test", State = "PROGRESS")]
        public StatusCodeResult Restart(TestGroup testGroup)
        {
            Assert.RequireNonNull(testGroup, nameof(testGroup));

            if (testGroup.GetState() != PeriodState.FINISHED)
            {
                throw new InvalidOperationException("{testGroup.constraints.restartAfterEnd}");
            }

            testGroup.EndDate = null;
            _testGroupRepository.Update(testGroup);
            _testGroupHub.Clients?.All.TestGroupRestarted(testGroup);
            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpDelete("{testGroupId}")]
        [LoadTestGroup(SchoolItemName = "school")]
        [IsPlanner]
        public NoContentResult Delete(TestGroup testGroup)
        {
            if (testGroup.Test.StartDate != null)
            {
                throw new InvalidOperationException("{testGroup.constraints.noRemoveAfterTestStart}");
            }

            TestGroupDestructor destructor = new TestGroupDestructor(_dbContext);
            destructor.Destroy(testGroup);

            return NoContent();
        }
    }
}