using System;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class ExaminationDepartmentControllerTests
    {
        private ExaminationDepartmentController _controller;
        private IRepository<Examination, long> _examinationRepository;
        private IRepository<ExaminationDepartment, long> _examinationDepartmentRepository;
        private IRepository<School, long> _schoolRepository;
        private IRepository<Department, long> _departmentRepository;

        private School _school;
        private Department _department;
        private Examination _examination;


        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<ExaminationDepartmentController>();

            _schoolRepository = serviceProvider.GetRequiredService<IRepository<School, long>>();
            _examinationRepository = serviceProvider.GetRequiredService<IRepository<Examination, long>>();
            _examinationDepartmentRepository =
                serviceProvider.GetRequiredService<IRepository<ExaminationDepartment, long>>();
            _departmentRepository = serviceProvider.GetRequiredService<IRepository<Department, long>>();

            _school = _schoolRepository.Save(new School
            {
                Name = "Org name"
            });

            _examination = _examinationRepository.Save(new Examination
            {
                School = _school,
                Name = "MATH-L3-2015/2016-S2",
                ExpectedStartDate = DateTime.Now.AddMonths(1),
                ExpectedEndDate = DateTime.Now.AddMonths(3)
            });
            _department = _departmentRepository.Save(new Department
            {
                School = _school,
                Name = "MATH-L3-2015/2016-S2"
            });
        }

        [Test]
        public void Add()
        {
            ExaminationDepartment examinationDepartment = _controller._Add(_examination, _department);

            _examinationDepartmentRepository.Refresh(examinationDepartment);

            Assert.NotNull(examinationDepartment);
            Assert.AreEqual(examinationDepartment.Examination, _examination);
            Assert.AreEqual(examinationDepartment.Department, _department);
        }

        [Test]
        public void Check_If_Add_IsPureMethod()
        {
            ExaminationDepartment examinationDepartment1 = _controller._Add(_examination, _department);
            ExaminationDepartment examinationDepartment2 = _controller._Add(_examination, _department);

            Assert.AreEqual(examinationDepartment1, examinationDepartment2);
        }


        [Test]
        public void Delete()
        {
            ExaminationDepartment examinationDepartment = _controller._Add(_examination, _department);
            _controller.Delete(examinationDepartment);
            _schoolRepository.Refresh(_school);

            Assert.False(_examinationDepartmentRepository.Exists(examinationDepartment));
        }
    }
}