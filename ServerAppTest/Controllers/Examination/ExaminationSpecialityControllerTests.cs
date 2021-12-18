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
    public class ExaminationSpecialityControllerTests
    {
        private ExaminationSpecialityController _controller;
        private IRepository<ExaminationDepartment, long> _examinationDepartmentRepository;
        private IRepository<ExaminationSpeciality, long> _examinationSpecialityRepository;
        private IRepository<SemesterDepartment, long> _semesterDepartmentRepository;
        private IRepository<SemesterSpeciality, long> _semesterSpecialityRepository;

        private SemesterDepartment _semesterDepartment;
        private SemesterSpeciality _semesterSpeciality;
        private ExaminationDepartment _examinationDepartment;


        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider services = ServiceConfiguration.BuildServiceProvider();


            _controller = services.GetRequiredService<ExaminationSpecialityController>();

            _semesterDepartmentRepository = services.GetRequiredService<IRepository<SemesterDepartment, long>>();
            _examinationDepartmentRepository = services.GetRequiredService<IRepository<ExaminationDepartment, long>>();
            _examinationSpecialityRepository = services.GetRequiredService<IRepository<ExaminationSpeciality, long>>();
            _semesterSpecialityRepository = services.GetRequiredService<IRepository<SemesterSpeciality, long>>();
            
            
            SchoolBuilder builder = new SchoolBuilder(services);
            School school = builder.CreateSchool();
            Year year = builder.CreateYear(school);
            Semester semester = builder.CreateSemester(year);
            Examination examination = builder.CreateSimpleExamination(semester);

            _semesterDepartment = _semesterDepartmentRepository.First(s => s.Semester.Equals(semester));
            _semesterSpeciality = _semesterSpecialityRepository.First(l => l.SemesterDepartment.Equals(_semesterDepartment));
            _examinationDepartment = _examinationDepartmentRepository.Save(new ExaminationDepartment
            {
                SemesterDepartment = _semesterDepartment,
                Examination = examination
            });
        }

        [Test]
        public void Add()
        {
            ExaminationSpeciality examinationSpeciality = _controller._Add(_examinationDepartment, _semesterSpeciality);

            Assert.NotNull(examinationSpeciality);
            Assert.AreEqual(examinationSpeciality.ExaminationDepartment, _examinationDepartment);
            Assert.AreEqual(examinationSpeciality.SemesterSpeciality, _semesterSpeciality);
        }

        [Test]
        public void Check_If_Add_IsPureMethod()
        {
            ExaminationSpeciality examinationSpeciality  = _controller._Add(_examinationDepartment, _semesterSpeciality);
            _examinationSpecialityRepository.Save(examinationSpeciality);
            
            Assert.Throws<DuplicateObjectException>(
               () => _controller._Add(_examinationDepartment, _semesterSpeciality));
        }


        [Test]
        public void Delete()
        {
            ExaminationSpeciality examinationSpeciality = _controller._Add(_examinationDepartment, _semesterSpeciality);
            _examinationSpecialityRepository.Save(examinationSpeciality);
            
            _controller.Delete(examinationSpeciality);

            Assert.False(_examinationSpecialityRepository.Exists(examinationSpeciality));
        }
    }
}