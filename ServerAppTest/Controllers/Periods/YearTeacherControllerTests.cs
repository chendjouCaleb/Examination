using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers.Periods;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers.Periods
{
    public class YearTeacherControllerTests
    {
        private YearTeacherController _controller;
        private YearController _yearController;
        private IRepository<Year, long> _yearRepository;
        private IRepository<YearTeacher, long> _yearTeacherRepository;
        private SchoolBuilder _schoolBuilder;
        private DbContext _dbContext;
        private YearForm _yearForm = new YearForm
        {
            ExpectedStartDate = DateTime.Now.AddDays(2),
            ExpectedEndDate = DateTime.Now.AddMonths(10)
        };

        private School _school;
        private Year _year;
        private Teacher _teacher;
        private YearDepartment _yearDepartment;

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<YearTeacherController>();
            _yearController = serviceProvider.GetRequiredService<YearController>();
            _yearRepository = serviceProvider.GetRequiredService<IRepository<Year, long>>();
            _yearTeacherRepository = serviceProvider.GetRequiredService<IRepository<YearTeacher, long>>();
            _dbContext = serviceProvider.GetRequiredService<DbContext>();
            _schoolBuilder = new SchoolBuilder(serviceProvider);

            _school = _schoolBuilder.CreateSchool();
            _year = _yearController.Add(_school, _yearForm).Value as Year;
            
            _teacher = _dbContext.Set<Teacher>().First(t => t.Department.School.Equals(_school));
           _yearDepartment = _dbContext.Set<YearDepartment>().First(yd => yd.DepartmentId == _teacher.DepartmentId);
            
            Assert.NotNull(_teacher);
        }

        
        [Test]
        public void AddYearTeacher()
        {
            YearTeacher yearTeacher = _controller._AddYearTeacher(_teacher, _yearDepartment);
            
            Assert.NotNull(yearTeacher);
            Assert.AreEqual(_teacher, yearTeacher.Teacher);
            Assert.AreEqual(_yearDepartment, yearTeacher.YearDepartment);
        }

        [Test]
        public void NoDuplicateYearTeacher()
        {
            YearTeacher yearTeacher1 = _controller._AddYearTeacher(_teacher, _yearDepartment);
            _controller.DbContext.SaveChanges();
            
           YearTeacher yearTeacher2 = _controller._AddYearTeacher(_teacher, _yearDepartment);
           
           Assert.AreEqual(yearTeacher1, yearTeacher2);
           Assert.AreEqual(yearTeacher1.Id, yearTeacher2.Id);
        }

        [Test]
        public void AddAllYearTeacher()
        {
           List<YearTeacher> yearTeachers = _controller.AddTeachers(_year);
           List<Teacher> teachers = _dbContext.Set<Teacher>().Where(t => t.Department.School.Equals(_school)).ToList();
           Assert.NotNull(yearTeachers);
           
           Assert.AreEqual(teachers.Count, yearTeachers.Count);

           foreach (YearTeacher yearTeacher in yearTeachers)
           {
               Assert.NotNull(yearTeacher);
               Assert.AreEqual(_year, yearTeacher.YearDepartment.Year);
               Assert.AreEqual(_year.School, yearTeacher.YearDepartment.Year.School);
               
               Assert.AreEqual(yearTeacher.YearDepartment.Department, yearTeacher.Teacher.Department);
           }
        }
        
        
        [Test]
        public void DeleteYearTeacher()
        {
            YearTeacher yearTeacher = _controller._AddYearTeacher(_teacher, _yearDepartment);
            _controller.DbContext.SaveChanges();

            _controller.Delete(yearTeacher);
            
            Assert.False(_yearTeacherRepository.Exists(yearTeacher));
        }
    }
}