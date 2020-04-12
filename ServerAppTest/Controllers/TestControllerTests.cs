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
    public class TestControllerTests
    {
        private TestController _controller;
        private IRepository<Test, long> _testRepository;
        private IRepository<Organisation, long> _organisationRepository;
        private IRepository<Examination, long> _examinationRepository;
        private IRepository<Speciality, long> _specialityRepository;
        
        
        private Speciality _speciality;
        private Examination _examination;
        private Organisation _organisation;
        private TestForm _model;

        private User _user = new User
        {
            Id = Guid.NewGuid().ToString()
        };

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<TestController>();

            _organisationRepository = serviceProvider.GetRequiredService<IRepository<Organisation, long>>();
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();
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
            _model = new TestForm
            {
                Name = "test name",
                Code = "ABC 32",
                Coefficient = 5,
                UseAnonymity = false,
                ExpectedStartDate= DateTime.Now.AddHours(1),
                ExpectedEndDate = DateTime.Now.AddHours(3)
            };
        }

        [Test]
        public void Add()
        {
            Test test = _controller.Add(_examination, _speciality, _model, _user).Value as Test;

            _testRepository.Refresh(test);

            Assert.NotNull(test);
            Assert.AreEqual(_model.Name, test.Name);
            Assert.AreEqual(_model.Code, test.Code);
            Assert.AreEqual(_model.Coefficient, test.Coefficient);
            Assert.AreEqual(_model.UseAnonymity, test.UseAnonymity);
            Assert.AreEqual(_model.ExpectedEndDate, test.ExpectedEndDate);

            Assert.False(test.IsClosed);
            Assert.Null(test.PublicationDate);
            Assert.Null(test.ClosingDate);

            Assert.AreEqual(_examination, test.Examination);
            Assert.AreEqual(_speciality, test.Speciality);
            Assert.AreEqual(_user.Id, test.RegisterUserId);
        }


        
        
        [Test]
        public void TryAdd_WithUsedCode_ShouldThrow()
        {
            _controller.Add(_examination, _speciality, _model, _user);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.Add(_examination, _speciality, _model, _user)
            );

            Assert.AreEqual("{test.constraints.uniqueCode}", ex.Message);
        }

        [Test]
        public void ChangeDates()
        {
            Test test = _controller.Add(_examination, _speciality, _model, _user).Value as Test;

            ExpectedPeriod period = new ExpectedPeriod
            {
                ExpectedStartDate= DateTime.Now.AddHours(1),
                ExpectedEndDate = DateTime.Now.AddHours(3)
            };

            _controller.ChangeDates(test, period);
            _testRepository.Refresh(test);
            
            Assert.NotNull(test);
            Assert.AreEqual(period.ExpectedEndDate, test.ExpectedEndDate);
            Assert.AreEqual(period.ExpectedStartDate, test.ExpectedStartDate);
        }


        [Test]
        public void ChangeName()
        {
            Test test = _controller.Add(_examination, _speciality, _model, _user).Value as Test;
            string name = "new name";

            _controller.ChangeName(test, name);

            _testRepository.Refresh(test);

            Assert.NotNull(test);
            Assert.AreEqual(name, test.Name);
        }

        [Test]
        public void ChangeCode()
        {
            Test test = _controller.Add(_examination, _speciality, _model, _user).Value as Test;
            string code = "500";

            _controller.ChangeCode(test, code);

            _testRepository.Refresh(test);

            Assert.NotNull(test);
            Assert.AreEqual(code, test.Code);
        }

        [Test]
        public void TryChangeCode_WithUsedCode_ShouldThrow()
        {
            Test test1 = _controller.Add(_examination, _speciality, _model, _user).Value as Test;


            _model.Code = "0123";
            _model.ExpectedStartDate = DateTime.Now.AddHours(5);
            _model.ExpectedEndDate = DateTime.Now.AddHours(7);

            Test test2 = _controller.Add(_examination, _speciality, _model, _user).Value as Test;

            string code = "1523";
            _controller.ChangeCode(test1, code);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.ChangeCode(test2, code)
            );

            Assert.AreEqual("{test.constraints.uniqueCode}", ex.Message);
        }

        [Test]
        public void ChangeCoefficient()
        {
            Test test = _controller.Add(_examination, _speciality, _model, _user).Value as Test;
            uint coefficient = 10;

            _controller.ChangeCoefficient(test, coefficient);

            _testRepository.Refresh(test);

            Assert.NotNull(test);
            Assert.AreEqual(coefficient, test.Coefficient);
        }

        [Test]
        public void ChangeAnonymity_WhenIsFalse_ShouldBeTrue()
        {
            Test test = _controller.Add(_examination, _speciality, _model, _user).Value as Test;
            _controller.ChangeAnonymityState(test);

            _testRepository.Refresh(test);

            Assert.NotNull(test);
            Assert.True(test.UseAnonymity);
        }
        
        
        [Test]
        public void ChangeAnonymity_WhenIsTrue_ShouldBeFalse()
        {
            Test test = _controller.Add(_examination, _speciality, _model, _user).Value as Test;
            
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
            Test test = _controller.Add(_examination, _speciality, _model, _user).Value as Test;

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
            Test test = _controller.Add(_examination, _speciality, _model, _user).Value as Test;

            _controller.ChangePublicationState(test);
            _controller.ChangePublicationState(test);
            _testRepository.Refresh(test);
            
            Assert.NotNull(test);
            Assert.Null(test.PublicationDate);
            Assert.False(test.IsPublished);

        }
        
        
        [Test]
        public void Close()
        {
            Test test = _controller.Add(_examination, _speciality, _model, _user).Value as Test;

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
            Test test = _controller.Add(_examination, _speciality, _model, _user).Value as Test;

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
            Test test = _controller.Add(_examination, _speciality, _model, _user).Value as Test;
            _controller.Delete(test);
            _testRepository.Refresh(test);
            Assert.False(_testRepository.Exists(test));
        }
    }
}