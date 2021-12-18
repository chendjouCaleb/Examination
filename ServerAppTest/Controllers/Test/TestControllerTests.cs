using System;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Destructors;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Exam.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace ServerAppTest.Controllers
{
    public class TestControllerTests
    {
        private IServiceProvider _serviceProvider;
        private TestController _controller;
        private DbContext _dbContext;
        private IRepository<Test, long> _testRepository;
        
        private ExaminationLevel _examinationLevel;
        private ExaminationLevelSpeciality _examinationLevelSpeciality;
        private Examination _examination;
        private School _school;
        private SemesterCourse _semesterCourse;
        private Year _year;
        private Semester _semester;
        private Planner _planner;

        private TestForm _form;

        private User _plannerUser = new User
        {
            Id = Guid.NewGuid().ToString()
        };

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
             _serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = _serviceProvider.GetRequiredService<TestController>();
            _testRepository = _serviceProvider.GetRequiredService<IRepository<Test, long>>();
            
            var plannerRepository = _serviceProvider.GetRequiredService<IRepository<Planner, long>>();
            _dbContext = _serviceProvider.GetRequiredService<DbContext>();
            

            _planner = plannerRepository.Save(new Planner {School = _school, UserId = _plannerUser.Id});

            SchoolBuilder schoolBuilder = new SchoolBuilder(_serviceProvider);
            _school = schoolBuilder.CreateSchool();
            
            YearBuilder yearBuilder = new YearBuilder(_school, _serviceProvider);
            _year = yearBuilder.Build();
            
            SemesterBuilder semesterBuilder = new SemesterBuilder(_year, _serviceProvider);
            _semester = semesterBuilder.Build();
            
            _examination = new ExaminationBuilder(_serviceProvider).Create(_semester, new ExaminationForm
            {
                ExpectedStartDate = _semester.ExpectedStartDate.AddDays(2),
                ExpectedEndDate = _semester.ExpectedEndDate.AddDays(20)
            });

            _examinationLevelSpeciality = _dbContext.Set<ExaminationLevelSpeciality>()
                .First(e => e.ExaminationLevel.ExaminationDepartment.Examination.Equals(_examination));

            _examinationLevel = _examinationLevelSpeciality.ExaminationLevel;
            _semesterCourse = _dbContext.Set<SemesterCourse>()
                .First(e => e.SemesterLevel.Equals(_examinationLevel.SemesterLevel));
                
            _form = new TestForm
            {
                Coefficient = 5,
                UseAnonymity = false,
                ExpectedStartDate = DateTime.Now.AddHours(1),
                ExpectedEndDate = DateTime.Now.AddHours(3)
            };
        }

        [Test]
        public void Add()
        {
            var builder = new TestBuilder(_serviceProvider);
            Test test = builder.Add(_semesterCourse, _examinationLevel, _form, _planner);
            
            Assert.NotNull(test);

            Assert.AreEqual(_form.Coefficient, test.Coefficient);
            Assert.AreEqual(_form.UseAnonymity, test.UseAnonymity);
            Assert.AreEqual(_form.ExpectedStartDate, test.ExpectedStartDate);
            Assert.AreEqual(_form.ExpectedEndDate, test.ExpectedEndDate);
            Assert.False(test.IsClosed);
            Assert.Null(test.PublicationDate);
            Assert.Null(test.ClosingDate);
            Assert.False(test.MultipleScore);

            Assert.AreEqual(_semesterCourse, test.SemesterCourse);
            Assert.AreEqual(_examinationLevel, test.ExaminationLevel);
            Assert.AreEqual(_plannerUser.Id, test.RegisterUserId);
            
            var testLevelSpecialities = _dbContext.Set<TestLevelSpeciality>()
                .Where(t => t.Test.Equals(test));

            Assert.AreEqual(1, testLevelSpecialities.Count());
            
            foreach (TestLevelSpeciality testLevelSpeciality in testLevelSpecialities)
            {
                Assert.AreEqual(test, testLevelSpeciality.Test);
                Assert.AreEqual(_semesterCourse, testLevelSpeciality.SemesterCourseLevelSpeciality.SemesterCourse);
                Assert.AreEqual(_examinationLevel, testLevelSpeciality.ExaminationLevelSpeciality.ExaminationLevel);
            }
        }
        
        
        [Test]
        public void TryAdd_WithUsedCourse_ShouldThrow()
        {
            new TestBuilder(_serviceProvider).Add(_semesterCourse, _examinationLevel, _form, _planner);

            Exception ex = Assert.Throws<DuplicateObjectException>(
                () => _controller._Add(_semesterCourse, _examinationLevel,   _form, _planner)
            );

            Assert.AreEqual("DUPLICATE_TEST", ex.Message);
        }

        [Test]
        public void ChangeDates()
        {
            Test test = new TestBuilder(_serviceProvider).Add(_semesterCourse, _examinationLevel, _form, _planner);

            ExpectedPeriod period = new ExpectedPeriod
            {
                ExpectedStartDate = DateTime.Now.AddHours(1),
                ExpectedEndDate = DateTime.Now.AddHours(3)
            };

            _controller.ChangeDates(test, period);
            _testRepository.Refresh(test);

            Assert.NotNull(test);
            Assert.AreEqual(period.ExpectedEndDate, test.ExpectedEndDate);
            Assert.AreEqual(period.ExpectedStartDate, test.ExpectedStartDate);
        }


        [Test]
        public void ChangeCoefficient()
        {
            Test test = new TestBuilder(_serviceProvider).Add(_semesterCourse, _examinationLevel, _form, _planner);
            uint coefficient = 10;

            _controller.ChangeCoefficient(test, coefficient);

            _testRepository.Refresh(test);

            Assert.NotNull(test);
            Assert.AreEqual(coefficient, test.Coefficient);
        }

        [Test]
        public void ChangeAnonymity_WhenIsFalse_ShouldBeTrue()
        {
            Test test = new TestBuilder(_serviceProvider).Add(_semesterCourse, _examinationLevel, _form, _planner);
            _controller.ChangeAnonymityState(test);

            _testRepository.Refresh(test);

            Assert.NotNull(test);
            Assert.True(test.UseAnonymity);
        }


        [Test]
        public void ChangeAnonymity_WhenIsTrue_ShouldBeFalse()
        {
            Test test = new TestBuilder(_serviceProvider).Add(_semesterCourse, _examinationLevel, _form, _planner);

            //Set it to true
            _controller.ChangeAnonymityState(test);

            //Set it to false
            _controller.ChangeAnonymityState(test);

            _testRepository.Refresh(test);

            Assert.NotNull(test);
            Assert.False(test.UseAnonymity);
        }

        [Test]
        public void Publish()
        {
            Test test = new TestBuilder(_serviceProvider).Add(_semesterCourse, _examinationLevel, _form, _planner);

            _controller.ChangePublicationState(test);
            _testRepository.Refresh(test);

            Assert.NotNull(test);
            Assert.NotNull(test.PublicationDate);
            Assert.True(test.IsPublished);
            Assert.True(DateTimeAssert.EqualsAtMinute(DateTime.Now, test.PublicationDate.Value));
        }

        [Test]
        public void CancelPublish()
        {
            Test test = new TestBuilder(_serviceProvider).Add(_semesterCourse, _examinationLevel, _form, _planner);

            _controller.ChangePublicationState(test);
            _controller.ChangePublicationState(test);
            _testRepository.Refresh(test);

            Assert.NotNull(test);
            Assert.Null(test.PublicationDate);
            Assert.False(test.IsPublished);
        }

        [Test]
        public void Start()
        {
            Test test = new TestBuilder(_serviceProvider).Add(_semesterCourse, _examinationLevel, _form, _planner);

            _controller.Start(test);
            _testRepository.Refresh(test);

            Assert.NotNull(test.StartDate);
            Assert.True(DateTimeAssert.EqualsAtMinute(DateTime.Now, test.StartDate.Value));
        }
        
        [Test]
        public void End()
        {
            Test test = new TestBuilder(_serviceProvider).Add(_semesterCourse, _examinationLevel, _form, _planner);

            _controller.Start(test);
            _controller.End(test);
            _testRepository.Refresh(test);

            Assert.NotNull(test.EndDate);
            Assert.True(DateTimeAssert.EqualsAtMinute(DateTime.Now, test.EndDate.Value));
        }
        
        


        [Test]
        public void Close()
        {
            Test test = new TestBuilder(_serviceProvider).Add(_semesterCourse, _examinationLevel, _form, _planner);

            _controller.ChangeCloseState(test);
            _testRepository.Refresh(test);

            Assert.NotNull(test);
            Assert.NotNull(test.ClosingDate);
            Assert.True(test.IsClosed);
            Assert.True(DateTimeAssert.EqualsAtMinute(DateTime.Now, test.ClosingDate.Value));
        }

        [Test]
        public void CancelClose()
        {
            Test test = new TestBuilder(_serviceProvider).Add(_semesterCourse, _examinationLevel, _form, _planner);

            _controller.ChangeCloseState(test);
            _controller.ChangeCloseState(test);
            _testRepository.Refresh(test);

            Assert.NotNull(test);
            Assert.Null(test.ClosingDate);
            Assert.False(test.IsPublished);
        }

        [Test]
        public void Delete()
        {
            var dbContext = _serviceProvider.GetService<DbContext>();
            var builder = new TestBuilder(_serviceProvider);
            Test test = builder. Add(_semesterCourse, _examinationLevel, _form, _planner);

            var destructor = new TestDestructor(_serviceProvider);
            destructor.Destroy(test);
            
            Assert.False(_testRepository.Exists(test));

            var testLevelSpecialities = _dbContext.Set<TestLevelSpeciality>()
                .Where(t => t.Test.Equals(test));
            
            foreach (var testLevelSpeciality in testLevelSpecialities)
            {
                Assert.False(dbContext.Set<TestLevelSpeciality>().Contains(testLevelSpeciality));
            }
        }
        
    }
}