using System;
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

        private IRepository<Room, long> _roomRepository;
        private IRepository<School, long> _schoolRepository;
        private IRepository<Examination, long> _examinationRepository;

        private Supervisor _supervisor;
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


            _controller = serviceProvider.GetRequiredService<TestGroupSupervisorController>();


            _schoolRepository = serviceProvider.GetRequiredService<IRepository<School, long>>();
            _supervisorRepository = serviceProvider.GetRequiredService<IRepository<Supervisor, long>>();
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();

            _roomRepository = serviceProvider.GetRequiredService<IRepository<Room, long>>();
            _testGroupRepository = serviceProvider.GetRequiredService<IRepository<TestGroup, long>>();

            _testGroupSupervisorRepository =
                serviceProvider.GetRequiredService<IRepository<TestGroupSupervisor, long>>();
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
                Name = "Org name"
            });

            var department = departmentRepository.Save(new Department {Name = "dept", School = _school});
            var level = levelRepository.Save(new Level {Index = 0, Department = department});
            var course = courseRepository.Save(new Course {Code = "125", Level = level});

            _room = _roomRepository.Save(new Room
            {
                School = _school,
                Name = "ABC"
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
                Level = level,
                ExaminationDepartment = examinationDepartment
            });

            _test = _testRepository.Save(
                new Test
                {
                    Course = course,
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

            _supervisor = _supervisorRepository.Save(new Supervisor
            {
                Department = department,
                UserId = _user.Id
            });
        }

        [Test]
        public void Add()
        {
            TestGroupSupervisor testGroupSupervisor =
                _controller._Add(_testGroup, _supervisor);

            _testGroupSupervisorRepository.Refresh(testGroupSupervisor);

            Assert.NotNull(testGroupSupervisor);
            Assert.AreEqual(_testGroup, testGroupSupervisor.TestGroup);
            Assert.AreEqual(_supervisor, testGroupSupervisor.Supervisor);
        }

        [Test]
        public void Try_AddSameSupervisorTwoTime_ShouldThrowError()
        {
            TestGroupSupervisor supervisor1 = _controller._Add(_testGroup, _supervisor);
            TestGroupSupervisor supervisor2 = _controller._Add(_testGroup, _supervisor);

            Assert.AreEqual(supervisor1, supervisor2);
        }


        [Test]
        public void Delete()
        {
            TestGroupSupervisor testGroupSupervisor = _controller._Add(_testGroup, _supervisor);

            _controller.Delete(testGroupSupervisor);
            Assert.False(_testGroupSupervisorRepository.Exists(testGroupSupervisor));
        }
    }
}