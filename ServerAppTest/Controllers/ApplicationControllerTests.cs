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
        private IRepository<Organisation, long> _organisationRepository;
        private IRepository<Examination, long> _examinationRepository;
        private IRepository<Speciality, long> _specialityRepository;

        private User _user = new User
        {
            Id = Guid.NewGuid().ToString()
        };

        private Speciality _speciality;
        private Examination _examination;
        private Organisation _organisation;
        private ApplicationForm _model;

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<ApplicationController>();
            
            _organisationRepository = serviceProvider.GetRequiredService<IRepository<Organisation, long>>();
            _applicationRepository = serviceProvider.GetRequiredService<IRepository<Application, long>>();
            _examinationRepository = serviceProvider.GetRequiredService<IRepository<Examination, long>>();
            _specialityRepository = serviceProvider.GetRequiredService<IRepository<Speciality, long>>();
            _studentRepository = serviceProvider.GetRequiredService<IRepository<Student, long>>();

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
            _model = new ApplicationForm
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
            Application application = _controller.Add(_examination, _speciality, _model, _user).Value as Application;

            _applicationRepository.Refresh(application);

            Assert.NotNull(application);
            Assert.AreEqual(_model.FullName, application.FullName);
            Assert.AreEqual(_model.RegistrationId, application.RegistrationId);
            Assert.AreEqual(_model.BirthDate, application.BirthDate);
            Assert.AreEqual(_model.Gender, application.Gender);
            
            Assert.False(application.Processed);
            Assert.IsNull(application.ProcessDate);

            Assert.AreEqual(_examination, application.Examination);
            Assert.AreEqual(_speciality, application.Speciality);
            Assert.AreEqual(_user.Id, application.UserId);

            Assert.AreEqual(1, _speciality.ApplicationCount);
            Assert.AreEqual(1, _examination.ApplicationCount);
        }

        [Test]
        public void TryAdd_WithUsedUserId_ShouldThrow()
        {
            _controller.Add(_examination, _speciality, _model, _user);

            _model.RegistrationId = "14T2563";

            Exception ex = Assert.Throws<InvalidOperationException>(
                () => _controller.Add(_examination, _speciality, _model, _user)
            );

            Assert.AreEqual("{application.constraints.uniqueUserId}", ex.Message);
        }
        
        
        [Test]
        public void TryAdd_WithUsedUserIdByStudent_ShouldThrow()
        {
            _studentRepository.Save(new Student
            {
                Examination = _examination,
                UserId = _user.Id
            });
            
            
            Exception ex = Assert.Throws<InvalidOperationException>(
                () => _controller.Add(_examination, _speciality, _model, _user)
            );

            Assert.AreEqual("{application.constraints.noStudentUserId}", ex.Message);
        }


        [Test]
        public void ChangeSpeciality()
        {
            Application application = _controller.Add(_examination, _speciality, _model, _user).Value as Application;

            Speciality speciality = _specialityRepository.Save(new Speciality
            {
                Examination = _examination,
                Name = "speciality name"
            });
            _specialityRepository.Refresh(speciality);

            _controller.ChangeSpeciality(application, speciality);

            _applicationRepository.Refresh(application);

            Assert.NotNull(application);
            Assert.AreEqual(speciality, application.Speciality);
            Assert.AreEqual(0, _speciality.ApplicationCount);
            Assert.AreEqual(1, speciality.ApplicationCount);
        }

        [Test]
        public void RemoveSpeciality()
        {
            Application application = _controller.Add(_examination, _speciality, _model, _user).Value as Application;

            _controller.RemoveSpeciality(application);

            _applicationRepository.Refresh(application);

            Assert.NotNull(application);
            Assert.Null(application.Speciality);
            Assert.AreEqual(0, _speciality.ApplicationCount);
        }

        [Test]
        public void TryRemoveSpeciality_WhenExaminationRequireSpeciality_ShouldThrow()
        {
            Application application = _controller.Add(_examination, _speciality, _model, _user).Value as Application;

            _examination.RequireSpeciality = true;
            _examinationRepository.Update(_examination);

            Exception ex = Assert.Throws<InvalidOperationException>(() => _controller.RemoveSpeciality(application));
            
            _applicationRepository.Refresh(application);
            
            Assert.NotNull(application);
            Assert.NotNull(application.Speciality);
            Assert.AreEqual("{application.constraints.requireSpeciality}", ex.Message);
            
        }

        

        [Test]
        public void UpdateInfo()
        {
            Application application = _controller.Add(_examination, _speciality, _model, _user).Value as Application;

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
            Application application = _controller.Add(_examination, _speciality, _model, _user).Value as Application;

            User processUser = new User
            {
                Id = Guid.NewGuid().ToString()
            }; 
            
            _controller.Accept(application, processUser );
            
            _applicationRepository.Refresh(application);
            
            Assert.NotNull(application);
            Assert.True(application.Processed);
            Assert.AreEqual(processUser.Id, application.ProcessUserId);
            Assert.NotNull(application.ProcessDate);
            Assert.True(application.Accepted);
            Assert.True(DateTimeAssert.EqualsAtMinute(DateTime.Now, application.ProcessDate.Value));

            Student student = application.Student;
            Assert.NotNull(student);
            
            
            Assert.AreEqual(application.FullName, student.FullName);
            Assert.AreEqual(application.RegistrationId, student.RegistrationId);
            Assert.AreEqual(application.BirthDate, student.BirthDate);
            Assert.AreEqual(application.Gender, student.Gender);

            Assert.AreEqual(_examination, student.Examination);
            Assert.AreEqual(_speciality, student.Speciality);
            Assert.AreEqual(application.UserId, student.UserId);
            
            Assert.AreEqual(1, _speciality.AcceptedApplicationCount);
            Assert.AreEqual(1, _examination.AcceptedApplicationCount);
        }


        [Test]
        public void Reject()
        {
            Application application = _controller.Add(_examination, _speciality, _model, _user).Value as Application;

            User processUser = new User
            {
                Id = Guid.NewGuid().ToString()
            }; 
            
            _controller.Reject(application, processUser);
            
            _applicationRepository.Refresh(application);
            
            Assert.NotNull(application);
            Assert.True(application.Processed);
            Assert.AreEqual(processUser.Id, application.ProcessUserId);
            Assert.NotNull(application.ProcessDate);
            Assert.True(application.Rejected);
            Assert.True(DateTimeAssert.EqualsAtSecond(DateTime.Now, application.ProcessDate.Value));

            Assert.Null(application.Student);
            
            Assert.AreEqual(1, _speciality.RejectedApplicationCount);
            Assert.AreEqual(1, _examination.RejectedApplicationCount);
        }

        [Test]
        public void Delete()
        {
            Application application = _controller.Add(_examination, _speciality, _model, _user).Value as Application;
            _controller.Delete(application);
            _applicationRepository.Refresh(application);
            Assert.False(_applicationRepository.Exists(application));
        }
    }
}