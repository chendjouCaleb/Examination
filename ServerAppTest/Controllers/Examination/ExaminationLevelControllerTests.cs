using System;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class ExaminationLevelControllerTests
    {
        private ExaminationLevelController _controller;
        private IRepository<ExaminationDepartment, long> _examinationDepartmentRepository;
        private IRepository<ExaminationLevel, long> _examinationLevelRepository;
        private IRepository<Department, long> _departmentRepository;
        private IRepository<Level, long> _levelRepository;

        private Department _department;
        private Level _level;
        private ExaminationDepartment _examinationDepartment;


        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider services = ServiceConfiguration.BuildServiceProvider();


            _controller = services.GetRequiredService<ExaminationLevelController>();

            _departmentRepository = services.GetRequiredService<IRepository<Department, long>>();
            _examinationDepartmentRepository = services.GetRequiredService<IRepository<ExaminationDepartment, long>>();
            _examinationLevelRepository = services.GetRequiredService<IRepository<ExaminationLevel, long>>();
            _levelRepository = services.GetRequiredService<IRepository<Level, long>>();

            _department = _departmentRepository.Save(new Department
            {
                Name = "Org name"
            });

            _examinationDepartment = _examinationDepartmentRepository.Save(new ExaminationDepartment
            {
                Department = _department
            });
            
            _level = _levelRepository.Save(new Level
            {
                Department = _department
                
            });
        }

        [Test]
        public void Add()
        {
            ExaminationLevel examinationLevel = _controller._Add(_examinationDepartment, _level);

            _examinationLevelRepository.Refresh(examinationLevel);

            Assert.NotNull(examinationLevel);
            Assert.AreEqual(examinationLevel.ExaminationDepartment, _examinationDepartment);
            Assert.AreEqual(examinationLevel.Level, _level);
        }

        [Test]
        public void Check_If_Add_IsPureMethod()
        {
            ExaminationLevel examinationLevel1 = _controller._Add(_examinationDepartment, _level);
            ExaminationLevel examinationLevel2 = _controller._Add(_examinationDepartment, _level);

            Assert.AreEqual(examinationLevel1, examinationLevel2);
        }


        [Test]
        public void Delete()
        {
            ExaminationLevel examinationLevel = _controller._Add(_examinationDepartment, _level);
            _controller.Delete(examinationLevel);
            _departmentRepository.Refresh(_department);

            Assert.False(_examinationLevelRepository.Exists(examinationLevel));
        }
    }
}