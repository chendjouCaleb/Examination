using System;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace ServerAppTest.Controllers
{
    public class TestGroupSupervisorControllerTests
    {
        private TestGroupSupervisorController _controller;
        private IRepository<TestGroup, long> _testGroupRepository;
        private IRepository<Test, long> _testRepository;
        private IRepository<Supervisor, long> _supervisorRepository;
        private IRepository<TestGroupSupervisor, long> _testGroupSupervisorRepository;
        private IRepository<Group, long> _groupRepository;
        private IRepository<Room, long> _roomRepository;
        private IRepository<Organisation, long> _organisationRepository;
        private IRepository<Examination, long> _examinationRepository;

        private Supervisor _supervisor;
        private Room _room;
        private Group _group;
        private TestGroup _testGroup;
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


            _controller = serviceProvider.GetRequiredService<TestGroupSupervisorController>();


            _organisationRepository = serviceProvider.GetRequiredService<IRepository<Organisation, long>>();
            _supervisorRepository = serviceProvider.GetRequiredService<IRepository<Supervisor, long>>();
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();
            _groupRepository = serviceProvider.GetRequiredService<IRepository<Group, long>>();
            _roomRepository = serviceProvider.GetRequiredService<IRepository<Room, long>>();
            _testGroupRepository = serviceProvider.GetRequiredService<IRepository<TestGroup, long>>();

            _testGroupSupervisorRepository =
                serviceProvider.GetRequiredService<IRepository<TestGroupSupervisor, long>>();
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

            _testGroup = _testGroupRepository.Save(new TestGroup
            {
                Group = _group,
                Test = _test,
                Room = _room
            });

            _supervisor = _supervisorRepository.Save(new Supervisor
            {
                Examination = _examination,
                UserId = _user.Id
            });
        }

        [Test]
        public void Add()
        {
            TestGroupSupervisor testGroupSupervisor =
                _controller.Add(_testGroup, _supervisor).Value as TestGroupSupervisor;

            _testGroupSupervisorRepository.Refresh(testGroupSupervisor);

            Assert.NotNull(testGroupSupervisor);
            Assert.AreEqual(_testGroup, testGroupSupervisor.TestGroup);
            Assert.AreEqual(_supervisor, testGroupSupervisor.Supervisor);
        }

        [Test]
        public void Try_AddSameSupervisorTwoTime_ShouldThrowError()
        {
            _controller.Add(_testGroup, _supervisor);

            InvalidValueException ex =
                Assert.Throws<InvalidValueException>(
                    () => _controller.Add(_testGroup, _supervisor)
                );
            
            Assert.AreEqual("{testGroupSupervisor.constraints.uniqueSupervisor}", ex.Message);
        }

        [Test]
        public void ChangePrincipal_WhenIsTrue_ShouldSetItAtFalse()
        {
            TestGroupSupervisor testGroupSupervisor = _controller.Add(_testGroup, _supervisor).Value
                as TestGroupSupervisor;

            _controller.SetPrincipalSupervisor(testGroupSupervisor);
            _testGroupSupervisorRepository.Refresh(testGroupSupervisor);
            
            Assert.NotNull(testGroupSupervisor);
            Assert.IsTrue(testGroupSupervisor.IsPrincipal);
        }
        
        
        [Test]
        public void ChangePrincipal_WhenIsFalse_ShouldSetItAtTrue()
        {
            TestGroupSupervisor testGroupSupervisor = _controller.Add(_testGroup, _supervisor).Value
                as TestGroupSupervisor;

            _controller.SetPrincipalSupervisor(testGroupSupervisor);
            _testGroupSupervisorRepository.Refresh(testGroupSupervisor);
            
            _controller.SetPrincipalSupervisor(testGroupSupervisor);
            _testGroupSupervisorRepository.Refresh(testGroupSupervisor);
            
            Assert.NotNull(testGroupSupervisor);
            Assert.IsFalse(testGroupSupervisor.IsPrincipal);
        }


        [Test]
        public void Delete()
        {
            TestGroupSupervisor testGroupSupervisor = _controller.Add(_testGroup, _supervisor).Value
                as TestGroupSupervisor;

            _controller.Delete(testGroupSupervisor);
            Assert.False(_testGroupSupervisorRepository.Exists(testGroupSupervisor));
        }
    }
}