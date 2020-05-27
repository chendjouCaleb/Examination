using System;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Models;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace ServerAppTest.Controllers
{
    public class TestGroupControllerTests
    {
        private TestGroupController _controller;
        private TestController _testController;
        private IRepository<Test, long> _testRepository;
        private IRepository<TestGroup, long> _testGroupRepository;
        private IRepository<Group, long> _groupRepository;
        private IRepository<Room, long> _roomRepository;
        private IRepository<Organisation, long> _organisationRepository;
        private IRepository<Examination, long> _examinationRepository;

        private Room _room;
        private Group _group;
        private Test _test;
        private Examination _examination;
        private Organisation _organisation;

        private User _user = new User
        {
            Id = Guid.NewGuid().ToString()
        };

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<TestGroupController>();
            _testController = serviceProvider.GetRequiredService<TestController>();

            _organisationRepository = serviceProvider.GetRequiredService<IRepository<Organisation, long>>();
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();
            _groupRepository = serviceProvider.GetRequiredService<IRepository<Group, long>>();
            _roomRepository = serviceProvider.GetRequiredService<IRepository<Room, long>>();
            _testGroupRepository = serviceProvider.GetRequiredService<IRepository<TestGroup, long>>();
            _examinationRepository = serviceProvider.GetRequiredService<IRepository<Examination, long>>();
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();

            _organisation = _organisationRepository.Save(new Organisation
            {
                Name = "Org name"
            });

            _room = _roomRepository.Save(new Room
            {
                Organisation = _organisation,
                Name = "ABC"
            });

            _examination = _examinationRepository.Save(new Examination
            {
                Organisation = _organisation,
                Name = "Exam name",
                StartDate = DateTime.Now.AddMonths(1),
                ExpectedEndDate = DateTime.Now.AddMonths(4)
            });

            _group = _groupRepository.Save(new Group
            {
                Examination = _examination,
                Name = "A1",
                Index = 1,
                Room = _room
            });

            _test = _testRepository.Save(
                new Test
                {
                    Examination = _examination,
                    Name = "test name",
                    Code = "ABC 32",
                    Coefficient = 5,
                    Radical = 20,
                    UseAnonymity = false,
                    ExpectedStartDate = _examination.ExpectedStartDate.AddHours(1),
                    ExpectedEndDate = _examination.ExpectedEndDate.AddHours(3)
                }
            );
        }

        [Test]
        public void Add()
        {
            TestGroup testGroup = _controller._Add(_test, _group, _room);

            _testGroupRepository.Refresh(testGroup);

            Assert.NotNull(testGroup);
            Assert.AreEqual(_test, testGroup.Test);
            Assert.AreEqual(_group, testGroup.Group);
            Assert.AreEqual(_room, testGroup.Room);
        }

        [Test]
        public void ChangeRoom()
        {
            TestGroup testGroup = _controller._Add(_test, _group, _room);
            
            Room room = _roomRepository.Save(new Room
            {
                Organisation = _organisation,
                Name = "ABC200"
            });

            _controller.ChangeRoom(testGroup, room);
            _testGroupRepository.Refresh(testGroup);
            
            Assert.AreEqual(room, testGroup.Room);
        }


        [Test]
        public void Start()
        {
            TestGroup testGroup = _controller._Add(_test, _group, _room);

            _testController.Start(testGroup.Test);
            _controller.Start(testGroup);
            _testGroupRepository.Refresh(testGroup);
            
            Assert.NotNull(testGroup.StartDate);
            Assert.Null(testGroup.EndDate);
            
            Assert.True(DateTimeAssert.EqualsAtMinute(DateTime.Now, testGroup.StartDate.Value));
        }
        
        [Test]
        public void Close()
        {
            TestGroup testGroup = _controller._Add(_test, _group, _room);
            _testController.Start(testGroup.Test);
            _controller.Start(testGroup);
            _controller.Close(testGroup);
            
            _testGroupRepository.Refresh(testGroup);
            
            Assert.NotNull(testGroup.StartDate);
            Assert.NotNull(testGroup.EndDate);
            
            Assert.True(DateTimeAssert.EqualsAtMinute(DateTime.Now, testGroup.EndDate.Value));
        }

        [Test]
        public void Restart()
        {
            TestGroup testGroup = _controller._Add(_test, _group, _room);
            _testController.Start(testGroup.Test);
            _controller.Start(testGroup);
            _controller.Close(testGroup);

            _controller.Restart(testGroup);
            _testGroupRepository.Refresh(testGroup);
            
            Assert.NotNull(testGroup.StartDate);
            Assert.Null(testGroup.EndDate);
            
        }
        
        

        [Test]
        public void Delete()
        {
            TestGroup testGroup = _controller._Add(_test, _group, _room);
            _controller.Delete(testGroup);
            
            Assert.False(_testGroupRepository.Exists(testGroup));
        }
    }
}