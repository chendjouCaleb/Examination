using System;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Destructors;
using Exam.Entities;
using Exam.Entities.Courses;
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
        private IRepository<Test, long> _testRepository;
        private IRepository<Course, long> _courseRepository;
        private IRepository<School, long> _schoolRepository;
        private IRepository<Examination, long> _examinationRepository;
        private IRepository<Department, long> _departmentRepository;
        private IRepository<Speciality, long> _specialityRepository;
        private IRepository<ExaminationSpeciality, long> _examinationSpecialityRepository;
        private IRepository<ExaminationLevelSpeciality, long> _examinationLevelSpecialityRepository;
        private IRepository<ExaminationLevel, long> _examinationLevelRepository;
        private IRepository<ExaminationDepartment, long> _examinationDepartmentRepository;

        private ExaminationDepartment _examinationDepartment;
        private ExaminationSpeciality _examinationSpeciality;
        private ExaminationLevel _examinationLevel;
        private Examination _examination;
        private School _school;
        private Department _department;
        private Level _level;
        private Speciality _speciality;
        private LevelSpeciality _levelSpeciality;
        private Course _course;
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

            _schoolRepository = _serviceProvider.GetRequiredService<IRepository<School, long>>();
            _departmentRepository = _serviceProvider.GetRequiredService<IRepository<Department, long>>();
            _courseRepository = _serviceProvider.GetRequiredService<IRepository<Course, long>>();
            _testRepository = _serviceProvider.GetRequiredService<IRepository<Test, long>>();
            _examinationRepository = _serviceProvider.GetRequiredService<IRepository<Examination, long>>();
            _examinationSpecialityRepository = _serviceProvider.GetRequiredService<IRepository<ExaminationSpeciality, long>>();
            _examinationDepartmentRepository = _serviceProvider.GetRequiredService<IRepository<ExaminationDepartment, long>>();

            _examinationLevelSpecialityRepository = _serviceProvider.GetRequiredService<IRepository<ExaminationLevelSpeciality, long>>();
            _examinationLevelRepository = _serviceProvider.GetRequiredService<IRepository<ExaminationLevel, long>>();
            _specialityRepository = _serviceProvider.GetRequiredService<IRepository<Speciality, long>>();

            var levelRepository = _serviceProvider.GetRequiredService<IRepository<Level, long>>();
            var levelSpecialityRepository = _serviceProvider.GetRequiredService<IRepository<LevelSpeciality, long>>();
            var courseLevelSpecialityRepository = _serviceProvider.GetRequiredService<IRepository<CourseLevelSpeciality, long>>();
            
            var plannerRepository = _serviceProvider.GetRequiredService<IRepository<Planner, long>>();
            _school = _schoolRepository.Save(new School
            {
                Name = "Org name"
            });

            _planner = plannerRepository.Save(new Planner {School = _school, UserId = _plannerUser.Id});

            _department = _departmentRepository.Save(new Department {School = _school});
            _level = levelRepository.Save(new Level {Department = _department, Index = 1});
            _speciality = _specialityRepository.Save(new Speciality {Department = _department});
            _levelSpeciality =
                levelSpecialityRepository.Save(new LevelSpeciality {Speciality = _speciality, Level = _level});

            _course = _courseRepository.Save(new Course
            {
                Level = _level,
                Code = "152" 
            });


            _examination = _examinationRepository.Save(new Examination
            {
                School = _school,
                Name = "Exam name",
                ExpectedStartDate = DateTime.Now.AddMonths(1),
                ExpectedEndDate = DateTime.Now.AddMonths(4)
            });

            _examinationDepartment = _examinationDepartmentRepository.Save(new ExaminationDepartment
            {
                Department = _department,
                Examination = _examination
            });

            _examinationLevel = _examinationLevelRepository.Save(new ExaminationLevel
            {
                Level = _level,
                ExaminationDepartment = _examinationDepartment
            });

            _examinationSpeciality = _examinationSpecialityRepository.Save(new ExaminationSpeciality
            {
                ExaminationDepartment = _examinationDepartment,
                Speciality = _speciality
            });

            _examinationLevelSpecialityRepository.Save(new ExaminationLevelSpeciality
            {
                LevelSpeciality = _levelSpeciality,
                ExaminationLevel = _examinationLevel,
                ExaminationSpeciality = _examinationSpeciality
            });

            courseLevelSpecialityRepository.Save(new CourseLevelSpeciality
            {
                Course = _course,
                LevelSpeciality = _levelSpeciality
            });
            
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
            Test test = builder.Add(_course, _examinationLevel, _form, _planner);
            
            Assert.NotNull(test);

            Assert.AreEqual(_form.Coefficient, test.Coefficient);
            Assert.AreEqual(_form.UseAnonymity, test.UseAnonymity);
            Assert.AreEqual(_form.ExpectedStartDate, test.ExpectedStartDate);
            Assert.AreEqual(_form.ExpectedEndDate, test.ExpectedEndDate);
            Assert.False(test.IsClosed);
            Assert.Null(test.PublicationDate);
            Assert.Null(test.ClosingDate);
            Assert.False(test.MultipleScore);

            Assert.AreEqual(_course, test.Course);
            Assert.AreEqual(_examinationLevel, test.ExaminationLevel);
            Assert.AreEqual(_plannerUser.Id, test.RegisterUserId);

            Assert.AreEqual(1, builder.TestLevelSpecialities.Count);
            
            foreach (TestLevelSpeciality testLevelSpeciality in builder.TestLevelSpecialities)
            {
                Assert.AreEqual(test, testLevelSpeciality.Test);
                Assert.AreEqual(_course, testLevelSpeciality.CourseLevelSpeciality.Course);
                Assert.AreEqual(_examinationLevel, testLevelSpeciality.ExaminationLevelSpeciality.ExaminationLevel);
            }
        }
        
        
        [Test]
        public void TryAdd_WithUsedCourse_ShouldThrow()
        {
            new TestBuilder(_serviceProvider).Add(_course, _examinationLevel, _form, _planner);

            Exception ex = Assert.Throws<InvalidOperationException>(
                () => _controller._Add(_course, _examinationLevel,   _form, _planner)
            );

            Assert.AreEqual("{test.constraints.uniqueCourse}", ex.Message);
        }

        [Test]
        public void ChangeDates()
        {
            Test test = new TestBuilder(_serviceProvider).Add(_course, _examinationLevel, _form, _planner);

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
            Test test = new TestBuilder(_serviceProvider).Add(_course, _examinationLevel, _form, _planner);
            uint coefficient = 10;

            _controller.ChangeCoefficient(test, coefficient);

            _testRepository.Refresh(test);

            Assert.NotNull(test);
            Assert.AreEqual(coefficient, test.Coefficient);
        }

        [Test]
        public void ChangeAnonymity_WhenIsFalse_ShouldBeTrue()
        {
            Test test = new TestBuilder(_serviceProvider).Add(_course, _examinationLevel, _form, _planner);
            _controller.ChangeAnonymityState(test);

            _testRepository.Refresh(test);

            Assert.NotNull(test);
            Assert.True(test.UseAnonymity);
        }


        [Test]
        public void ChangeAnonymity_WhenIsTrue_ShouldBeFalse()
        {
            Test test = new TestBuilder(_serviceProvider).Add(_course, _examinationLevel, _form, _planner);

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
            Test test = new TestBuilder(_serviceProvider).Add(_course, _examinationLevel, _form, _planner);

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
            Test test = new TestBuilder(_serviceProvider).Add(_course, _examinationLevel, _form, _planner);

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
            Test test = new TestBuilder(_serviceProvider).Add(_course, _examinationLevel, _form, _planner);

            _controller.Start(test);
            _testRepository.Refresh(test);

            Assert.NotNull(test.StartDate);
            Assert.True(DateTimeAssert.EqualsAtMinute(DateTime.Now, test.StartDate.Value));
        }
        
        [Test]
        public void End()
        {
            Test test = new TestBuilder(_serviceProvider).Add(_course, _examinationLevel, _form, _planner);

            _controller.Start(test);
            _controller.End(test);
            _testRepository.Refresh(test);

            Assert.NotNull(test.EndDate);
            Assert.True(DateTimeAssert.EqualsAtMinute(DateTime.Now, test.EndDate.Value));
        }
        
        


        [Test]
        public void Close()
        {
            Test test = new TestBuilder(_serviceProvider).Add(_course, _examinationLevel, _form, _planner);

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
            Test test = new TestBuilder(_serviceProvider).Add(_course, _examinationLevel, _form, _planner);

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
            Test test = builder. Add(_course, _examinationLevel, _form, _planner);

            var destructor = new TestDestructor(_serviceProvider);
            destructor.Destroy(test);
            
            Assert.False(_testRepository.Exists(test));
            
            foreach (var testLevelSpeciality in builder.TestLevelSpecialities)
            {
                Assert.False(dbContext.Set<TestLevelSpeciality>().Contains(testLevelSpeciality));
            }
        }
        
    }
}