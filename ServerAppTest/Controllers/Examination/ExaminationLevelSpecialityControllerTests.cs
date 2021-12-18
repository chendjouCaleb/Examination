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
    public class ExaminationLevelSpecialityControllerTests
    {
        private ExaminationLevelSpecialityController _controller;
        private IRepository<ExaminationLevelSpeciality, long> _examinationLevelSpecialityRepository;
        private DbContext _dbContext;

        private SemesterDepartment _semesterDepartment;
        private SemesterSpeciality _semesterSpeciality;
        private SemesterLevel _semesterLevel;
        private SemesterLevelSpeciality _semesterLevelSpeciality;
        private ExaminationDepartment _examinationDepartment;
        private ExaminationLevel _examinationLevel;
        private ExaminationSpeciality _examinationSpeciality;


        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider services = ServiceConfiguration.BuildServiceProvider();


            _controller = services.GetRequiredService<ExaminationLevelSpecialityController>();
            _dbContext = services.GetRequiredService<DbContext>();

            SchoolBuilder builder = new SchoolBuilder(services);
            School school = builder.CreateSchool();
            Year year = builder.CreateYear(school);
            Semester semester = builder.CreateSemester(year);
            Examination examination = builder.CreateSimpleExamination(semester);

            _examinationLevelSpecialityRepository =
                services.GetRequiredService<IRepository<ExaminationLevelSpeciality, long>>();

            _semesterDepartment = _dbContext.Set<SemesterDepartment>().First(s => s.Semester.Equals(semester));
            _semesterLevel = _dbContext.Set<SemesterLevel>()
                .First(s => s.SemesterDepartment.Equals(_semesterDepartment));

            _semesterSpeciality = _dbContext.Set<SemesterSpeciality>()
                .First(s => s.SemesterDepartment.Equals(_semesterDepartment));
            
            _semesterLevelSpeciality = _dbContext.Set<SemesterLevelSpeciality>()
                .First(s => s.SemesterLevel.Equals(_semesterLevel) && s.SemesterSpeciality.Equals(_semesterSpeciality));

            _semesterLevel = _dbContext.Set<SemesterLevel>()
                .First(s => s.SemesterDepartment.Equals(_semesterDepartment));

            _examinationDepartment = builder.CreateSimpleExaminationDepartment(examination, _semesterDepartment);


            _examinationSpeciality =
                builder.CreateSimpleExaminationSpeciality(_examinationDepartment, _semesterSpeciality);
            _examinationLevel = builder.CreateSimpleExaminationLevel(_examinationDepartment, _semesterLevel);
        }

        [Test]
        public void Add()
        {
            ExaminationLevelSpeciality examinationLevelSpeciality =
                _controller._Add(_examinationLevel, _examinationSpeciality);

            Assert.NotNull(examinationLevelSpeciality);
            Assert.AreEqual(examinationLevelSpeciality.ExaminationLevel, _examinationLevel);
            Assert.AreEqual(examinationLevelSpeciality.SemesterLevelSpeciality, _semesterLevelSpeciality);
            Assert.AreEqual(examinationLevelSpeciality.ExaminationSpeciality, _examinationSpeciality);
        }

        [Test]
        public void Check_If_Add_IsPureMethod()
        {
            ExaminationLevelSpeciality examinationSpeciality =
                _controller._Add(_examinationLevel, _examinationSpeciality);
            _examinationLevelSpecialityRepository.Save(examinationSpeciality);

            Exception ex = Assert.Throws<DuplicateObjectException>(
                () => _controller._Add(_examinationLevel, _examinationSpeciality)
            );
            
            Assert.AreEqual("DUPLICATE_EXAMINATION_LEVEL_SPECIALITY", ex.Message);
        }


        [Test]
        public void Delete()
        {
            ExaminationLevelSpeciality examinationLevelSpeciality =
                _controller._Add(_examinationLevel, _examinationSpeciality);

            _examinationLevelSpecialityRepository.Save(examinationLevelSpeciality);

            _controller.Delete(examinationLevelSpeciality);

            Assert.False(_examinationLevelSpecialityRepository.Exists(examinationLevelSpeciality));
        }
    }
}