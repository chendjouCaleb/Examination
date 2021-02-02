using System;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class CorrectorControllerTests
    {
        private CorrectorController _controller;
        private IRepository<Corrector, long> _correctorRepository;
        private IRepository<Department, long> _departmentRepository;
        private IRepository<School, long> _schoolRepository;
        private IRepository<Member, long> _memberRepository;
        

        private string _userId = Guid.NewGuid().ToString();
        private Department _department;
        private School _school;
        

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<CorrectorController>();
            _correctorRepository = serviceProvider.GetRequiredService<IRepository<Corrector, long>>();
            _departmentRepository = serviceProvider.GetRequiredService<IRepository<Department, long>>();
            _memberRepository = serviceProvider.GetRequiredService<IRepository<Member, long>>();
            _schoolRepository = serviceProvider.GetRequiredService<IRepository<School, long>>();

            _school = _schoolRepository.Save(new School {Name = "School Name"});
            _department = _departmentRepository.Save(new Department 
            {
                Name = "Dept Name",
                School = _school
            });
            
        }

        [Test]
        public void Add()
        {
            Corrector corrector = _controller._Add(_department, _userId);

            _correctorRepository.Refresh(corrector);
            _departmentRepository.Refresh(_department);

            Assert.NotNull(corrector);
            Assert.AreEqual(_userId, corrector.UserId);
            Assert.AreEqual(_department, corrector.Department);
            
            Assert.True(_memberRepository.Exists(corrector.Member));
            Assert.AreEqual(_school, corrector.Member.School);
            Assert.AreEqual(_userId, corrector.Member.UserId);
        }

        [Test]
        public void TryAdd_WithUsedUser_ShouldThrow()
        {
            _controller._Add(_department, _userId);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller._Add(_department, _userId));

            Assert.AreEqual("{corrector.constraints.uniqueUserByDepartment}", ex.Message);
        }
        
        
        
        
        [Test]
        public void Delete()
        {
            Corrector corrector = _controller._Add(_department, _userId);
            _controller.Delete(corrector);
            
            _departmentRepository.Refresh(_department);
            
            Assert.False(_correctorRepository.Exists(corrector));
        }
    }
}