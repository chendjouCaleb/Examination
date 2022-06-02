using System;
using Everest.AspNetStartup.Exceptions;
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
    public class StudentControllerTests
    {
        private StudentController _controller;
        private IRepository<Student, long> _studentRepository;
        private IRepository<School, long> _schoolRepository;
        private IRepository<Department, long> _departmentRepository;
        private IRepository<Level, long> _levelRepository;
        private IRepository<Speciality, long> _specialityRepository;
        private IRepository<LevelSpeciality, long> _levelSpecialityRepository;


        private Principal _principal;
        private Speciality _speciality;
        private LevelSpeciality _levelSpeciality;
        private Level _level;
        private School _school;
        private Department _department;
        private StudentForm _form;


        private User _user = new User
        {
            Id = Guid.NewGuid().ToString()
        };

        private User _principalUser = new User
        {
            Id = Guid.NewGuid().ToString()
        };

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<StudentController>();

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

            _form = new StudentForm
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
            Student student = _controller.Add(_form, _level, _levelSpeciality, _principal).Value as Student;
            _studentRepository.Refresh(student);

            Assert.NotNull(student);
            Assert.AreEqual(_form.FullName, student.FullName);
            Assert.AreEqual(_form.RegistrationId, student.RegistrationId);
            Assert.AreEqual(_form.BirthDate, student.BirthDate);
            Assert.AreEqual(_form.Gender, student.Gender);

            Assert.AreEqual(_level, student.Level);
            Assert.AreEqual(_levelSpeciality, student.LevelSpeciality);
            Assert.AreEqual(_level.Department, student.Level.Department);
            Assert.AreEqual(_level.Department.School, student.School);

            Assert.AreEqual(_principalUser.Id, student.RegisterUserId);
        }


        [Test]
        public void TryAdd_WithUsedRegistrationId_ShouldThrow()
        {
            _controller.Add(_form, _level, _levelSpeciality, _principal);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.Add(_form, _level, _levelSpeciality, _principal)
            );

            Assert.AreEqual("{student.constraints.uniqueRegistrationId}", ex.Message);
        }

        [Test]
        public void ChangeUserId()
        {
            Student student = _controller.Add(_form, _level, _levelSpeciality, _principal).Value as Student;
            string userId = Guid.NewGuid().ToString();

            _controller.ChangeUserId(student, userId);

            _studentRepository.Refresh(student);

            Assert.NotNull(student);
            Assert.AreEqual(userId, student.UserId);
        }

        [Test]
        public void TryChangeUserId_WithUsedUserId_ShouldThrow()
        {
            Student student1 = _controller.Add(_form, _level, _levelSpeciality, _principal).Value as Student;
            Student student2 = _controller.Add(new StudentForm
            {
                FullName = "student2 fullName",
                BirthDate = DateTime.Now.AddYears(-23),
                RegistrationId = "15S2287",
                Gender = 'M'
            }, _level, _levelSpeciality, _principal).Value as Student;

            string userId = Guid.NewGuid().ToString();
            _controller.ChangeUserId(student1, userId);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.ChangeUserId(student2, userId)
            );

            Assert.AreEqual("{student.constraints.uniqueUserId}", ex.Message);
        }


        [Test]
        public void RemoveUserId()
        {
            Student student = _controller.Add(_form, _level, _levelSpeciality, _principal).Value as Student;
            _controller.RemoveUserId(student);

            _studentRepository.Refresh(student);

            Assert.Null(student?.UserId);
        }

        [Test]
        public void ChangeRegistrationId()
        {
            Student student = _controller.Add(_form, _level, _levelSpeciality, _principal).Value as Student;

            string registrationId = "14T5236";
            _controller.ChangeRegistrationId(student, registrationId);

            _studentRepository.Refresh(student);

            Assert.NotNull(student);
            Assert.AreEqual(registrationId, student.RegistrationId);
        }

        [Test]
        public void TryChangeRegistrationId_WithUsedRegistrationId_ShouldThrow()
        {
            Student student = _controller.Add(_form, _level, _levelSpeciality, _principal).Value as Student;

            string registrationId = "14T5236";

            _controller.Add(new StudentForm
            {
                FullName = "my fullName",
                BirthDate = DateTime.Now.AddYears(-23),
                RegistrationId = registrationId,
                Gender = 'M'
            }, _level, _levelSpeciality, _principal);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.ChangeRegistrationId(student, registrationId)
            );

            Assert.AreEqual("{student.constraints.uniqueRegistrationId}", ex.Message);
        }


        [Test]
        public void ChangeLevel()
        {
            Student student = _controller.Add(_form, _level, _levelSpeciality, _principal).Value as Student;

            Level level = _levelRepository.Save(new Level
            {
                Index = 1,
                Department = _department
            });

            LevelSpeciality levelSpeciality = _levelSpecialityRepository.Save(new LevelSpeciality
            {
                Level = level,
                Speciality = _specialityRepository.Save(new Speciality
                {
                    Name = "speciality2 name",
                    Department = _department
                })
            });


            _controller.ChangeLevel(student, level, levelSpeciality);
            _studentRepository.Refresh(student);

            Assert.NotNull(student);
            Assert.AreEqual(level, student.Level);
            Assert.AreEqual(levelSpeciality, student.LevelSpeciality);
            Assert.AreEqual(level.Department, student.Level.Department);
            Assert.AreEqual(level.Department.School, student.School);
        }
        
        
        [Test]
        public void ChangeLevel_WithoutSpeciality()
        {
            Student student = _controller.Add(_form, _level, _levelSpeciality, _principal).Value as Student;

            Level level = _levelRepository.Save(new Level
            {
                Index = 1,
                Department = _department
            });

            
            _controller.ChangeLevel(student, level );
            _studentRepository.Refresh(student);

            Assert.NotNull(student);
            Assert.AreEqual(level, student.Level);
            Assert.Null( student.LevelSpeciality);
        }

        [Test]
        public void RemoveLevelSpeciality()
        {
            Student student = _controller.Add(_form, _level, _levelSpeciality, _principal).Value as Student;

            _controller.RemoveLevelSpeciality(student);

            _studentRepository.Refresh(student);

            Assert.NotNull(student);
            Assert.Null(student.LevelSpeciality);
        }


        [Test]
        public void UpdateInfo()
        {
            Student student = _controller.Add(_form, _level, _levelSpeciality, _principal).Value as Student;

            StudentFormInfo form = new StudentFormInfo
            {
                BirthDate = DateTime.Now.AddMonths(-20),
                FullName = "new name",
                Gender = 'F'
            };

            _controller.Update(student, form);

            _studentRepository.Refresh(student);

            Assert.NotNull(student);
            Assert.AreEqual(form.FullName, student.FullName);
            Assert.AreEqual(form.BirthDate, student.BirthDate);
            Assert.AreEqual(form.Gender, student.Gender);
        }


        [Test]
        public void Delete()
        {
            Student student = _controller.Add(_form, _level, _levelSpeciality, _principal).Value as Student;
            _controller.Delete(student);
            Assert.False(_studentRepository.Exists(student));
        }
    }
}