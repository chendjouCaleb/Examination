using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Loaders;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    [Route("api/testGroups")]
    public class TestGroupController : Controller
    {
        private IRepository<TestGroup, long> _testGroupRepository;


        [HttpGet("{testGroupId}")]
        [LoadTestGroup]
        public TestGroup Find(TestGroup testGroup) => testGroup;


        [HttpGet]
        [LoadGroup(ParameterName = "groupId", Source = ParameterSource.Query)]
        [LoadRoom(ParameterName = "roomId", Source = ParameterSource.Query)]
        [LoadTest(ParameterName = "testId", Source = ParameterSource.Query)]
        public IEnumerable<TestGroup> List(Test test, Group group, Room room,
            [FromQuery] string state, [FromQuery] uint skip = 0, [FromQuery] uint take = 10)
        {
            IQueryable<TestGroup> queryable = _testGroupRepository.Set;

            if (test != null)
            {
                queryable = queryable.Where(g => test.Equals(g.Test));
            }

            if (group != null)
            {
                queryable = queryable.Where(g => group.Equals(g.Group));
            }

            if (room != null)
            {
                queryable = queryable.Where(g => room.Equals(g.Room));
            }

            if (!string.IsNullOrWhiteSpace(state))
            {
                queryable = queryable.Where(g => room.Equals(g.Room));
            }

            queryable = queryable.Skip((int) skip).Take((int) take);

            return queryable.ToList();
        }


        [HttpGet]
        [LoadGroup(ParameterName = "groupId", Source = ParameterSource.Query)]
        [LoadRoom(ParameterName = "roomId", Source = ParameterSource.Query)]
        [LoadTest(ParameterName = "testId", Source = ParameterSource.Query)]
        public CreatedAtActionResult Add(Test test, Group group, Room room)
        {
            Assert.RequireNonNull(test, nameof(test));
            Assert.RequireNonNull(group, nameof(group));
            Assert.RequireNonNull(room, nameof(room));

            if (!test.Examination.Equals(group.Examination))
            {
                throw new IncompatibleEntityException<Test, Group>(test, group);
            }
            
            if (!room.Organisation.Equals(group.Examination.Organisation))
            {
                throw new IncompatibleEntityException<Test, Group>(test, group);
            }
            
            TestGroup testGroup = new TestGroup
            {
                Test = test,
                Group = group,
                Room = room
            };

            testGroup = _testGroupRepository.Save(testGroup);

            return CreatedAtAction("Find", new {testGroup.Id}, testGroup);
        }


        [HttpPut("{testGroupId}/room")]
        [RequireQueryParameter("roomId")]
        [LoadRoom(ParameterName = "roomId", Source = ParameterSource.Query)]
        public StatusCodeResult ChangeRoom(TestGroup testGroup, Room room)
        {
            Assert.RequireNonNull(testGroup, nameof(testGroup));
            Assert.RequireNonNull(room, nameof(room));
            if (!room.Organisation.Equals(testGroup.Test.Examination.Organisation))
            {
                throw new IncompatibleEntityException<TestGroup, Room>(testGroup, room);
            }
            

            testGroup.Room = room;
            
            _testGroupRepository.Update(testGroup);
            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{testGroupId}/start")]
        public StatusCodeResult Start(TestGroup testGroup)
        {
            Assert.RequireNonNull(testGroup, nameof(testGroup));

            if (testGroup.Test.State != PeriodState.PROGRESS)
            {
                throw new InvalidOperationException("{testGroup.constraints.startAfterTest}");
            }
            
            testGroup.StartDate = DateTime.Now;
            _testGroupRepository.Update(testGroup);
            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpPut("{testGroupId}/end")]
        public StatusCodeResult End(TestGroup testGroup)
        {
            Assert.RequireNonNull(testGroup, nameof(testGroup));

            if (testGroup.GetState() != PeriodState.PROGRESS)
            {
                throw new InvalidOperationException("{testGroup.constraints.endAfterStart}");
            }  
            testGroup.EndDate = DateTime.Now;
            _testGroupRepository.Update(testGroup);
            return StatusCode(StatusCodes.Status202Accepted);
        }
        
        [HttpPut("{testGroupId}/restart")]
        public StatusCodeResult Restart(TestGroup testGroup)
        {
            Assert.RequireNonNull(testGroup, nameof(testGroup));

            if (testGroup.GetState() != PeriodState.FINISHED)
            {
                throw new InvalidOperationException("{testGroup.constraints.restartAfterEnd}");
            }  
            testGroup.EndDate = null;
            _testGroupRepository.Update(testGroup);
            return StatusCode(StatusCodes.Status202Accepted);
        }

    }
}