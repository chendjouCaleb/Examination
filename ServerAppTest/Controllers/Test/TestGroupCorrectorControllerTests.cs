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
    public class TestGroupCorrectorControllerTests
    {
        private TestGroupCorrectorController _controller;
        private DbContext _dbContext;
        private IRepository<TestGroup, long> _testGroupRepository;
        private IRepository<Test, long> _testRepository;
        private IRepository<Corrector, long> _correctorRepository;
        private IRepository<TestGroupCorrector, long> _testGroupCorrectorRepository;

        private IRepository<Room, long> _roomRepository;

        private Corrector _corrector;
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


            _controller = serviceProvider.GetRequiredService<TestGroupCorrectorController>();
            
            _correctorRepository = serviceProvider.GetRequiredService<IRepository<Corrector, long>>();
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();

            _roomRepository = serviceProvider.GetRequiredService<IRepository<Room, long>>();
            _testGroupRepository = serviceProvider.GetRequiredService<IRepository<TestGroup, long>>();

            _testGroupCorrectorRepository =
                serviceProvider.GetRequiredService<IRepository<TestGroupCorrector, long>>();
            
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();
            
            _dbContext = serviceProvider.GetRequiredService<DbContext>();


            var builder = new TestExaminationBuilder(serviceProvider);
            _examination = builder.Build();
            _school = builder.School;
            
            _room = _roomRepository.Save(new Room
            {
                School = _school,
                Name = "ABC"
            });

            ExaminationLevel examinationLevel = _dbContext.Set<ExaminationLevel>()
                .First(e => e.ExaminationDepartment.Examination.Equals(_examination));

            SemesterCourse semesterCourse = _dbContext.Set<SemesterCourse>()
                .First(s => s.SemesterLevel.Equals(examinationLevel.SemesterLevel));

            Department department = _dbContext.Set<Department>()
                .First(s => s.School.Equals(_school));

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

            _corrector = _correctorRepository.Save(new Corrector
            {
                Department = department,
                UserId = _user.Id
            });
        }

        [Test]
        public void Add()
        {
            TestGroupCorrector testGroupCorrector =
                _controller._Add(_testGroup, _corrector);

            _testGroupCorrectorRepository.Refresh(testGroupCorrector);

            Assert.NotNull(testGroupCorrector);
            Assert.AreEqual(_testGroup, testGroupCorrector.TestGroup);
            Assert.AreEqual(_corrector, testGroupCorrector.Corrector);
        }

        [Test]
        public void Try_AddSameCorrectorTwoTime_ShouldThrowError()
        {
            TestGroupCorrector corrector1 = _controller._Add(_testGroup, _corrector);
            _controller.dbContext.SaveChanges();

            TestGroupCorrector corrector2 = _controller._Add(_testGroup, _corrector);

            Assert.AreEqual(corrector1, corrector2);
        }


        [Test]
        public void Delete()
        {
            TestGroupCorrector testGroupCorrector = _controller._Add(_testGroup, _corrector);
            _controller.dbContext.SaveChanges();

            _controller.Delete(testGroupCorrector);
            Assert.False(_testGroupCorrectorRepository.Exists(testGroupCorrector));
        }
    }
}