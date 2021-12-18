using System;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace ServerAppTest.Controllers
{
    public class ExaminationStudentControllerTests
    {
        private ExaminationStudentController _controller;
        private IRepository<ExaminationStudent, long> _examinationStudentRepository;
        private DbContext _dbContext;

        private SemesterDepartment _semesterDepartment;
        private SemesterSpeciality _semesterSpeciality;
        private SemesterLevel _semesterLevel;
        private SemesterLevelSpeciality _semesterLevelSpeciality;
        private SemesterStudent _semesterStudent;

        private ExaminationDepartment _examinationDepartment;
        private ExaminationLevel _examinationLevel;
        private ExaminationSpeciality _examinationSpeciality;
        private ExaminationLevelSpeciality _examinationLevelSpeciality;


        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider services = ServiceConfiguration.BuildServiceProvider();


            _controller = services.GetRequiredService<ExaminationStudentController>();
            _examinationStudentRepository = services.GetRequiredService<IRepository<ExaminationStudent, long>>();
            _dbContext = services.GetRequiredService<DbContext>();

            SchoolBuilder builder = new SchoolBuilder(services);
            School school = builder.CreateSchool();
            Year year = builder.CreateYear(school);
            Semester semester = builder.CreateSemester(year);
            Examination examination = builder.CreateSimpleExamination(semester);

            builder.AddYearStudents(year);
            builder.AddSemesterStudents(semester);

            _semesterDepartment = _dbContext.Set<SemesterDepartment>().First(s => s.Semester.Equals(semester));
            _semesterLevel = _dbContext.Set<SemesterLevel>()
                .First(s => s.SemesterDepartment.Equals(_semesterDepartment));

            _semesterSpeciality = _dbContext.Set<SemesterSpeciality>()
                .First(s => s.SemesterDepartment.Equals(_semesterDepartment));

            _semesterLevelSpeciality = _dbContext.Set<SemesterLevelSpeciality>()
                .First(s => s.SemesterLevel.Equals(_semesterLevel) && s.SemesterSpeciality.Equals(_semesterSpeciality));


            _examinationDepartment = builder.CreateSimpleExaminationDepartment(examination, _semesterDepartment);

            _examinationSpeciality =
                builder.CreateSimpleExaminationSpeciality(_examinationDepartment, _semesterSpeciality);
            _examinationLevel = builder.CreateSimpleExaminationLevel(_examinationDepartment, _semesterLevel);

            _semesterStudent = _dbContext.Set<SemesterStudent>().First(s => s.SemesterLevel.Equals(_semesterLevel));
        }

        [Test]
        public void Add()
        {
            ExaminationStudent examinationStudent =
                _controller._Add(_semesterStudent, _examinationLevel, _examinationLevelSpeciality);

            _examinationStudentRepository.Save(examinationStudent);

            Assert.NotNull(examinationStudent);
            Assert.AreEqual(examinationStudent.ExaminationLevel, _examinationLevel);
            Assert.AreEqual(examinationStudent.ExaminationLevelSpeciality, _examinationLevelSpeciality);

            Assert.AreEqual(examinationStudent.SemesterStudent, _semesterStudent);
        }

        [Test]
        public void Check_If_Add_IsPureMethod_ForExaminationLevel()
        {
            ExaminationStudent examinationStudent = _controller._Add(_semesterStudent, _examinationLevel);
            _examinationStudentRepository.Save(examinationStudent);

            Assert.Throws<DuplicateObjectException>(
                () => _controller._Add(_semesterStudent, _examinationLevel)
            );
        }


        [Test]
        public void Delete()
        {
            ExaminationStudent examinationStudent =
                _controller._Add(_semesterStudent, _examinationLevel, _examinationLevelSpeciality);
            _examinationStudentRepository.Save(examinationStudent);

            _controller.Delete(examinationStudent);
            Assert.False(_examinationStudentRepository.Exists(examinationStudent));
        }
    }
}