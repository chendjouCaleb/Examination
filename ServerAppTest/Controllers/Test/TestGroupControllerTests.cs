using System;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Exam.Models;
using Exam.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace ServerAppTest.Controllers
{
    public class TestGroupControllerTests
    {
        private TestGroupController _controller;
        private DbContext _dbContext;
        private TestController _testController;
        private IRepository<Test, long> _testRepository;
        private IRepository<TestGroup, long> _testGroupRepository;

        private IRepository<Room, long> _roomRepository;

        private Room _room0;
        private Room _room1;
        private Room _room2;

        private Test _test;
        private Examination _examination;
        private School _school;

        private Year _year;
        private Semester _semester;

        private ExaminationLevelSpeciality _examinationLevelSpeciality;
        private ExaminationLevel _examinationLevel;
        private SemesterCourse _semesterCourse;
        

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();

            _dbContext = serviceProvider.GetRequiredService<DbContext>();
            _controller = serviceProvider.GetRequiredService<TestGroupController>();
            _testController = serviceProvider.GetRequiredService<TestController>();
            
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();

            _roomRepository = serviceProvider.GetRequiredService<IRepository<Room, long>>();
            _testGroupRepository = serviceProvider.GetRequiredService<ITestGroupRepository>();
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();

            SchoolBuilder schoolBuilder = new SchoolBuilder(serviceProvider);
            _school = schoolBuilder.CreateSchool();
            
            YearBuilder yearBuilder = new YearBuilder(_school, serviceProvider);
            _year = yearBuilder.Build();
            
            SemesterBuilder semesterBuilder = new SemesterBuilder(_year, serviceProvider);
            _semester = semesterBuilder.Build();
            
            _examination = new ExaminationBuilder(serviceProvider).Create(_semester, new ExaminationForm
            {
                ExpectedStartDate = _semester.ExpectedStartDate.AddDays(2),
                ExpectedEndDate = _semester.ExpectedEndDate.AddDays(20)
            });

            _examinationLevelSpeciality = _dbContext.Set<ExaminationLevelSpeciality>()
                .First(e => e.ExaminationLevel.ExaminationDepartment.Examination.Equals(_examination));

            _examinationLevel = _examinationLevelSpeciality.ExaminationLevel;
            _semesterCourse = _dbContext.Set<SemesterCourse>()
                .First(e => e.SemesterLevel.Equals(_examinationLevel.SemesterLevel));

            _room0 = _roomRepository.Save(new Room
            {
                School = _school,
                Name = "ABC"
            });

            _room1 = _roomRepository.Save(new Room
            {
                School = _school,
                Name = "ABC2"
            });

            _room2 = _roomRepository.Save(new Room
            {
                School = _school,
                Name = "ABC3"
            });

            

            _test = _testRepository.Save(
                new Test
                {
                    ExaminationLevel = _examinationLevel,
                    Coefficient = 5,
                    SemesterCourse = _semesterCourse,
                    UseAnonymity = false,
                    ExpectedStartDate = _examination.ExpectedStartDate.AddHours(1),
                    ExpectedEndDate = _examination.ExpectedEndDate.AddHours(3)
                }
            );

            
        }

        [Test]
        public void Add()
        {
            TestGroup testGroup = _controller._Add(_test, _room0);

            _testGroupRepository.Refresh(testGroup);

            Assert.NotNull(testGroup);
            Assert.AreEqual(_test, testGroup.Test);
            Assert.AreEqual(_room0, testGroup.Room);
            Assert.AreEqual(0, testGroup.Index);
        }


        [Test]
        public void AddMultiple_AndCheckIndex()
        {
            TestGroup testGroup0 = _controller._Add(_test, _room0);
            TestGroup testGroup1 = _controller._Add(_test, _room1);
            TestGroup testGroup2 = _controller._Add(_test, _room2);

            Assert.AreEqual(0, testGroup0.Index);
            Assert.AreEqual(1, testGroup1.Index);
            Assert.AreEqual(2, testGroup2.Index);
        }

        [Test]
        public void Add_TwoTime_ShouldBe_A_Same()
        {
            TestGroup testGroup0 = _controller._Add(_test, _room0);
            TestGroup testGroup1 = _controller._Add(_test, _room0);
            
            Assert.AreEqual(testGroup0, testGroup1);
        }


        [Test]
        public void Start()
        {
            TestGroup testGroup = _controller._Add(_test, _room0);

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
            TestGroup testGroup = _controller._Add(_test, _room0);
            _testController.Start(testGroup.Test);
            _controller.Start(testGroup);
            _controller.End(testGroup);

            _testGroupRepository.Refresh(testGroup);

            Assert.NotNull(testGroup.StartDate);
            Assert.NotNull(testGroup.EndDate);

            Assert.True(DateTimeAssert.EqualsAtMinute(DateTime.Now, testGroup.EndDate.Value));
        }

        [Test]
        public void Restart()
        {
            TestGroup testGroup = _controller._Add(_test, _room0);
            _testController.Start(testGroup.Test);
            _controller.Start(testGroup);
            _controller.End(testGroup);

            _controller.Restart(testGroup);
            _testGroupRepository.Refresh(testGroup);

            Assert.NotNull(testGroup.StartDate);
            Assert.Null(testGroup.EndDate);
        }


        [Test]
        public void Delete()
        {
            TestGroup testGroup = _controller._Add(_test, _room0);
            _controller.Delete(testGroup);

            Assert.False(_testGroupRepository.Exists(testGroup));
        }
    }
}