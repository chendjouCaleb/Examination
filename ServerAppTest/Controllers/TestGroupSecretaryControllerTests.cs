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
    public class TestGroupSecretaryControllerTests
    {
        private TestGroupSecretaryController _controller;
        private IRepository<TestGroup, long> _testGroupRepository;
        private IRepository<Test, long> _testRepository;
        private IRepository<Secretary, long> _secretaryRepository;
        private IRepository<TestGroupSecretary, long> _testGroupSecretaryRepository;
        private IRepository<Group, long> _groupRepository;
        private IRepository<Room, long> _roomRepository;
        private IRepository<Organisation, long> _organisationRepository;
        private IRepository<Examination, long> _examinationRepository;

        private Secretary _secretary;
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


            _controller = serviceProvider.GetRequiredService<TestGroupSecretaryController>();


            _organisationRepository = serviceProvider.GetRequiredService<IRepository<Organisation, long>>();
            _secretaryRepository = serviceProvider.GetRequiredService<IRepository<Secretary, long>>();
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();
            _groupRepository = serviceProvider.GetRequiredService<IRepository<Group, long>>();
            _roomRepository = serviceProvider.GetRequiredService<IRepository<Room, long>>();
            _testGroupRepository = serviceProvider.GetRequiredService<IRepository<TestGroup, long>>();

            _testGroupSecretaryRepository =
                serviceProvider.GetRequiredService<IRepository<TestGroupSecretary, long>>();
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

            _secretary = _secretaryRepository.Save(new Secretary
            {
                Examination = _examination,
                UserId = _user.Id
            });
        }

        [Test]
        public void Add()
        {
            TestGroupSecretary testGroupSecretary = _controller.Add(_testGroup, _secretary);

            _testGroupSecretaryRepository.Refresh(testGroupSecretary);

            Assert.NotNull(testGroupSecretary);
            Assert.AreEqual(_testGroup, testGroupSecretary.TestGroup);
            Assert.AreEqual(_secretary, testGroupSecretary.Secretary);
        }

        [Test]
        public void Try_AddSameSecretaryTwoTime_ShouldThrowError()
        {
            _controller.Add(_testGroup, _secretary);

            InvalidValueException ex =
                Assert.Throws<InvalidValueException>(
                    () => _controller.Add(_testGroup, _secretary)
                );
            
            Assert.AreEqual("{testGroupSecretary.constraints.uniqueSecretary}", ex.Message);
        }


        [Test]
        public void Delete()
        {
            TestGroupSecretary testGroupSecretary = _controller.Add(_testGroup, _secretary);

            _controller.Delete(testGroupSecretary);
            Assert.False(_testGroupSecretaryRepository.Exists(testGroupSecretary));
        }
    }
}