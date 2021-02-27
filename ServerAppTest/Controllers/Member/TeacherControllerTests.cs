using System;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class TeacherControllerTests
    {
        private TeacherController _controller;
        private IRepository<Teacher, long> _teacherRepository;
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


            _controller = serviceProvider.GetRequiredService<TeacherController>();
            _teacherRepository = serviceProvider.GetRequiredService<IRepository<Teacher, long>>();
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
            Teacher teacher = _controller._Add(_department, _userId);

            _teacherRepository.Refresh(teacher);
            _departmentRepository.Refresh(_department);

            Assert.NotNull(teacher);
            Assert.AreEqual(_userId, teacher.UserId);
            Assert.AreEqual(_department, teacher.Department);
            
            Assert.True(_memberRepository.Exists(teacher.Member));
            Assert.AreEqual(_school, teacher.Member.School);
            Assert.AreEqual(_userId, teacher.Member.UserId);
        }

        [Test]
        public void TryAdd_WithUsedUser_ShouldThrow()
        {
            _controller._Add(_department, _userId);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller._Add(_department, _userId));

            Assert.AreEqual("{teacher.constraints.uniqueUserByDepartment}", ex.Message);
        }
        
        
        
        
        [Test]
        public void Delete()
        {
            Teacher teacher = _controller._Add(_department, _userId);
            _controller.Delete(teacher);
            
            _departmentRepository.Refresh(_department);
            
            Assert.False(_teacherRepository.Exists(teacher));
        }
    }
}