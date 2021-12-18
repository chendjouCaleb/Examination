using System;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Exam.Entities.Periods;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class ExaminationDepartmentControllerTests
    {
        private ExaminationDepartmentController _controller;
        private IRepository<Examination, long> _examinationRepository;
        private IRepository<School, long> _schoolRepository;
        private IRepository<SemesterDepartment, long> _semesterDepartmentRepository;

        private School _school;
        private SemesterDepartment _semesterDepartment;
        private Examination _examination;


        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<ExaminationDepartmentController>();

            _schoolRepository = serviceProvider.GetRequiredService<IRepository<School, long>>();
            _examinationRepository = serviceProvider.GetRequiredService<IRepository<Examination, long>>();
            _semesterDepartmentRepository = serviceProvider.GetRequiredService<IRepository<SemesterDepartment, long>>();

            _school = _schoolRepository.Save(new School
            {
                Name = "Org name"
            });
            
            SchoolBuilder builder = new SchoolBuilder(serviceProvider);

            _school = builder.CreateSchool();
            Year year = builder.CreateYear(_school);
            Semester semester = builder.CreateSemester(year);

            _semesterDepartment = _semesterDepartmentRepository.First(s => s.Semester.Equals(semester));

            _examination = _examinationRepository.Save(new Examination
            {
                Semester = semester,
                Name = "MATH-L3-2015/2016-S2",
                ExpectedStartDate = DateTime.Now.AddMonths(1),
                ExpectedEndDate = DateTime.Now.AddMonths(3)
            });
        }

        [Test]
        public void Add()
        {
            ExaminationDepartment examinationDepartment = _controller._Add(_examination, _semesterDepartment);

            Assert.NotNull(examinationDepartment);
            Assert.AreEqual(examinationDepartment.Examination, _examination);
            Assert.AreEqual(examinationDepartment.SemesterDepartment, _semesterDepartment);
        }

        [Test]
        public void Check_If_Add_IsPureMethod()
        {
            ExaminationDepartment examinationDepartment1 = _controller._Add(_examination, _semesterDepartment);
            ExaminationDepartment examinationDepartment2 = _controller._Add(_examination, _semesterDepartment);

            Assert.AreEqual(examinationDepartment1, examinationDepartment2);
        }
    }
}