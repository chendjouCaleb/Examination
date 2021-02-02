using System;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class SupervisorControllerTests
    {
        private SupervisorController _controller;
        private IRepository<Supervisor, long> _supervisorRepository;
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


            _controller = serviceProvider.GetRequiredService<SupervisorController>();
            _supervisorRepository = serviceProvider.GetRequiredService<IRepository<Supervisor, long>>();
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
            Supervisor supervisor = _controller._Add(_department, _userId);

            _supervisorRepository.Refresh(supervisor);
            _departmentRepository.Refresh(_department);

            Assert.NotNull(supervisor);
            Assert.AreEqual(_userId, supervisor.UserId);
            Assert.AreEqual(_department, supervisor.Department);
            
            Assert.True(_memberRepository.Exists(supervisor.Member));
            Assert.AreEqual(_school, supervisor.Member.School);
            Assert.AreEqual(_userId, supervisor.Member.UserId);
        }

        [Test]
        public void TryAdd_WithUsedUser_ShouldThrow()
        {
            _controller._Add(_department, _userId);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller._Add(_department, _userId));

            Assert.AreEqual("{supervisor.constraints.uniqueUserByDepartment}", ex.Message);
        }
        
        
        
        
        [Test]
        public void Delete()
        {
            Supervisor supervisor = _controller._Add(_department, _userId);
            _controller.Delete(supervisor);
            
            _departmentRepository.Refresh(_department);
            
            Assert.False(_supervisorRepository.Exists(supervisor));
        }
    }
}