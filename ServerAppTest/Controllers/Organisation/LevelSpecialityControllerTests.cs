using System;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class LevelSpecialityControllerTests
    {
        private LevelSpecialityController _controller;
        private IRepository<Department, long> _departmentRepository;
        private IRepository<Level, long> _levelRepository;
        private IRepository<Speciality, long> _specialityRepository;
        private IRepository<LevelSpeciality, long> _levelSpecialityRepository;

        private Department _department;
        private Level _level;
        private Speciality _speciality;

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<LevelSpecialityController>();

            _departmentRepository = serviceProvider.GetRequiredService<IRepository<Department, long>>();
            _specialityRepository = serviceProvider.GetRequiredService<IRepository<Speciality, long>>();
            _levelRepository = serviceProvider.GetRequiredService<IRepository<Level, long>>();
            _levelSpecialityRepository = serviceProvider.GetRequiredService<IRepository<LevelSpeciality, long>>();

            _department = _departmentRepository.Save(new Department
            {
                Name = "Department"
            });

            _level = _levelRepository.Save(new Level {Department = _department, Index = 0});
            _speciality = _specialityRepository.Save(new Speciality {Name = "Name", Department = _department});
        }

        [Test]
        public void Add()
        {
            LevelSpeciality levelSpeciality = _controller.Add(_level, _speciality).Value as LevelSpeciality;

            _levelSpecialityRepository.Refresh(levelSpeciality);

            Assert.NotNull(levelSpeciality);
            Assert.AreEqual(_level, levelSpeciality.Level);
            Assert.AreEqual(_speciality, levelSpeciality.Speciality);
        }

        [Test]
        public void AddLevelSpeciality_TwoTime_ShouldNotCreate_NewEntity()
        {
            LevelSpeciality levelSpeciality1 = _controller.Add(_level, _speciality).Value as LevelSpeciality;
            LevelSpeciality levelSpeciality2 = _controller.Add(_level, _speciality).Value as LevelSpeciality;
            
            _levelSpecialityRepository.Refresh(levelSpeciality1);
            _levelSpecialityRepository.Refresh(levelSpeciality2);
            
            Assert.AreEqual(levelSpeciality1, levelSpeciality2);
        }
        
        [Test]
        public void Delete()
        {
            LevelSpeciality levelSpeciality = _controller.Add(_level, _speciality).Value as LevelSpeciality;
            _controller.Delete(levelSpeciality);
            
            Assert.False(_levelSpecialityRepository.Exists(levelSpeciality));
        }
        
    }
}