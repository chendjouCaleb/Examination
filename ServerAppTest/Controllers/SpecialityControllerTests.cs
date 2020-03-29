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
    public class SpecialityControllerTests
    {
        private SpecialityController _controller;
        private IRepository<Speciality, long> _specialityRepository;
        private IRepository<Examination, long> _examinationRepository;

        private SpecialityForm _model;
        private Examination _examination;
        

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<SpecialityController>();
            _specialityRepository = serviceProvider.GetRequiredService<IRepository<Speciality, long>>();
            _examinationRepository = serviceProvider.GetRequiredService<IRepository<Examination, long>>();
            
            _examination = _examinationRepository.Save(new Examination 
            {
                RequireSpeciality = true,
                Name = "MATH-L3-2015/2016-S2",
                ExpectedStartDate = DateTime.Now.AddMonths(1),
                ExpectedEndDate = DateTime.Now.AddMonths(3)
            });

            _model = new SpecialityForm {Name = "Calculus" };
        }

        [Test]
        public void Add()
        {
            Speciality speciality = _controller.Add(_examination, _model).Value as Speciality;

            _specialityRepository.Refresh(speciality);
            _examinationRepository.Refresh(_examination);

            Assert.NotNull(speciality);
            Assert.AreEqual(_model.Name, speciality.Name);
            Assert.AreEqual(_examination, speciality.Examination);
            Assert.AreEqual(1, _examination.SpecialityCount);
        }

        [Test]
        public void TryAdd_WithUsedName_ShouldThrow()
        {
            _controller.Add(_examination, _model);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller.Add(_examination, _model));

            Assert.AreEqual("{speciality.constraints.uniqueNameByExamination}", ex.Message);
        }
        
        [Test]
        public void ChangeName()
        {
            Speciality speciality = _controller.Add(_examination, _model).Value as Speciality;

            string name = "Calculus-1";
            _controller.ChangeName(speciality, name);
            _specialityRepository.Refresh(speciality);
            
            Assert.NotNull(speciality);
            Assert.AreEqual(name, speciality.Name);
            
        }

        [Test]
        public void TryChangeName_WithUsedName_ShouldThrow()
        {
            Speciality speciality = _controller.Add(_examination, _model).Value as Speciality;

            _model.Name = "Calculus-1";
            _controller.Add(_examination, _model);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.ChangeName(speciality, _model.Name)
            );

            Assert.AreEqual("{speciality.constraints.uniqueNameByExamination}", ex.Message);
        }
        
        
        [Test]
        public void Delete()
        {
            Speciality speciality = _controller.Add(_examination, _model).Value as Speciality;
            _controller.Delete(speciality);
            
            _examinationRepository.Refresh(_examination);
            Assert.AreEqual(0, _examination.SpecialityCount);
            
            Assert.False(_specialityRepository.Exists(speciality));
        }
    }
}