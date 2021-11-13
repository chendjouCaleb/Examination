using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Controllers.Periods;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Models;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers.Periods
{
    public class YearTests
    {
        private YearController _controller;
        private IRepository<Year, long> _yearRepository;
        private IRepository<YearDepartment, long> _yearDepartmentRepository;
        private SchoolBuilder _schoolBuilder;
        private YearForm _yearForm = new YearForm
        {
            ExpectedStartDate = DateTime.Now.AddDays(2),
            ExpectedEndDate = DateTime.Now.AddMonths(10)
        };

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<YearController>();
            _yearRepository = serviceProvider.GetRequiredService<IRepository<Year, long>>();
            _yearDepartmentRepository = serviceProvider.GetRequiredService<IRepository<YearDepartment, long>>();
            _schoolBuilder = new SchoolBuilder(serviceProvider);
        }

        [Test]
        public void CreateYear()
        {
            School school = _schoolBuilder.CreateSchool();

            Year year = _controller.Add(school, _yearForm).Value as Year;
            _yearRepository.Refresh(year);
            
            Assert.IsNotNull(year);
            Assert.AreEqual(_yearForm.ExpectedStartDate, year.ExpectedStartDate);
            Assert.AreEqual(_yearForm.ExpectedEndDate, year.ExpectedEndDate);
            Assert.IsNull(year.StartDate);
            Assert.IsNull(year.EndDate);

            IList<YearDepartment> yearDepartments = _yearDepartmentRepository.List(yd => yd.YearId == year.Id);
            Assert.AreEqual(school.Departments.Count, year.YearDepartments.Count);

            foreach (YearDepartment yearDepartment in yearDepartments)
            {
                Assert.AreEqual(school, yearDepartment.Department.School);
                Assert.AreEqual(year, yearDepartment.Year);
                
                Assert.AreEqual(yearDepartment.Department.Levels.Count, yearDepartment.YearLevels.Count);
                Assert.AreEqual(yearDepartment.Department.Specialities.Count, yearDepartment.YearSpecialities.Count);

                foreach (YearLevel yearLevel in yearDepartment.YearLevels)
                {
                    Assert.AreEqual(yearDepartment, yearLevel.YearDepartment);
                    Assert.AreEqual(yearDepartment.Department, yearLevel.Level.Department);
                    
                    Assert.AreEqual(yearLevel.Level.LevelSpecialities.Count, yearLevel.YearLevelSpecialities.Count);

                    foreach (var yearLevelSpeciality in yearLevel.YearLevelSpecialities)
                    {
                        Assert.AreEqual(yearLevel, yearLevelSpeciality.YearLevel);
                        Assert.AreEqual(yearLevel.Level, yearLevelSpeciality.LevelSpeciality.Level);
                    }
                }
                
                foreach (YearSpeciality yearSpeciality in yearDepartment.YearSpecialities)
                {
                    Assert.AreEqual(yearDepartment, yearSpeciality.YearDepartment);
                    Assert.AreEqual(yearDepartment.Department, yearSpeciality.Speciality.Department);
                    
                    Assert.AreEqual(yearSpeciality.Speciality.LevelSpecialities.Count, yearSpeciality.YearLevelSpecialities.Count);
                    
                    foreach (var yearLevelSpeciality in yearSpeciality.YearLevelSpecialities)
                    {
                        Assert.AreEqual(yearSpeciality, yearLevelSpeciality.YearSpeciality);
                        Assert.AreEqual(yearSpeciality.Speciality, yearLevelSpeciality.LevelSpeciality.Speciality);
                    }
                }
            }
        }
    }
}