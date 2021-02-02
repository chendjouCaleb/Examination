using System;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class SecretaryControllerTests
    {
        private SecretaryController _controller;
        private IRepository<Secretary, long> _secretaryRepository;
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


            _controller = serviceProvider.GetRequiredService<SecretaryController>();
            _secretaryRepository = serviceProvider.GetRequiredService<IRepository<Secretary, long>>();
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
            Secretary secretary = _controller._Add(_department, _userId);

            _secretaryRepository.Refresh(secretary);
            _departmentRepository.Refresh(_department);

            Assert.NotNull(secretary);
            Assert.AreEqual(_userId, secretary.UserId);
            Assert.AreEqual(_department, secretary.Department);
            
            Assert.True(_memberRepository.Exists(secretary.Member));
            Assert.AreEqual(_school, secretary.Member.School);
            Assert.AreEqual(_userId, secretary.Member.UserId);
        }

        [Test]
        public void TryAdd_WithUsedUser_ShouldThrow()
        {
            _controller._Add(_department, _userId);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller._Add(_department, _userId));

            Assert.AreEqual("{secretary.constraints.uniqueUserByDepartment}", ex.Message);
        }
        
        
        
        
        [Test]
        public void Delete()
        {
            Secretary secretary = _controller._Add(_department, _userId);
            _controller.Delete(secretary);
            
            _departmentRepository.Refresh(_department);
            
            Assert.False(_secretaryRepository.Exists(secretary));
        }
    }
}