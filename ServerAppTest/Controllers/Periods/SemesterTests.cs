using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers.Periods;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Models;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers.Periods
{
    public class SemesterTests
    {
        private SemesterController _controller;
        private YearController _yearController;
        private IRepository<Semester, long> _semesterRepository;
        private IRepository<Year, long> _yearRepository;
        private IRepository<SemesterDepartment, long> _semesterDepartmentRepository;
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

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<SemesterController>();
            _yearController = serviceProvider.GetRequiredService<YearController>();
            _semesterRepository = serviceProvider.GetRequiredService<IRepository<Semester, long>>();
            _yearRepository = serviceProvider.GetRequiredService<IRepository<Year, long>>();
            _semesterDepartmentRepository = serviceProvider.GetRequiredService<IRepository<SemesterDepartment, long>>();
            _schoolBuilder = new SchoolBuilder(serviceProvider);
        }

        [Test]
        public void CreateSemester()
        {
            School school = _schoolBuilder.CreateSchool();
            Year year = _yearController.Add(school, _yearForm).Value as Year;

            Semester semester = _controller.Add(year, _semesterForm).Value as Semester;
            _semesterRepository.Refresh(semester);
            
            Assert.IsNotNull(semester);
            Assert.AreEqual(_semesterForm.ExpectedStartDate, semester.ExpectedStartDate);
            Assert.AreEqual(_semesterForm.ExpectedEndDate, semester.ExpectedEndDate);
            Assert.IsNull(semester.StartDate);
            Assert.IsNull(semester.EndDate);

            IList<SemesterDepartment> semesterDepartments = _semesterDepartmentRepository.List(yd => yd.SemesterId == semester.Id);
            Assert.AreEqual(school.Departments.Count, semester.SemesterDepartments.Count);

            foreach (SemesterDepartment semesterDepartment in semesterDepartments)
            {
                Assert.AreEqual(year, semesterDepartment.YearDepartment.Year);
                Assert.AreEqual(semester, semesterDepartment.Semester);
                
                Assert.AreEqual(semesterDepartment.YearDepartment.YearLevels.Count, semesterDepartment.SemesterLevels.Count);
                Assert.AreEqual(semesterDepartment.YearDepartment.YearSpecialities.Count, semesterDepartment.SemesterSpecialities.Count);

                foreach (SemesterLevel semesterLevel in semesterDepartment.SemesterLevels)
                {
                    Assert.AreEqual(semesterDepartment, semesterLevel.SemesterDepartment);
                    Assert.AreEqual(semesterDepartment.YearDepartment, semesterLevel.SemesterDepartment.YearDepartment);
                    
                    Assert.AreEqual(semesterLevel.YearLevel.YearLevelSpecialities.Count, semesterLevel.SemesterLevelSpecialities.Count);

                    foreach (var semesterLevelSpeciality in semesterLevel.SemesterLevelSpecialities)
                    {
                        Assert.AreEqual(semesterLevel, semesterLevelSpeciality.SemesterLevel);
                        Assert.AreEqual(semesterLevel.YearLevel, semesterLevelSpeciality.YearLevelSpeciality.YearLevel);
                    }
                }
                
                foreach (SemesterSpeciality semesterSpeciality in semesterDepartment.SemesterSpecialities)
                {
                    Assert.AreEqual(semesterDepartment, semesterSpeciality.SemesterDepartment);
                    Assert.AreEqual(semesterDepartment.YearDepartment, semesterSpeciality.YearSpeciality.YearDepartment);
                    
                    Assert.AreEqual(semesterSpeciality.YearSpeciality.YearLevelSpecialities.Count, semesterSpeciality.SemesterLevelSpecialities.Count);
                    
                    foreach (var semesterLevelSpeciality in semesterSpeciality.SemesterLevelSpecialities)
                    {
                        Assert.AreEqual(semesterSpeciality, semesterLevelSpeciality.SemesterSpeciality);
                        Assert.AreEqual(semesterSpeciality.YearSpeciality, semesterLevelSpeciality.YearLevelSpeciality.YearSpeciality);
                    }
                }
            }
        }
    }
}