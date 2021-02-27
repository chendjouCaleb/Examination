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
    public class ExaminationControllerTests
    {
        private ExaminationController _controller;
        private IRepository<Examination, long> _examinationRepository;
        private IRepository<School, long> _schoolRepository;

        private School _school;
        private ExaminationForm _model;

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<ExaminationController>();
            
            _schoolRepository = serviceProvider.GetRequiredService<IRepository<School, long>>();
            _examinationRepository = serviceProvider.GetRequiredService<IRepository<Examination, long>>();

            _school = _schoolRepository.Save(new School
            {
                Name = "Org name"
            });
            _model = new ExaminationForm
            {
                Name = "MATH-L3-2015/2016-S2",
                ExpectedStartDate = DateTime.Now.AddMonths(1),
                ExpectedEndDate = DateTime.Now.AddMonths(3)
            };
        }

        [Test]
        public void Add()
        {
            Examination examination = _controller._Add(_model, _school);
            
            Assert.NotNull(examination);
            Assert.AreEqual(_model.Name, examination.Name);
            Assert.AreEqual(_model.ExpectedStartDate, examination.ExpectedStartDate);
            Assert.AreEqual(_model.ExpectedEndDate, examination.ExpectedEndDate);

            Assert.AreEqual(_school, examination.School);
        }

        [Test]
        public void TryAdd_WithUsedName_ShouldThrow()
        {
            Examination examination = _controller._Add(_model, _school);
            _examinationRepository.Save(examination);
            
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller._Add(_model, _school));

            Assert.AreEqual("{examination.constraints.uniqueName}", ex.Message);
        }

        [Test]
        public void TryAdd_WithEndDate_Before_StartDate_ShouldThrow()
        {
            _model.ExpectedStartDate = DateTime.Now.AddMonths(2);
            _model.ExpectedEndDate = DateTime.Now.AddMonths(1);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller._Add(_model, _school));

            Assert.AreEqual("{period.constraints.startDate-before-endDate}", ex.Message);
        }

        [Test]
        public void ChangeName()
        {
            Examination examination = _controller._Add(_model, _school);
            _examinationRepository.Save(examination);

            string name = "INFO-L3-2015/2016-S2";
            _controller.ChangeName(examination, name);
            _examinationRepository.Refresh(examination);
            
            Assert.NotNull(examination);
            Assert.AreEqual(name, examination.Name);
            
        }

        [Test]
        public void TryChangeName_WithUsedName_ShouldThrow()
        {
            Examination examination = _controller._Add(_model, _school);
            _examinationRepository.Save(examination);

            _model.Name = "INFO-L3-2015/2016-S2";
            examination = _controller._Add(_model, _school);
            _examinationRepository.Save(examination);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.ChangeName(examination, _model.Name)
            );

            Assert.AreEqual("{examination.constraints.uniqueName}", ex.Message);
        }

        [Test]
        public void ChangeStartDate()
        {
            Examination examination = _controller._Add(_model, _school);
            _examinationRepository.Save(examination);
            DateTime startDate = DateTime.Now.AddMonths(2);

            _controller.ChangeStartDate(examination, startDate);

            Assert.NotNull(examination);
            Assert.AreEqual(startDate, examination.ExpectedStartDate);
        }

        [Test]
        public void Try_ChangeStartDate_WithDateAfterEndDate_ShouldThrow()
        {
            Examination examination = _controller._Add(_model, _school);
            _examinationRepository.Save(examination);
            DateTime startDate = DateTime.Now.AddMonths(4);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.ChangeStartDate(examination, startDate)
            );

            Assert.AreEqual("{period.constraints.startDate-before-endDate}", ex.Message);
        }


        [Test]
        public void ChangeEndDate()
        {
            Examination examination = _controller._Add(_model, _school);
            _examinationRepository.Save(examination);

            DateTime endDate = DateTime.Now.AddMonths(4);

            _controller.ChangeEndDate(examination, endDate);

            Assert.NotNull(examination);
            Assert.AreEqual(endDate, examination.ExpectedEndDate);
        }


        [Test]
        public void Try_ChangeEndDate_WithDateBeforeStartDate_ShouldThrow()
        {
            Examination examination = _controller._Add(_model, _school);
            _examinationRepository.Save(examination);
            
            DateTime endDate = DateTime.Now.AddDays(2);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.ChangeEndDate(examination, endDate)
            );

            Assert.AreEqual("{period.constraints.endDate-before-startDate}", ex.Message);
        }


        [Test]
        public void StartExamination()
        {
            Examination examination = _controller._Add(_model, _school);
            _examinationRepository.Save(examination);
            
            _controller.Start(examination);
            _examinationRepository.Refresh(examination);
            
            Assert.NotNull(examination);
            Assert.NotNull(examination.StartDate);
            Assert.True(DateTimeAssert.EqualsAtMinute(DateTime.Now, examination.StartDate.Value));
        }
        
        
        [Test]
        public void CloseExamination()
        {
            Examination examination = _controller._Add(_model, _school);
            _examinationRepository.Save(examination);
            
            _controller.Start(examination);
            _controller.End(examination);
            _examinationRepository.Refresh(examination);
            
            Assert.NotNull(examination);
            Assert.NotNull(examination.EndDate);
            Assert.True(DateTimeAssert.EqualsAtSecond(DateTime.Now, examination.EndDate.Value));
        }


        [Test]
        public void RelaunchExamination()
        {
            Examination examination = _controller._Add(_model, _school);
            _examinationRepository.Save(examination);
            
            _controller.Start(examination);
            _controller.End(examination);
            _controller.Relaunch(examination);
            _examinationRepository.Refresh(examination);

            Assert.NotNull(examination);
            Assert.Null(examination.EndDate);
        }

        
    }
}