using System;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace ServerAppTest.Controllers
{
    public class ExaminationLevelControllerTests
    {
        private ExaminationLevelController _controller;
        private IRepository<ExaminationDepartment, long> _examinationDepartmentRepository;
        private IRepository<ExaminationLevel, long> _examinationLevelRepository;
        private IRepository<SemesterDepartment, long> _semesterDepartmentRepository;
        private IRepository<SemesterLevel, long> _semesterLevelRepository;

        private SemesterDepartment _semesterDepartment;
        private SemesterLevel _semesterLevel;
        private ExaminationDepartment _examinationDepartment;


        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider services = ServiceConfiguration.BuildServiceProvider();


            _controller = services.GetRequiredService<ExaminationLevelController>();

            _semesterDepartmentRepository = services.GetRequiredService<IRepository<SemesterDepartment, long>>();
            _examinationDepartmentRepository = services.GetRequiredService<IRepository<ExaminationDepartment, long>>();
            _examinationLevelRepository = services.GetRequiredService<IRepository<ExaminationLevel, long>>();
            _semesterLevelRepository = services.GetRequiredService<IRepository<SemesterLevel, long>>();
            
            
            SchoolBuilder builder = new SchoolBuilder(services);
            School school = builder.CreateSchool();
            Year year = builder.CreateYear(school);
            Semester semester = builder.CreateSemester(year);
            Examination examination = builder.CreateSimpleExamination(semester);

            _semesterDepartment = _semesterDepartmentRepository.First(s => s.Semester.Equals(semester));
            _semesterLevel = _semesterLevelRepository.First(l => l.SemesterDepartment.Equals(_semesterDepartment));
            _examinationDepartment = _examinationDepartmentRepository.Save(new ExaminationDepartment
            {
                SemesterDepartment = _semesterDepartment,
                Examination = examination
            });
        }

        [Test]
        public void Add()
        {
            ExaminationLevel examinationLevel = _controller._Add(_examinationDepartment, _semesterLevel);

            Assert.NotNull(examinationLevel);
            Assert.AreEqual(examinationLevel.ExaminationDepartment, _examinationDepartment);
            Assert.AreEqual(examinationLevel.SemesterLevel, _semesterLevel);
        }

        [Test]
        public void Check_If_Add_IsPureMethod()
        {
            ExaminationLevel examinationLevel  = _controller._Add(_examinationDepartment, _semesterLevel);
            _examinationLevelRepository.Save(examinationLevel);
            
            Assert.Throws<DuplicateObjectException>(
               () => _controller._Add(_examinationDepartment, _semesterLevel));
        }


        [Test]
        public void Delete()
        {
            ExaminationLevel examinationLevel = _controller._Add(_examinationDepartment, _semesterLevel);
            _examinationLevelRepository.Save(examinationLevel);
            
            _controller.Delete(examinationLevel);

            Assert.False(_examinationLevelRepository.Exists(examinationLevel));
        }
    }
}