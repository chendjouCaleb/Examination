using System;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class PrincipalControllerTests
    {
        private PrincipalController _controller;
        private IRepository<Principal, long> _principalRepository;
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


            _controller = serviceProvider.GetRequiredService<PrincipalController>();
            _principalRepository = serviceProvider.GetRequiredService<IRepository<Principal, long>>();
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
            Principal principal = _controller._Add(_department, _userId);

            _principalRepository.Refresh(principal);
            _departmentRepository.Refresh(_department);

            Assert.NotNull(principal);
            Assert.AreEqual(_userId, principal.UserId);
            Assert.AreEqual(_department, principal.Department);
            
            Assert.True(_memberRepository.Exists(principal.Member));
            Assert.AreEqual(_school, principal.Member.School);
            Assert.AreEqual(_userId, principal.Member.UserId);
        }

        [Test]
        public void TryAdd_WithUsedUser_ShouldThrow()
        {
            _controller._Add(_department, _userId);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller._Add(_department, _userId));

            Assert.AreEqual("{principal.constraints.uniqueUserByDepartment}", ex.Message);
        }
        
        
        
        
        [Test]
        public void Delete()
        {
            Principal principal = _controller._Add(_department, _userId);
            _controller.Delete(principal);
            
            _departmentRepository.Refresh(_department);
            
            Assert.False(_principalRepository.Exists(principal));
        }
    }
}