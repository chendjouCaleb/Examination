using System;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class PlannerControllerTests
    {
        private PlannerController _controller;
        private IRepository<Planner, long> _plannerRepository;
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


            _controller = serviceProvider.GetRequiredService<PlannerController>();
            _plannerRepository = serviceProvider.GetRequiredService<IRepository<Planner, long>>();
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
            Planner planner = _controller._Add(_school, _userId);

            _plannerRepository.Refresh(planner);
            _departmentRepository.Refresh(_department);

            Assert.NotNull(planner);
            Assert.AreEqual(_userId, planner.UserId);
            Assert.AreEqual(_school, planner.School);
            
            Assert.True(_memberRepository.Exists(planner.Member));
            Assert.AreEqual(_school, planner.Member.School);
            Assert.AreEqual(_userId, planner.Member.UserId);
        }

        [Test]
        public void TryAdd_WithUsedUser_ShouldThrow()
        {
            _controller._Add(_school, _userId);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller._Add(_school, _userId));

            Assert.AreEqual("{planner.constraints.uniqueUserBySchool}", ex.Message);
        }
        
        
        [Test]
        public void Delete()
        {
            Planner planner = _controller._Add(_school, _userId);
            _controller.Delete(planner);
            
            _departmentRepository.Refresh(_department);
            
            Assert.False(_plannerRepository.Exists(planner));
        }
    }
}