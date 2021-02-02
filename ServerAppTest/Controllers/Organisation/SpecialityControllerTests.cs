using System;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Exam.Exceptions;
using Exam.Models;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class SpecialityControllerTests
    {
        private SpecialityController _controller;
        private IRepository<Department, long> _departmentRepository;
        private IRepository<Speciality, long> _specialityRepository;

        private Department _department;
        private SpecialityForm _model;

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<SpecialityController>();

            _departmentRepository = serviceProvider.GetRequiredService<IRepository<Department, long>>();
            _specialityRepository = serviceProvider.GetRequiredService<IRepository<Speciality, long>>();

            _department = _departmentRepository.Save(new Department
            {
                Name = "Department"
            });

            _model = new SpecialityForm
            {
                Name = "Speciality name",
                Description = "Speciality description"
            };
        }

        [Test]
        public void Add()
        {
            Speciality speciality = _controller.Add(_department, _model);

            _specialityRepository.Refresh(speciality);

            Assert.NotNull(speciality);
            Assert.AreEqual(_model.Name, speciality.Name);
            Assert.AreEqual(_model.Description, speciality.Description);
            Assert.AreEqual(_department, speciality.Department);
        }

        [Test]
        public void TryAdd_WithUsedName_ShouldThrow()
        {
            _controller.Add(_department, _model);
            Exception ex = Assert.Throws<UniqueValueException>(() => _controller.Add(_department, _model));

            Assert.AreEqual("{speciality.constraints.uniqueName}", ex.Message);
        }

        [Test]
        public void Edit()
        {
            SpecialityEditForm form = new SpecialityEditForm
            {
                Name = "speciality new name",
                Description = "New description"
            };

            Speciality speciality = _controller.Add(_department, _model);

            _controller.Edit(speciality, form);
            _specialityRepository.Refresh(speciality);

            Assert.NotNull(speciality);
            Assert.AreEqual(form.Description, speciality.Description);
            Assert.AreEqual(form.Name, speciality.Name);
        }

        [Test]
        public void EditWithSameInfo_ShouldNotThrow()
        {
            SpecialityEditForm form = new SpecialityEditForm
            {
                Name = _model.Name,
                Description = _model.Description
            };

            Speciality speciality = _controller.Add(_department, _model);

            _controller.Edit(speciality, form);
        }

        [Test]
        public void TryEdit_WithUsedName_ShouldThrow()
        {
            Speciality speciality1 = _controller.Add(_department, _model);

            Speciality speciality2 = _controller.Add(_department, new SpecialityForm()
            {
                Name = "Dep2 Name",
                Description = "Speciality new Name"
            });

            SpecialityEditForm form = new SpecialityEditForm
            {
                Name = speciality2?.Name,
                Description = "New description"
            };

            Exception ex = Assert.Throws<UniqueValueException>(() => _controller.Edit(speciality1, form));

            Assert.AreEqual("{speciality.constraints.uniqueName}", ex.Message);
        }


        [Test]
        public void Delete()
        {
            Speciality speciality = _controller.Add(_department, _model);
            _controller.Delete(speciality);
            _specialityRepository.Refresh(speciality);

            Assert.False(_specialityRepository.Exists(speciality));
        }
    }
}