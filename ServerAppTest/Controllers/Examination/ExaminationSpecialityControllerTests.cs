using System;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class ExaminationSpecialityControllerTests
    {
        private ExaminationSpecialityController _controller;
        private IRepository<ExaminationDepartment, long> _examinationDepartmentRepository;
        private IRepository<ExaminationSpeciality, long> _examinationSpecialityRepository;
        private IRepository<Department, long> _departmentRepository;
        private IRepository<Speciality, long> _specialityRepository;

        private Department _department;
        private Speciality _speciality;
        private ExaminationDepartment _examinationDepartment;


        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider services = ServiceConfiguration.BuildServiceProvider();


            _controller = services.GetRequiredService<ExaminationSpecialityController>();

            _departmentRepository = services.GetRequiredService<IRepository<Department, long>>();
            _examinationDepartmentRepository = services.GetRequiredService<IRepository<ExaminationDepartment, long>>();
            _examinationSpecialityRepository = services.GetRequiredService<IRepository<ExaminationSpeciality, long>>();
            _specialityRepository = services.GetRequiredService<IRepository<Speciality, long>>();

            _department = _departmentRepository.Save(new Department
            {
                Name = "Org name"
            });

            _examinationDepartment = _examinationDepartmentRepository.Save(new ExaminationDepartment
            {
                Department = _department
            });

            _speciality = _specialityRepository.Save(new Speciality
            {
                Department = _department
            });
        }

        [Test]
        public void Add()
        {
            ExaminationSpeciality examinationSpeciality = _controller._Add(_examinationDepartment, _speciality);

            _examinationSpecialityRepository.Refresh(examinationSpeciality);

            Assert.NotNull(examinationSpeciality);
            Assert.AreEqual(examinationSpeciality.ExaminationDepartment, _examinationDepartment);
            Assert.AreEqual(examinationSpeciality.Speciality, _speciality);
        }

        [Test]
        public void Check_If_Add_IsPureMethod()
        {
            ExaminationSpeciality examinationSpeciality1 = _controller._Add(_examinationDepartment, _speciality);
            ExaminationSpeciality examinationSpeciality2 = _controller._Add(_examinationDepartment, _speciality);

            Assert.AreEqual(examinationSpeciality1, examinationSpeciality2);
        }


        [Test]
        public void Delete()
        {
            ExaminationSpeciality examinationSpeciality = _controller._Add(_examinationDepartment, _speciality);
            _examinationSpecialityRepository.Save(examinationSpeciality);
            
            _controller.Delete(examinationSpeciality);
            _departmentRepository.Refresh(_department);

            Assert.False(_examinationSpecialityRepository.Exists(examinationSpeciality));
        }
    }
}