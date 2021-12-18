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
    public class TestGroupSupervisorControllerTests
    {
        private TestGroupSupervisorController _controller;
        private IRepository<TestGroup, long> _testGroupRepository;
        private IRepository<Test, long> _testRepository;
        private IRepository<Supervisor, long> _supervisorRepository;
        private IRepository<TestGroupSupervisor, long> _testGroupSupervisorRepository;

        private IRepository<Room, long> _roomRepository;

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
            
            _supervisorRepository = serviceProvider.GetRequiredService<IRepository<Supervisor, long>>();
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();

            _roomRepository = serviceProvider.GetRequiredService<IRepository<Room, long>>();
            _testGroupRepository = serviceProvider.GetRequiredService<IRepository<TestGroup, long>>();

            _testGroupSupervisorRepository =
                serviceProvider.GetRequiredService<IRepository<TestGroupSupervisor, long>>();
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
            _controller.dbContext.SaveChanges();
            
            TestGroupSupervisor supervisor2 = _controller._Add(_testGroup, _supervisor);

            Assert.AreEqual(supervisor1, supervisor2);
        }


        [Test]
        public void Delete()
        {
            TestGroupSupervisor testGroupSupervisor = _controller._Add(_testGroup, _supervisor);
            _controller.dbContext.SaveChanges();

            _controller.Delete(testGroupSupervisor);
            Assert.False(_testGroupSupervisorRepository.Exists(testGroupSupervisor));
        }
    }
}