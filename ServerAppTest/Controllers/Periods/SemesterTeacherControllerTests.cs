using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers.Periods;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Exam.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace ServerAppTest.Controllers.Periods
{
    public class SemesterTeacherTests
    {
        private SemesterTeacherController _controller;
        private YearController _yearController;
        private YearTeacherController _yearTeacherController;
        private SemesterController _semesterController;
        private DbContext _dbContext;
        private IRepository<SemesterTeacher, long> _semesterTeacherRepository;
        private SchoolBuilder _schoolBuilder;

        private YearForm _yearForm = new YearForm
        {
            ExpectedStartDate = DateTime.Now.AddDays(2),
            ExpectedEndDate = DateTime.Now.AddMonths(10)
        };

        private SemesterForm _semesterForm = new SemesterForm
        {
            ExpectedStartDate = DateTime.Now.AddDays(3),
            ExpectedEndDate = DateTime.Now.AddMonths(5)
        };

        private School _school;
        private Year _year;
        private YearDepartment _yearDepartment;
        private SemesterDepartment _semesterDepartment;
        private Semester _semester;
        private Teacher _teacher;

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<SemesterTeacherController>();
            _semesterController = serviceProvider.GetRequiredService<SemesterController>();
            _yearController = serviceProvider.GetRequiredService<YearController>();
            _yearTeacherController = serviceProvider.GetRequiredService<YearTeacherController>();
            _semesterTeacherRepository = serviceProvider.GetRequiredService<IRepository<SemesterTeacher, long>>();
            _dbContext = serviceProvider.GetRequiredService<DbContext>();
            _schoolBuilder = new SchoolBuilder(serviceProvider);

            _school = _schoolBuilder.CreateSchool();
            _year = _yearController.Add(_school, _yearForm).Value as Year;
            _semester = _semesterController.Add(_year, _semesterForm).Value as Semester;
            _teacher = _dbContext.Set<Teacher>().First(t => t.Department.School.Equals(_school));

            _yearDepartment = _dbContext.Set<YearDepartment>().First(yd => yd.DepartmentId == _teacher.DepartmentId);
            _semesterDepartment = _dbContext.Set<SemesterDepartment>()
                .First(sd => sd.YearDepartmentId == _yearDepartment.Id);
        }


        [Test]
        public void AddSemesterTeacher()
        {
            YearTeacher yearTeacher = _yearTeacherController.AddYearTeacher(_teacher, _yearDepartment);
            SemesterTeacher semesterTeacher = _controller._AddSemesterTeacher(yearTeacher, _semesterDepartment);

            Assert.NotNull(semesterTeacher);
            Assert.AreEqual(yearTeacher, semesterTeacher.YearTeacher);
            Assert.AreEqual(_semesterDepartment, semesterTeacher.SemesterDepartment);
        }

        [Test]
        public void AddDuplicateTeacher_ShouldThrow()
        {
            YearTeacher yearTeacher = _yearTeacherController.AddYearTeacher(_teacher, _yearDepartment);
            _controller.AddSemesterTeacher(yearTeacher, _semesterDepartment);
                
             Assert.Throws<DuplicateObjectException>(
                () => _controller.AddSemesterTeacher(yearTeacher, _semesterDepartment)
            );
        }

        [Test]
        public void DeleteSemesterTeacher()
        {
            YearTeacher yearTeacher = _yearTeacherController.AddYearTeacher(_teacher, _yearDepartment);
            SemesterTeacher semesterTeacher = _controller.AddSemesterTeacher(yearTeacher, _semesterDepartment).Value 
                as SemesterTeacher;

            _controller.Delete(semesterTeacher);
            
            Assert.False(_semesterTeacherRepository.Exists(semesterTeacher));
        }
    }
}