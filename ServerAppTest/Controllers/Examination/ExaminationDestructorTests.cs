using System;
using System.Linq;
using Exam.Controllers;
using Exam.Destructors;
using Exam.Entities;
using Exam.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class ExaminationDestructorTests
    {
        private IServiceProvider _serviceProvider;
        private DbContext _dbContext;

        private readonly ExaminationForm _model = new ExaminationForm
        {
            Name = "MATH-L3-2015/2016-S2",
            ExpectedStartDate = DateTime.Now.AddMonths(1),
            ExpectedEndDate = DateTime.Now.AddMonths(3)
        };


        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            _serviceProvider = ServiceConfiguration.BuildServiceProvider();
            _dbContext = _serviceProvider.GetRequiredService<DbContext>();
        }


        [Test]
        public void Add()
        {
            SchoolBuilder schoolBuilder = new SchoolBuilder(_serviceProvider);
            School school = schoolBuilder.CreateSchool();

            ExaminationBuilder examinationBuilder = new ExaminationBuilder(_serviceProvider);
            Examination examination = examinationBuilder.Create(school, _model);

            ExaminationDestructor examinationDestructor = new ExaminationDestructor(_serviceProvider);
            examinationDestructor.Destroy(examination);

            Assert.False(_dbContext.Set<Examination>().Contains(examination));
            CheckDepartments(examination);
            CheckLevels(examination);
            CheckSpecialities(examination);
            CheckLevelSpecialities(examination);
            CheckStudents(examination);

            Console.WriteLine($"{examinationDestructor.Progression}: {examinationDestructor.Total}");
            Assert.AreEqual(examinationBuilder.Examination.School, school);
            Assert.AreEqual(2 + 4 + 4 + 8 + 60 + 1, examinationDestructor.Total);
            Assert.AreEqual(examinationDestructor.Total, examinationDestructor.Progression);
        }

        private void CheckDepartments(Examination examination)
        {
            int count = _dbContext.Set<ExaminationDepartment>().Count(e => e.Examination.Equals(examination));
            Assert.AreEqual(0, count);
        }

        private void CheckLevels(Examination examination)
        {
            int count = _dbContext.Set<ExaminationLevel>()
                .Count(e => e.ExaminationDepartment.Examination.Equals(examination));

            Assert.AreEqual(0, count);
        }

        private void CheckSpecialities(Examination examination)
        {
            int count = _dbContext.Set<ExaminationSpeciality>()
                .Count(e => e.ExaminationDepartment.Examination.Equals(examination));

            Assert.AreEqual(0, count);
        }

        private void CheckLevelSpecialities(Examination examination)
        {
            int count = _dbContext.Set<ExaminationLevelSpeciality>()
                .Count(e => e.ExaminationLevel.ExaminationDepartment.Examination.Equals(examination));

            Assert.AreEqual(0, count);
        }

        private void CheckStudents(Examination examination)
        {
            int count = _dbContext.Set<ExaminationStudent>()
                .Count(e => e.ExaminationLevel.ExaminationDepartment.Examination.Equals(examination));

            Assert.AreEqual(0, count);
        }
    }
}