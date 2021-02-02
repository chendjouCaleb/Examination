using System;
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
    public class ApplicationControllerTests
    {
        private ApplicationController _controller;
        private IRepository<Application, long> _applicationRepository;
        private IRepository<Student, long> _studentRepository;
        private IRepository<School, long> _schoolRepository;
        private IRepository<Department, long> _departmentRepository;
        private IRepository<Level, long> _levelRepository;
        private IRepository<Speciality, long> _specialityRepository;
        private IRepository<LevelSpeciality, long> _levelSpecialityRepository;

        private User _user = new User
        {
            Id = Guid.NewGuid().ToString()
        };

        private User _principalUser = new User
        {
            Id = Guid.NewGuid().ToString()
        };

        private Principal _principal;
        private Speciality _speciality;
        private LevelSpeciality _levelSpeciality;
        private Level _level;
        private School _school;
        private Department _department;
        private ApplicationForm _form;

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();
            
            _controller = serviceProvider.GetRequiredService<ApplicationController>();
            _applicationRepository = serviceProvider.GetRequiredService<IRepository<Application, long>>();
            _schoolRepository = serviceProvider.GetRequiredService<IRepository<School, long>>();
            _departmentRepository = serviceProvider.GetRequiredService<IRepository<Department, long>>();
            _studentRepository = serviceProvider.GetRequiredService<IRepository<Student, long>>();
            _levelRepository = serviceProvider.GetRequiredService<IRepository<Level, long>>();
            _specialityRepository = serviceProvider.GetRequiredService<IRepository<Speciality, long>>();
            _levelSpecialityRepository = serviceProvider.GetRequiredService<IRepository<LevelSpeciality, long>>();

            PrincipalController principalController = serviceProvider.GetRequiredService<PrincipalController>();

            _school = _schoolRepository.Save(new School
            {
                Name = "Org name"
            });

            _department = _departmentRepository.Save(new Department
            {
                School = _school,
                Name = "Dept Name"
            });

            _level = _levelRepository.Save(new Level
            {
                Index = 0,
                Department = _department
            });


            _speciality = _specialityRepository.Save(new Speciality
            {
                Name = "speciality name",
                Department = _department
            });

            _levelSpeciality = _levelSpecialityRepository.Save(new LevelSpeciality
            {
                Level = _level,
                Speciality = _speciality
            });

            _principal = principalController._Add(_department, _principalUser.Id);


            _form = new ApplicationForm
            {
                FullName = "my fullName",
                BirthDate = DateTime.Now.AddYears(-23),
                RegistrationId = "15T2287",
                Gender = 'M'
            };
        }

        [Test]
        public void Add()
        {
            Application application =
                _controller.Add(_form, _level, _levelSpeciality, _user).Value as Application;
            
            _applicationRepository.Refresh(application);

            Assert.NotNull(application);
            Assert.AreEqual(_form.FullName, application.FullName);
            Assert.AreEqual(_form.RegistrationId, application.RegistrationId);
            Assert.AreEqual(_form.BirthDate, application.BirthDate);
            Assert.AreEqual(_form.Gender, application.Gender);

            Assert.False(application.Processed);
            Assert.IsNull(application.ProcessDate);

            Assert.AreEqual(_level, application.Level);
            Assert.AreEqual(_levelSpeciality, application.LevelSpeciality);
            Assert.AreEqual(_user.Id, application.UserId);
            
        }

        [Test]
        public void TryAdd_WithUsedUserId_ShouldThrow()
        {
            _controller.Add(_form, _level, _levelSpeciality, _user);

            _form.RegistrationId = "14T2563";

            Exception ex = Assert.Throws<InvalidOperationException>(
                () => _controller.Add(_form, _level, _levelSpeciality, _user)
            );

            Assert.AreEqual("{application.constraints.uniqueUserId}", ex.Message);
        }


        [Test]
        public void TryAdd_WithUsedUserIdByStudent_ShouldThrow()
        {
            _studentRepository.Save(new Student
            {
                Level = _level,
                UserId = _user.Id
            });
            Exception ex = Assert.Throws<InvalidOperationException>(
                () => _controller.Add(_form, _level, _levelSpeciality, _user)
            );

            Assert.AreEqual("{application.student.constraints.uniqueUserId}", ex.Message);
        }


        [Test]
        public void ChangeSpeciality()
        {
            Application application =
                _controller.Add(_form, _level, _levelSpeciality, _user).Value as Application;
            
            LevelSpeciality levelSpeciality = _levelSpecialityRepository.Save(new LevelSpeciality
            {
                Level = _level,
                Speciality = _specialityRepository.Save(new Speciality
                {
                    Name = "speciality2 name",
                    Department = _department
                })
            });
            _controller.ChangeSpeciality(application, levelSpeciality);

            _applicationRepository.Refresh(application);

            Assert.NotNull(application);
            Assert.AreEqual(levelSpeciality, application.LevelSpeciality);
            
        }

        [Test]
        public void RemoveLevelSpeciality()
        {
            Application application =
                _controller.Add(_form, _level, _levelSpeciality, _user).Value as Application;

            _controller.RemoveSpeciality(application);

            _applicationRepository.Refresh(application);

            Assert.NotNull(application);
            Assert.Null(application.LevelSpeciality);
        }
        
        [Test]
        public void UpdateInfo()
        {
            Application application =
                _controller.Add(_form, _level, _levelSpeciality, _user).Value as Application;

            ApplicationForm form = new ApplicationForm
            {
                RegistrationId = "15F2541",
                BirthDate = DateTime.Now.AddMonths(-20),
                FullName = "new name",
                Gender = 'F'
            };

            _controller.Update(application, form);

            _applicationRepository.Refresh(application);

            Assert.NotNull(application);
            Assert.AreEqual(form.RegistrationId, application.RegistrationId);
            Assert.AreEqual(form.FullName, application.FullName);
            Assert.AreEqual(form.BirthDate, application.BirthDate);
            Assert.AreEqual(form.Gender, application.Gender);
        }

        [Test]
        public void Accept()
        {
            Application application =
                _controller.Add(_form, _level, _levelSpeciality, _user).Value as Application;
            
            _controller.Accept(application, _principal);

            _applicationRepository.Refresh(application);

            Assert.NotNull(application);
            Assert.True(application.Processed);
            Assert.AreEqual(_principal.UserId, application.ProcessUserId);
            Assert.NotNull(application.ProcessDate);
            Assert.True(application.Accepted);
            Assert.True(DateTimeAssert.EqualsAtMinute(DateTime.Now, application.ProcessDate.Value));

            Student student = application.Student;
            Assert.NotNull(student);


            Assert.AreEqual(application.FullName, student.FullName);
            Assert.AreEqual(application.RegistrationId, student.RegistrationId);
            Assert.AreEqual(application.BirthDate, student.BirthDate);
            Assert.AreEqual(application.Gender, student.Gender);

            Assert.AreEqual(_level, student.Level);
            Assert.AreEqual(_levelSpeciality, student.LevelSpeciality);
            Assert.AreEqual(application.UserId, student.UserId);
            Assert.AreEqual(_principal.UserId, student.RegisterUserId);
            
        }


        [Test]
        public void Reject()
        {
            Application application =
                _controller.Add(_form, _level, _levelSpeciality, _user).Value as Application;

            
            _controller.Reject(application, _principal);

            _applicationRepository.Refresh(application);

            Assert.NotNull(application);
            Assert.True(application.Processed);
            Assert.AreEqual(_principalUser.Id, application.ProcessUserId);
            Assert.NotNull(application.ProcessDate);
            Assert.True(application.Rejected);
            Assert.True(DateTimeAssert.EqualsAtSecond(DateTime.Now, application.ProcessDate.Value));

            Assert.Null(application.Student);
            
        }

        [Test]
        public void Cancel()
        {
            Application application =
                _controller.Add(_form, _level, _levelSpeciality, _user).Value as Application;
            _controller.Delete(application);
            _applicationRepository.Refresh(application);
            Assert.False(_applicationRepository.Exists(application));
        }
    }
}