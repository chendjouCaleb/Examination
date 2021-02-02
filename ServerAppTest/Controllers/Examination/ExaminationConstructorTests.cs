using System;
using Exam.Controllers;
using Exam.Entities;
using Exam.Models;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class ExaminationConstructorTests
    {
        private IServiceProvider _serviceProvider;

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
            
        }


        [Test]
        public void Add()
        {
            SchoolBuilder schoolBuilder = new SchoolBuilder(_serviceProvider);
            School school = schoolBuilder.CreateSchool();
            
            ExaminationBuilder examinationBuilder = new ExaminationBuilder(_serviceProvider);
            examinationBuilder.Create(school, _model);

            checkDepartments(examinationBuilder);
            checkLevels(examinationBuilder);
            checkSpecialities(examinationBuilder);
            checkLevelSpecialities(examinationBuilder);
            checkStudents(examinationBuilder);
            
            Assert.AreEqual(examinationBuilder.Examination.School, school);
            Assert.AreEqual(2+4+4+8+60, examinationBuilder.Total);
            Assert.True( 0.99 <= examinationBuilder.Progression && examinationBuilder.Progression <= 1);
        }

        private void checkDepartments(ExaminationBuilder builder)
        {
            Assert.AreEqual(2, builder.ExaminationDepartments.Count);
            builder.ExaminationDepartments.ForEach(e => { Assert.AreEqual(builder.Examination, e.Examination); });
        }

        private void checkLevels(ExaminationBuilder builder)
        {
            Assert.AreEqual(4, builder.ExaminationLevels.Count);
            builder.ExaminationLevels.ForEach(e =>
            {
                Assert.AreEqual(builder.Examination, e.ExaminationDepartment.Examination);
            });
        }

        private void checkSpecialities(ExaminationBuilder builder)
        {
            Assert.AreEqual(4, builder.ExaminationSpecialities.Count);
            builder.ExaminationSpecialities.ForEach(e =>
            {
                Assert.AreEqual(builder.Examination, e.ExaminationDepartment.Examination);
            });
        }
        
        private void checkLevelSpecialities(ExaminationBuilder builder)
        {
            Assert.AreEqual(8, builder.ExaminationLevelSpecialities.Count);
            builder.ExaminationLevelSpecialities.ForEach(e =>
            {
                Assert.AreEqual(builder.Examination, e.ExaminationLevel.ExaminationDepartment.Examination);
            });
        }

        private void checkStudents(ExaminationBuilder builder)
        {
            Assert.AreEqual(60, builder.ExaminationStudents.Count);

            foreach (var examinationStudent in builder.ExaminationStudents)
            {
                Assert.AreEqual(builder.Examination, examinationStudent.ExaminationLevel.ExaminationDepartment.Examination);
                Assert.NotNull(examinationStudent.ExaminationLevel);    
                if (examinationStudent.Student.LevelSpeciality == null)
                {
                    Assert.Null(examinationStudent.ExaminationLevelSpeciality);
                }
            }
        }
    }
}