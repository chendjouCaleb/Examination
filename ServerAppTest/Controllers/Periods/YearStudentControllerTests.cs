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
    public class YearStudentControllerTests
    {
        private YearStudentController _controller;
        private YearController _yearController;
        private IRepository<Year, long> _yearRepository;
        private IRepository<YearDepartment, long> _yearDepartmentRepository;
        private SchoolBuilder _schoolBuilder;
        private DbContext _dbContext;
        private YearForm _yearForm = new YearForm
        {
            ExpectedStartDate = DateTime.Now.AddDays(2),
            ExpectedEndDate = DateTime.Now.AddMonths(10)
        };

        private School _school;
        private Year _year;

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<YearStudentController>();
            _yearController = serviceProvider.GetRequiredService<YearController>();
            _yearRepository = serviceProvider.GetRequiredService<IRepository<Year, long>>();
            _yearDepartmentRepository = serviceProvider.GetRequiredService<IRepository<YearDepartment, long>>();
            _dbContext = serviceProvider.GetRequiredService<DbContext>();
            _schoolBuilder = new SchoolBuilder(serviceProvider);

            _school = _schoolBuilder.CreateSchool();
            _year = _yearController.Add(_school, _yearForm).Value as Year;
        }

        
        [Test]
        public void AddYearStudent()
        {
            Student student = _dbContext.Set<Student>()
                .First(s => s.Level.Department.School.Equals(_school) && s.LevelSpeciality != null);
            YearLevel yearLevel = _dbContext.Set<YearLevel>()
                .First(yl => yl.LevelId == student.LevelId && yl.YearDepartment.YearId == _year.Id);
            
            YearLevelSpeciality yearLevelSpeciality = _dbContext.Set<YearLevelSpeciality>()
                .First(yls => yls.LevelSpecialityId == student.LevelSpecialityId && yls.YearLevel.YearDepartment.YearId == _year.Id);
            
            Assert.NotNull(student);

            YearStudent yearStudent = _controller._AddYearStudent(student, yearLevel, yearLevelSpeciality);
            
            Assert.NotNull(yearStudent);
            Assert.AreEqual(student, yearStudent.Student);
            Assert.AreEqual(yearLevel, yearStudent.YearLevel);
            Assert.AreEqual(yearLevelSpeciality, yearStudent.YearLevelSpeciality);
        }
        
        
        [Test]
        public void AddYearStudentWithoutLevelSpeciality()
        {
            Student student = _dbContext.Set<Student>()
                .First(s => s.Level.Department.School.Equals(_school));
            YearLevel yearLevel = _dbContext.Set<YearLevel>()
                .First(yl => yl.LevelId == student.LevelId && yl.YearDepartment.YearId == _year.Id);
            Assert.NotNull(student);

            YearStudent yearStudent = _controller._AddYearStudent(student, yearLevel);
            
            Assert.NotNull(yearStudent);
            Assert.AreEqual(student, yearStudent.Student);
            Assert.AreEqual(yearLevel, yearStudent.YearLevel);
            Assert.Null(yearStudent.YearLevelSpeciality);
        }


        [Test]
        public void AddAllYearStudent()
        {
           List<YearStudent> yearStudents = _controller.AddStudents(_year);
           List<Student> students = _dbContext.Set<Student>().Where(s => s.Level.Department.School.Equals(_school))
               .ToList();
           Assert.NotNull(yearStudents);
           
           Assert.AreEqual(students.Count, yearStudents.Count);

           foreach (YearStudent yearStudent in yearStudents)
           {
               Assert.NotNull(yearStudent);
               Assert.AreEqual(_year, yearStudent.YearLevel.YearDepartment.Year);
               Assert.AreEqual(_year.School, yearStudent.YearLevel.YearDepartment.Year.School);
               
               Assert.AreEqual(yearStudent.YearLevel.Level, yearStudent.Student.Level);
               Assert.AreEqual(yearStudent?.YearLevelSpeciality?.LevelSpeciality, yearStudent.Student.LevelSpeciality);
           }
        }
    }
}