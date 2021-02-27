using System;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class ExaminationLevelSpecialityControllerTests
    {
        private ExaminationLevelSpecialityController _controller;
        private IRepository<ExaminationDepartment, long> _examinationDepartmentRepository;
        private IRepository<ExaminationSpeciality, long> _examinationSpecialityRepository;
        private IRepository<ExaminationLevel, long> _examinationLevelRepository;
        private IRepository<ExaminationLevelSpeciality, long> _examinationLevelSpecialityRepository;
        private IRepository<Department, long> _departmentRepository;
        private IRepository<Speciality, long> _specialityRepository;
        private IRepository<LevelSpeciality, long> _levelSpecialityRepository;
        private IRepository<Level, long> _levelRepository;

        private Department _department;
        private Speciality _speciality;
        private Level _level;
        private LevelSpeciality _levelSpeciality;
        private ExaminationDepartment _examinationDepartment;
        private ExaminationLevel _examinationLevel;
        private ExaminationSpeciality _examinationSpeciality;


        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider services = ServiceConfiguration.BuildServiceProvider();


            _controller = services.GetRequiredService<ExaminationLevelSpecialityController>();

            _departmentRepository = services.GetRequiredService<IRepository<Department, long>>();
            _levelRepository = services.GetRequiredService<IRepository<Level, long>>();
            _specialityRepository = services.GetRequiredService<IRepository<Speciality, long>>();
            _levelSpecialityRepository = services.GetRequiredService<IRepository<LevelSpeciality, long>>();


            _examinationDepartmentRepository = services.GetRequiredService<IRepository<ExaminationDepartment, long>>();
            _examinationSpecialityRepository = services.GetRequiredService<IRepository<ExaminationSpeciality, long>>();
            _examinationLevelRepository = services.GetRequiredService<IRepository<ExaminationLevel, long>>();

            _examinationLevelSpecialityRepository =
                services.GetRequiredService<IRepository<ExaminationLevelSpeciality, long>>();

            _department = _departmentRepository.Save(new Department
            {
                Name = "Org name"
            });

            _speciality = _specialityRepository.Save(new Speciality
            {
                Department = _department
            });

            _level = _levelRepository.Save(new Level
            {
                Department = _department
            });

            _levelSpeciality = _levelSpecialityRepository.Save(new LevelSpeciality
            {
                Level = _level,
                Speciality = _speciality
            });

            _examinationDepartment = _examinationDepartmentRepository.Save(new ExaminationDepartment
            {
                Department = _department
            });

            _examinationSpeciality = _examinationSpecialityRepository.Save(new ExaminationSpeciality
            {
                ExaminationDepartment = _examinationDepartment,
                Speciality = _speciality
            });

            _examinationLevel = _examinationLevelRepository.Save(new ExaminationLevel
            {
                ExaminationDepartment = _examinationDepartment,
                Level = _level
            });
        }

        [Test]
        public void Add()
        {
            ExaminationLevelSpeciality examinationLevelSpeciality =
                _controller._Add(_examinationLevel, _examinationSpeciality);

            _examinationLevelSpecialityRepository.Refresh(examinationLevelSpeciality);

            Assert.NotNull(examinationLevelSpeciality);
            Assert.AreEqual(examinationLevelSpeciality.ExaminationLevel, _examinationLevel);
            Assert.AreEqual(examinationLevelSpeciality.LevelSpeciality, _levelSpeciality);
            Assert.AreEqual(examinationLevelSpeciality.ExaminationSpeciality, _examinationSpeciality);
        }

        [Test]
        public void Check_If_Add_IsPureMethod()
        {
            ExaminationLevelSpeciality examinationSpeciality1 =
                _controller._Add(_examinationLevel, _examinationSpeciality);
            ExaminationLevelSpeciality examinationSpeciality2 =
                _controller._Add(_examinationLevel, _examinationSpeciality);

            Assert.AreEqual(examinationSpeciality1, examinationSpeciality2);
        }


        [Test]
        public void Delete()
        {
            ExaminationLevelSpeciality examinationLevelSpeciality =
                _controller._Add(_examinationLevel, _examinationSpeciality);

            _examinationLevelSpecialityRepository.Save(examinationLevelSpeciality);
            
            _controller.Delete(examinationLevelSpeciality);
            
            Assert.False(_examinationLevelSpecialityRepository.Exists(examinationLevelSpeciality));
        }
    }
}