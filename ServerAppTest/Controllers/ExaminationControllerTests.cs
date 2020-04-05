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

        private ExaminationForm _model;

        private string _userId = Guid.NewGuid().ToString();

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<ExaminationController>();
            _examinationRepository = serviceProvider.GetRequiredService<IRepository<Examination, long>>();
            
            _model = new ExaminationForm
            {
                RequireSpeciality = true,
                Name = "MATH-L3-2015/2016-S2",
                ExpectedStartDate = DateTime.Now.AddMonths(1),
                ExpectedEndDate = DateTime.Now.AddMonths(3)
            };
        }

        [Test]
        public void Add()
        {
            Examination examination = _controller.Add(_model, _userId).Value as Examination;

            _examinationRepository.Refresh(examination);

            Assert.NotNull(examination);
            Assert.AreEqual(_model.Name, examination.Name);
            Assert.AreEqual(_model.RequireSpeciality, examination.RequireSpeciality);
            Assert.AreEqual(_model.ExpectedStartDate, examination.ExpectedStartDate);
            Assert.AreEqual(_model.ExpectedEndDate, examination.ExpectedEndDate);
        }

        [Test]
        public void TryAdd_WithUsedName_ShouldThrow()
        {
            _controller.Add(_model, _userId);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller.Add(_model, _userId));

            Assert.AreEqual("{examination.constraints.uniqueName}", ex.Message);
        }

        [Test]
        public void TryAdd_WithEndDate_Before_StartDate_ShouldThrow()
        {
            _model.ExpectedStartDate = DateTime.Now.AddMonths(2);
            _model.ExpectedEndDate = DateTime.Now.AddMonths(1);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller.Add(_model, _userId));

            Assert.AreEqual("{period.constraints.startDate-before-endDate}", ex.Message);
        }

        [Test]
        public void ChangeName()
        {
            Examination examination = _controller.Add(_model, _userId).Value as Examination;

            string name = "INFO-L3-2015/2016-S2";
            _controller.ChangeName(examination, name);
            _examinationRepository.Refresh(examination);
            
            Assert.NotNull(examination);
            Assert.AreEqual(name, examination.Name);
            
        }

        [Test]
        public void TryChangeName_WithUsedName_ShouldThrow()
        {
            Examination examination = _controller.Add(_model, _userId).Value as Examination;

            _model.Name = "INFO-L3-2015/2016-S2";
            _controller.Add(_model, _userId);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.ChangeName(examination, _model.Name)
            );

            Assert.AreEqual("{examination.constraints.uniqueName}", ex.Message);
        }

        [Test]
        public void ChangeStartDate()
        {
            Examination examination = _controller.Add(_model, _userId).Value as Examination;
            DateTime startDate = DateTime.Now.AddMonths(2);

            _controller.ChangeStartDate(examination, startDate);

            Assert.NotNull(examination);
            Assert.AreEqual(startDate, examination.ExpectedStartDate);
        }

        [Test]
        public void Try_ChangeStartDate_WithDateAfterEndDate_ShouldThrow()
        {
            Examination examination = _controller.Add(_model, _userId).Value as Examination;
            DateTime startDate = DateTime.Now.AddMonths(4);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.ChangeStartDate(examination, startDate)
            );

            Assert.AreEqual("{period.constraints.startDate-before-endDate}", ex.Message);
        }


        [Test]
        public void ChangeEndDate()
        {
            Examination examination = _controller.Add(_model, _userId).Value as Examination;

            DateTime endDate = DateTime.Now.AddMonths(4);

            _controller.ChangeEndDate(examination, endDate);

            Assert.NotNull(examination);
            Assert.AreEqual(endDate, examination.ExpectedEndDate);
        }


        [Test]
        public void Try_ChangeEndDate_WithDateBeforeStartDate_ShouldThrow()
        {
            Examination examination = _controller.Add(_model, _userId).Value as Examination;
            DateTime endDate = DateTime.Now.AddDays(2);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.ChangeEndDate(examination, endDate)
            );

            Assert.AreEqual("{period.constraints.endDate-before-startDate}", ex.Message);
        }


        [Test]
        public void StartExamination()
        {
            Examination examination = _controller.Add(_model, _userId).Value as Examination;
            _controller.Start(examination);
            _examinationRepository.Refresh(examination);
            
            Assert.NotNull(examination);
            Assert.True(DateTimeAssert.EqualsAtSecond(DateTime.Now, examination.StartDate.Value));
        }
        
        
        [Test]
        public void CloseExamination()
        {
            Examination examination = _controller.Add(_model, _userId).Value as Examination;
            _controller.Start(examination);
            _controller.End(examination);
            _examinationRepository.Refresh(examination);
            
            Assert.NotNull(examination);
            Assert.True(DateTimeAssert.EqualsAtSecond(DateTime.Now, examination.EndDate.Value));
        }


        [Test]
        public void RelaunchExamination()
        {
            Examination examination = _controller.Add(_model, _userId).Value as Examination;
            _controller.Start(examination);
            _controller.End(examination);
            _controller.Relaunch(examination);
            _examinationRepository.Refresh(examination);

            Assert.NotNull(examination);
            Assert.Null(examination.EndDate);
        }

        [Test]
        public void Delete()
        {
            Examination examination = _controller.Add(_model, _userId).Value as Examination;
            _controller.Delete(examination);
            
            Assert.False(_examinationRepository.Exists(examination));
        }
    }
}