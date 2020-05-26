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
    public class TestGroupCorrectorControllerTests
    {
        private TestGroupCorrectorController _controller;
        private IRepository<TestGroup, long> _testGroupRepository;
        private IRepository<Test, long> _testRepository;
        private IRepository<Corrector, long> _correctorRepository;
        private IRepository<TestGroupCorrector, long> _testGroupCorrectorRepository;
        private IRepository<Group, long> _groupRepository;
        private IRepository<Room, long> _roomRepository;
        private IRepository<Organisation, long> _organisationRepository;
        private IRepository<Examination, long> _examinationRepository;

        private Corrector _corrector;
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


            _controller = serviceProvider.GetRequiredService<TestGroupCorrectorController>();


            _organisationRepository = serviceProvider.GetRequiredService<IRepository<Organisation, long>>();
            _correctorRepository = serviceProvider.GetRequiredService<IRepository<Corrector, long>>();
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();
            _groupRepository = serviceProvider.GetRequiredService<IRepository<Group, long>>();
            _roomRepository = serviceProvider.GetRequiredService<IRepository<Room, long>>();
            _testGroupRepository = serviceProvider.GetRequiredService<IRepository<TestGroup, long>>();

            _testGroupCorrectorRepository =
                serviceProvider.GetRequiredService<IRepository<TestGroupCorrector, long>>();
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

            _corrector = _correctorRepository.Save(new Corrector
            {
                Examination = _examination,
                UserId = _user.Id
            });
        }

        [Test]
        public void Add()
        {
            TestGroupCorrector testGroupCorrector =
                _controller.Add(_testGroup, _corrector).Value as TestGroupCorrector;

            _testGroupCorrectorRepository.Refresh(testGroupCorrector);

            Assert.NotNull(testGroupCorrector);
            Assert.AreEqual(_testGroup, testGroupCorrector.TestGroup);
            Assert.AreEqual(_corrector, testGroupCorrector.Corrector);
        }

        [Test]
        public void Try_AddSameCorrectorTwoTime_ShouldThrowError()
        {
            _controller.Add(_testGroup, _corrector);

            InvalidValueException ex =
                Assert.Throws<InvalidValueException>(
                    () => _controller.Add(_testGroup, _corrector)
                );
            
            Assert.AreEqual("{testGroupCorrector.constraints.uniqueCorrector}", ex.Message);
        }


        [Test]
        public void Delete()
        {
            TestGroupCorrector testGroupCorrector = _controller.Add(_testGroup, _corrector).Value
                as TestGroupCorrector;

            _controller.Delete(testGroupCorrector);
            Assert.False(_testGroupCorrectorRepository.Exists(testGroupCorrector));
        }
    }
}