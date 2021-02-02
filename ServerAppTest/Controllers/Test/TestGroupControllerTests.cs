using System;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Persistence.Repositories;
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

        private IRepository<Room, long> _roomRepository;
        private IRepository<School, long> _schoolRepository;
        private IRepository<Examination, long> _examinationRepository;

        private Room _room0;
        private Room _room1;
        private Room _room2;

        private Test _test;
        private Course _course;
        private Examination _examination;
        private School _school;
        

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<TestGroupController>();
            _testController = serviceProvider.GetRequiredService<TestController>();

            _schoolRepository = serviceProvider.GetRequiredService<IRepository<School, long>>();
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();

            _roomRepository = serviceProvider.GetRequiredService<IRepository<Room, long>>();
            _testGroupRepository = serviceProvider.GetRequiredService<ITestGroupRepository>();
            _examinationRepository = serviceProvider.GetRequiredService<IRepository<Examination, long>>();
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();

            var courseRepository = serviceProvider.GetRequiredService<IRepository<Course, long>>();
            var levelRepository = serviceProvider.GetRequiredService<IRepository<Level, long>>();
            var departmentRepository = serviceProvider.GetRequiredService<IRepository<Department, long>>();
            var examinationLevelRepository = serviceProvider.GetRequiredService<IRepository<ExaminationLevel, long>>();
            var examinationDepartmentRepository =
                serviceProvider.GetRequiredService<IRepository<ExaminationDepartment, long>>();

            _school = _schoolRepository.Save(new School
            {
                Name = "School name"
            });

            var department = departmentRepository.Save(new Department {Name = "dept", School = _school});
            var level = levelRepository.Save(new Level {Index = 0, Department = department});
            _course = courseRepository.Save(new Course {Code = "125", Level = level});

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

            _examination = _examinationRepository.Save(new Examination
            {
                School = _school,
                Name = "Exam name",
                StartDate = DateTime.Now.AddMonths(1),
                ExpectedEndDate = DateTime.Now.AddMonths(4)
            });

            var examinationDepartment = examinationDepartmentRepository.Save(new ExaminationDepartment
            {
                Department = department,
                Examination = _examination
            });

            var examinationLevel = examinationLevelRepository.Save(new ExaminationLevel
            {
                ExaminationDepartment = examinationDepartment,
                Level = level
            });

            _test = _testRepository.Save(
                new Test
                {
                    ExaminationLevel = examinationLevel,
                    Coefficient = 5,
                    Course = _course,
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