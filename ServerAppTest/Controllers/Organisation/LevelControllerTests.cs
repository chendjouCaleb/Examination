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
    public class LevelControllerTests
    {
        private LevelController _controller;
        private IRepository<Department, long> _departmentRepository;
        private IRepository<Level, long> _levelRepository;

        private Department _department;

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<LevelController>();

            _departmentRepository = serviceProvider.GetRequiredService<IRepository<Department, long>>();
            _levelRepository = serviceProvider.GetRequiredService<IRepository<Level, long>>();

            _department = _departmentRepository.Save(new Department
            {
                Name = "Department"
            });
        }

        [Test]
        public void Add()
        {
            Level level = _controller.Add(_department);

            _levelRepository.Refresh(level);

            Assert.NotNull(level);
            Assert.AreEqual(0, level.Index);
            Assert.AreEqual(_department, level.Department);
        }

        [Test]
        public void CheckIfTheIndexOfLevelIsSize_OfDepartmentLevelList()
        {
            _controller.Add(_department);
            _controller.Add(_department);
            Level level = _controller.Add(_department);
            Assert.AreEqual(2, level.Index);
        }
        
        [Test]
        public void Delete()
        {
            Level level = _controller.Add(_department);
            _controller.Delete(level);
            
            Assert.False(_levelRepository.Exists(level));
        }

        [Test]
        public void TryDelete_NonLastLevel_ShowThrow()
        {
            Level level = _controller.Add(_department);
            _controller.Add(_department);

            Exception ex = Assert.Throws<InvalidOperationException>(
                () => _controller.Delete(level)
            );

            Assert.AreEqual("{level.constraints.DeleteOnlyLastLevel}", ex.Message);
        }
    }
}