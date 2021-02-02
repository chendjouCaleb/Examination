using System;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Exam.Models;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class DepartmentControllerTests
    {
        private DepartmentController _controller;
        private IRepository<School, long> _schoolRepository;
        private IRepository<Department, long> _departmentRepository;
        
        private School _school;
        private AddDepartmentForm _model;

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<DepartmentController>();

            _schoolRepository = serviceProvider.GetRequiredService<IRepository<School, long>>();
            _departmentRepository = serviceProvider.GetRequiredService<IRepository<Department, long>>();

            _school = _schoolRepository.Save(new School
            {
                Name = "School"
            });
            
            _model = new AddDepartmentForm 
            {
                Name = "Org name",
                UserId = Guid.NewGuid().ToString(),
                Address = "Cmr, Yaounde",
                Acronym = "UY-1"
            };
        }

        [Test]
        public void Add()
        {
            Department department = _controller.Add(_school, _model).Value as Department;

            _departmentRepository.Refresh(department);

            Assert.NotNull(department);
            Assert.AreEqual(_model.Name, department.Name);
            Assert.AreEqual(_model.Address, department.Address);
            Assert.AreEqual(_model.Acronym, department.Acronym);
            
            Assert.AreEqual(_model.UserId, department.PrincipalUserId);
            Assert.AreEqual(_school, department.School);
        }

        [Test]
        public void TryAdd_WithUsedName_ShouldThrow()
        {
            _controller.Add(_school, _model);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller.Add(_school, _model));

            Assert.AreEqual("{department.constraints.uniqueName}", ex.Message);
        }
        
        [Test]
        public void TryAdd_WithUsedAcronym_ShouldThrow()
        {
            _controller.Add(_school, _model);
            _model.Name = "Other name";
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller.Add(_school, _model));

            Assert.AreEqual("{department.constraints.uniqueAcronym}", ex.Message);
        }
        
        
        
        
        
        [Test]
        public void Edit()
        {
            EditDepartmentForm form = new EditDepartmentForm
            {
                Name = "school new name",
                Acronym = "NACR",
                Address = "school address",
            };
            
            Department department = _controller.Add(_school, _model).Value as Department;

            _controller.Edit(department, form);
            _departmentRepository.Refresh(department);

            Assert.NotNull(department);
            Assert.AreEqual(form.Acronym, department.Acronym);
            Assert.AreEqual(form.Address, department.Address);
            Assert.AreEqual(form.Name, department.Name);
        }

        [Test]
        public void EditWithSameInfo_ShouldNotThrow()
        {
            EditDepartmentForm form = new EditDepartmentForm
            {
                Name = _model.Name,
                Acronym = _model.Acronym,
                Address = _model.Address
            };
            
            Department department = _controller.Add(_school, _model).Value as Department;

            _controller.Edit(department, form);
        } 
        
        [Test]
        public void TryEdit_WithUsedName_ShouldThrow()
        {
            Department department1 = _controller.Add(_school, _model).Value as Department;
            
            Department department2 = _controller.Add(_school, new AddDepartmentForm
            {
                Name = "Dep2 Name",
                Acronym = "D2A",
                Address = "Dept2, city"
            } ).Value as Department;
            
            EditDepartmentForm form = new EditDepartmentForm
            {
                Name = department2?.Name,
                Acronym = "NACR",
                Address = "dept address",
            };
            
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller.Edit(department1, form));

            Assert.AreEqual("{department.constraints.uniqueName}", ex.Message);
        }
        
        [Test]
        public void TryEdit_WithUsedAcronym_ShouldThrow()
        {
            Department department1 = _controller.Add(_school, _model).Value as Department;
            
            Department department2 = _controller.Add(_school, new AddDepartmentForm
            {
                Name = "Dep2 Name",
                Acronym = "D2A",
                Address = "Dept2, city"
            } ).Value as Department;
            
            EditDepartmentForm form = new EditDepartmentForm
            {
                Name= "new name",
                Acronym = department2?.Acronym,
                Address = "dept address",
            };
            
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller.Edit(department1, form));

            Assert.AreEqual("{department.constraints.uniqueAcronym}", ex.Message);
        }
        
        [Test]
        public void Delete()
        {
            Department department = _controller.Add(_school, _model).Value as Department;
            _controller.Delete(department);
            _departmentRepository.Refresh(department);
            
            Assert.False(_departmentRepository.Exists(department));
        }
    }
}