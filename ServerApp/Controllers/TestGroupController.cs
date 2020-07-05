using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Filters;
using Exam.Infrastructure;
using Exam.Loaders;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using ServerApp.Hubs;

namespace Exam.Controllers
{
    [Route("api/testGroups")]
    public class TestGroupController : Controller
    {
        private readonly IRepository<TestGroup, long> _testGroupRepository;
        private readonly PaperController _paperController;
        private readonly IHubContext<TestGroupHub, ITestGroupHub> _testGroupHub;


        public TestGroupController(IRepository<TestGroup, long> testGroupRepository, 
            IHubContext<TestGroupHub, ITestGroupHub> testGroupHub, 
            PaperController paperController)
        {
            _testGroupRepository = testGroupRepository;
            _testGroupHub = testGroupHub;
            _paperController = paperController;
        }


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
            //_testGroupRepository.DeleteAll();
//            foreach (Test t in _testRepository.List())
//            {
//                if (t.Speciality == null)
//                {
//                    foreach (Group g  in t.Examination.Groups)
//                    {
//                        _Add(t, g, g.Room);
//                    }
//                }
//                else
//                {
//                    foreach (Group g  in t.Speciality.Groups)
//                    {
//                       _Add(t, g, g.Room);
//                    }
//                }
//                
//            }

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


        [HttpPost]
        [RequireQueryParameter("groupId")]
        [RequireQueryParameter("roomId")]
        [RequireQueryParameter("testId")]
        [LoadGroup(ParameterName = "groupId", Source = ParameterSource.Query)]
        [LoadRoom(ParameterName = "roomId", Source = ParameterSource.Query)]
        [LoadTest(ParameterName = "testId", ExaminationItemName = "examination", Source = ParameterSource.Query)]
        
        [AuthorizeExaminationAdmin]
        [PeriodHaveState(ItemName = "test", State = "PENDING")]
        public CreatedAtActionResult Add(Test test, Group group, Room room)
        {
            TestGroup testGroup = _Add(test, group, room);
            return CreatedAtAction("Find", new {testGroup.Id}, testGroup);
        }
        public TestGroup _Add(Test test, Group group, Room room)
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

            if (test.Speciality != null && !test.Speciality.Equals(group.Speciality))
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

            return testGroup;
        }


        


        [HttpPut("{testGroupId}/room")]
        [RequireQueryParameter("roomId")]
        [LoadRoom(ParameterName = "roomId", Source = ParameterSource.Query)]
        
        [LoadTestGroup(TestItemName = "test", ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        [PeriodHaveState(ItemName = "test", State = "PENDING")]
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
            _testGroupHub.Clients.All.TestGroupStarted(testGroup);
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
            _testGroupHub.Clients.All.TestGroupEnded(testGroup);
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
            _testGroupHub.Clients.All.TestGroupRestarted(testGroup);
            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpDelete("{testGroupId}")]
        [LoadTestGroup(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        public NoContentResult Delete(TestGroup testGroup)
        {
            _paperController.DeleteAll(testGroup);
            _testGroupRepository.Delete(testGroup);
            return NoContent();
        }
        
        

    }
}