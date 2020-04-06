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
        private IRepository<Organisation, long> _organisationRepository;
        private IRepository<Examination, long> _examinationRepository;
        private IRepository<Speciality, long> _specialityRepository;

        private Speciality _speciality;
        private Examination _examination;
        private Organisation _organisation;
        private StudentForm _model;

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<StudentController>();

            _organisationRepository = serviceProvider.GetRequiredService<IRepository<Organisation, long>>();
            _studentRepository = serviceProvider.GetRequiredService<IRepository<Student, long>>();
            _examinationRepository = serviceProvider.GetRequiredService<IRepository<Examination, long>>();
            _specialityRepository = serviceProvider.GetRequiredService<IRepository<Speciality, long>>();

            _organisation = _organisationRepository.Save(new Organisation
            {
                Name = "Org name"
            });

            _examination = _examinationRepository.Save(new Examination
            {
                Organisation = _organisation,
                Name = "Exam name",
                ExpectedStartDate = DateTime.Now.AddMonths(1),
                ExpectedEndDate = DateTime.Now.AddMonths(4)
            });

            _speciality = _specialityRepository.Save(new Speciality
            {
                Name = "speciality name",
                Examination = _examination
            });
            _model = new StudentForm
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
            string userId = Guid.NewGuid().ToString();
            Student student = _controller.Add(_examination, _speciality, _model, userId).Value as Student;

            _studentRepository.Refresh(student);

            Assert.NotNull(student);
            Assert.AreEqual(_model.FullName, student.FullName);
            Assert.AreEqual(_model.RegistrationId, student.RegistrationId);
            Assert.AreEqual(_model.BirthDate, student.BirthDate);
            Assert.AreEqual(_model.Gender, student.Gender);

            Assert.AreEqual(_examination, student.Examination);
            Assert.AreEqual(_speciality, student.Speciality);
            Assert.AreEqual(userId, student.UserId);

            Assert.AreEqual(1, _speciality.StudentCount);
            Assert.AreEqual(1, _examination.StudentCount);
        }

        [Test]
        public void TryAdd_WithUsedUserId_ShouldThrow()
        {
            string userId = Guid.NewGuid().ToString();
            _controller.Add(_examination, _speciality, _model, userId);

            _model.RegistrationId = "14T2563";

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.Add(_examination, _speciality, _model, userId)
            );

            Assert.AreEqual("{student.constraints.uniqueUserId}", ex.Message);
        }
        
        [Test]
        public void TryAdd_WithUsedRegistrationId_ShouldThrow()
        {
            _controller.Add(_examination, _speciality, _model, null);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.Add(_examination, _speciality, _model, null)
            );

            Assert.AreEqual("{student.constraints.uniqueRegistrationId}", ex.Message);
        }
        
        [Test]
        public void ChangeUserId()
        {
            Student student = _controller.Add(_examination, _speciality, _model, null).Value as Student;
            string userId = Guid.NewGuid().ToString();

            _controller.ChangeUserId(student, userId);

            _studentRepository.Refresh(student);

            Assert.AreEqual(userId, student.UserId);
        }
        
        [Test]
        public void TryChangeUserId_WithUsedUserId_ShouldThrow()
        {
            Student student = _controller.Add(_examination, _speciality, _model, null).Value as Student;

            string userId = Guid.NewGuid().ToString();

            _model.RegistrationId = "125T523";

            _controller.Add(_examination, _speciality, _model, userId);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.ChangeUserId(student, userId)
            );

            Assert.AreEqual("{student.constraints.uniqueUserId}", ex.Message);
        }

        [Test]
        public void ChangeRegistrationId()
        {
            Student student = _controller.Add(_examination, _speciality, _model, null).Value as Student;
            string registrationId = "14T5236";

            _controller.ChangeRegistrationId(student, registrationId);

            _studentRepository.Refresh(student);

            Assert.AreEqual(registrationId, student.RegistrationId);
        }
        
        [Test]
        public void TryChangeRegistrationId_WithUsedRegistrationId_ShouldThrow()
        {
            Student student = _controller.Add(_examination, _speciality, _model, null).Value as Student;

            string registrationId = "14T5236";
            _model.RegistrationId = registrationId;

            _controller.Add(_examination, _speciality, _model, null);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.ChangeRegistrationId(student, registrationId)
            );

            Assert.AreEqual("{student.constraints.uniqueRegistrationId}", ex.Message);
        }


        [Test]
        public void ChangeSpeciality()
        {
            Student student = _controller.Add(_examination, _speciality, _model, null).Value as Student;

            Speciality speciality = _specialityRepository.Save(new Speciality
            {
                Examination = _examination,
                Name = "speciality name"
            });
            _specialityRepository.Refresh(speciality);

            _controller.ChangeSpeciality(student, speciality);

            _studentRepository.Refresh(student);

            Assert.AreEqual(speciality, student.Speciality);
            Assert.AreEqual(0, _speciality.StudentCount);
            Assert.AreEqual(1, speciality.StudentCount);
        }

        [Test]
        public void ChangeWithNullValue()
        {
            Student student = _controller.Add(_examination, _speciality, _model, null).Value as Student;

            _controller.ChangeSpeciality(student );

            _studentRepository.Refresh(student);

            Assert.Null(student.Speciality);
            Assert.AreEqual(0, _speciality.StudentCount);
        }

        [Test]
        public void TrySetNullSpeciality_WhenExaminationRequireSpeciality_ShouldThrow()
        {
            Student student = _controller.Add(_examination, _speciality, _model, null).Value as Student;

            _examination.RequireSpeciality = true;
            _examinationRepository.Update(_examination);

            Exception ex = Assert.Throws<InvalidOperationException>(() => _controller.ChangeSpeciality(student, null));
            
            _studentRepository.Refresh(student);
            
            Assert.NotNull(student.Speciality);
            Assert.AreEqual("{student.constraints.requireSpeciality}", ex.Message);
            
        }

        

        [Test]
        public void UpdateInfo()
        {
            Student student = _controller.Add(_examination, _speciality, _model, null).Value as Student;

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
            Student student = _controller.Add(_examination, _speciality, _model, null).Value as Student;
            _controller.Delete(student);
            _studentRepository.Refresh(student);

            Assert.AreEqual(0, _examination.StudentCount);
            Assert.AreEqual(0, _speciality.StudentCount);
            Assert.False(_studentRepository.Exists(student));
        }
    }
}