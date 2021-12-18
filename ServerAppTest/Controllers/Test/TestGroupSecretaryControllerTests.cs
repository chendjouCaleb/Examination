using System;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.EntityFrameworkCore;
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

        private IRepository<Room, long> _roomRepository;

        private Secretary _secretary;
        private Room _room;

        private TestGroup _testGroup;
        private Test _test;
        private Examination _examination;
        private School _school;

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
            _secretaryRepository = serviceProvider.GetRequiredService<IRepository<Secretary, long>>();
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();

            _roomRepository = serviceProvider.GetRequiredService<IRepository<Room, long>>();
            _testGroupRepository = serviceProvider.GetRequiredService<IRepository<TestGroup, long>>();

            _testGroupSecretaryRepository =
                serviceProvider.GetRequiredService<IRepository<TestGroupSecretary, long>>();
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();


            DbContext dbContext = serviceProvider.GetRequiredService<DbContext>();

            var builder = new TestExaminationBuilder(serviceProvider);
            _examination = builder.Build();
            _school = builder.School;
            
            _room = _roomRepository.Save(new Room
            {
                School = _school,
                Name = "ABC"
            });

            ExaminationLevel examinationLevel = dbContext.Set<ExaminationLevel>()
                .First(e => e.ExaminationDepartment.Examination.Equals(_examination));

            SemesterCourse semesterCourse = dbContext.Set<SemesterCourse>()
                .First(s => s.SemesterLevel.Equals(examinationLevel.SemesterLevel));

            Department department = dbContext.Set<Department>()
                .First(s => s.School.Equals(_school));

            _room = _roomRepository.Save(new Room
            {
                School = _school,
                Name = "ABC"
            });

            _test = _testRepository.Save(
                new Test
                {
                    SemesterCourse = semesterCourse,
                    Coefficient = 5,
                    ExaminationLevel = examinationLevel,
                    UseAnonymity = false,
                    ExpectedStartDate = _examination.ExpectedStartDate.AddHours(1),
                    ExpectedEndDate = _examination.ExpectedEndDate.AddHours(3)
                }
            );

            _testGroup = _testGroupRepository.Save(new TestGroup
            {
                Test = _test,
                Room = _room
            });

            _secretary = _secretaryRepository.Save(new Secretary
            {
                Department = department,
                UserId = _user.Id
            });
        }

        [Test]
        public void Add()
        {
            TestGroupSecretary testGroupSecretary = _controller._Add(_testGroup, _secretary);
            Assert.NotNull(testGroupSecretary);
            Assert.AreEqual(_testGroup, testGroupSecretary.TestGroup);
            Assert.AreEqual(_secretary, testGroupSecretary.Secretary);
        }

        [Test]
        public void Try_AddSameSecretaryTwoTime_ShouldThrowError()
        {
            TestGroupSecretary secretary1 = _controller._Add(_testGroup, _secretary);
            _controller.dbContext.SaveChanges();

            TestGroupSecretary secretary2 = _controller._Add(_testGroup, _secretary);

            Assert.AreEqual(secretary1, secretary2);
        }


        [Test]
        public void Delete()
        {
            TestGroupSecretary testGroupSecretary = _controller._Add(_testGroup, _secretary);
            _controller.dbContext.SaveChanges();

            _controller.Delete(testGroupSecretary);
            Assert.False(_testGroupSecretaryRepository.Exists(testGroupSecretary));
        }
    }
}