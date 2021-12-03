using System;
using System.Collections.Generic;
using System.Linq;
using Exam.Controllers.Periods;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace ServerAppTest.Controllers.Periods
{
    public class SemesterStudentControllerTests
    {
        private SemesterStudentController _controller;
        private SchoolBuilder _schoolBuilder;
        private DbContext _dbContext;

        private School _school;
        private Year _year;
        private Semester _semester;

        private SemesterLevel _semesterLevel;
        private YearStudent _yearStudent;

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();

            _controller = serviceProvider.GetRequiredService<SemesterStudentController>();
            _dbContext = serviceProvider.GetRequiredService<DbContext>();
            _schoolBuilder = new SchoolBuilder(serviceProvider);

            _school = _schoolBuilder.CreateSchool();
            _year = _schoolBuilder.CreateYear(_school);
            _semester = _schoolBuilder.CreateSemester(_year);
            _schoolBuilder.AddYearStudents(_year);

            _semesterLevel = _dbContext.Set<SemesterLevel>().First(ys => ys.YearLevel.YearDepartment.Year.Equals(_year));

            _yearStudent = _dbContext.Set<YearStudent>().First(ys => ys.YearLevel.Equals(_semesterLevel.YearLevel));
        }


        [Test]
        public void AddSemesterStudent()
        {
            SemesterStudent semesterStudent = _controller._AddSemesterStudent(_yearStudent, _semesterLevel);

            Assert.NotNull(semesterStudent);
            Assert.AreEqual(_yearStudent, semesterStudent.YearStudent);
            Assert.AreEqual(_semesterLevel, semesterStudent.SemesterLevel);
            Assert.Null(semesterStudent.SemesterLevelSpeciality);
        }


        [Test]
        public void DuplicateSemesterStudent_ShouldThrow()
        {
            _controller.AddSemesterStudent(_yearStudent, _semesterLevel);

             Assert.Throws<DuplicateObjectException>(
                () => _controller.AddSemesterStudent(_yearStudent, _semesterLevel)
            );
        }


        [Test]
        public void AddYearStudentWithSemesterLevelSpeciality()
        {
            SemesterLevelSpeciality semesterLevelSpeciality = _dbContext.Set<SemesterLevelSpeciality>()
                .First(s => _semesterLevel.Equals(s.SemesterLevel));

            SemesterStudent semesterStudent =
                _controller._AddSemesterStudent(_yearStudent, _semesterLevel, semesterLevelSpeciality);

            Assert.NotNull(semesterStudent);
            Assert.AreEqual(_yearStudent, semesterStudent.YearStudent);
            Assert.AreEqual(_semesterLevel, semesterStudent.SemesterLevel);
            Assert.AreEqual(semesterLevelSpeciality, semesterStudent.SemesterLevelSpeciality);
        }

        [Test]
        public void ChangeSemesterLevelSpeciality()
        {
            SemesterLevelSpeciality semesterLevelSpeciality = _dbContext.Set<SemesterLevelSpeciality>()
                .First(s => _semesterLevel.Equals(s.SemesterLevel));

            SemesterStudent semesterStudent =
                _controller.AddSemesterStudent(_yearStudent, _semesterLevel).Value as SemesterStudent;

            _controller.ChangeSpeciality(semesterStudent, semesterLevelSpeciality);

            Assert.NotNull(semesterStudent);
            Assert.AreEqual(semesterLevelSpeciality, semesterStudent.SemesterLevelSpeciality);
        }


        [Test]
        public void AddAllYearStudent()
        {
            List<SemesterStudent> semesterStudents = _controller.AddStudents(_semester);
            List<Student> students = _dbContext.Set<Student>().Where(s => s.Level.Department.School.Equals(_school))
                .ToList();

            List<YearStudent> yearStudents = _dbContext.Set<YearStudent>()
                .Where(ys => ys.YearLevel.YearDepartment.Year.School.Equals(_school))
                .ToList();

            Assert.NotNull(semesterStudents);

            Assert.AreEqual(students.Count, semesterStudents.Count);

            foreach (SemesterStudent semesterStudent in semesterStudents)
            {
                Assert.NotNull(semesterStudent);
                Assert.AreEqual(_semester, semesterStudent.SemesterLevel.SemesterDepartment.Semester);
            }
        }
        
        
        [Test]
        public void AddAllYearStudent_ShouldNotDuplicate()
        {
            SemesterStudent semesterStudent = _controller.AddSemesterStudent(_yearStudent, _semesterLevel).Value as SemesterStudent;
            List<SemesterStudent> semesterStudents = _controller.AddStudents(_semester);
            List<Student> students = _dbContext.Set<Student>().Where(s => s.Level.Department.School.Equals(_school))
                .ToList();

            Assert.NotNull(semesterStudents);
            Assert.NotNull(semesterStudent);

            Assert.AreEqual(students.Count - 1, semesterStudents.Count);
            
            Assert.False(semesterStudents.Any(s => s.YearStudent.Equals(semesterStudent.YearStudent)));

        }
    }
}