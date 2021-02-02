using System;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class ExaminationStudentControllerTests
    {
        private ExaminationStudentController _controller;
        private IRepository<ExaminationDepartment, long> _examinationDepartmentRepository;
        private IRepository<ExaminationSpeciality, long> _examinationSpecialityRepository;
        private IRepository<ExaminationLevel, long> _examinationLevelRepository;
        private IRepository<ExaminationLevelSpeciality, long> _examinationLevelSpecialityRepository;
        private IRepository<ExaminationStudent, long> _examinationStudentRepository;
        private IRepository<Department, long> _departmentRepository;
        private IRepository<Speciality, long> _specialityRepository;
        private IRepository<LevelSpeciality, long> _levelSpecialityRepository;
        private IRepository<Level, long> _levelRepository;
        private IRepository<Student, long> _studentRepository;

        private Department _department;
        private Speciality _speciality;
        private Level _level;
        private LevelSpeciality _levelSpeciality;
        private Student _student;
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

            _departmentRepository = services.GetRequiredService<IRepository<Department, long>>();
            _levelRepository = services.GetRequiredService<IRepository<Level, long>>();
            _specialityRepository = services.GetRequiredService<IRepository<Speciality, long>>();
            _levelSpecialityRepository = services.GetRequiredService<IRepository<LevelSpeciality, long>>();
            _studentRepository = services.GetRequiredService<IRepository<Student, long>>();


            _examinationDepartmentRepository = services.GetRequiredService<IRepository<ExaminationDepartment, long>>();
            _examinationSpecialityRepository = services.GetRequiredService<IRepository<ExaminationSpeciality, long>>();
            _examinationLevelRepository = services.GetRequiredService<IRepository<ExaminationLevel, long>>();
            _examinationStudentRepository = services.GetRequiredService<IRepository<ExaminationStudent, long>>();

            _examinationLevelSpecialityRepository =
                services.GetRequiredService<IRepository<ExaminationLevelSpeciality, long>>();

            _department = _departmentRepository.Save(new Department
            {
                Name = "Org name"
            });

            _speciality = _specialityRepository.Save(new Speciality
            {
                Department = _department
            });

            _level = _levelRepository.Save(new Level
            {
                Department = _department
            });

            _levelSpeciality = _levelSpecialityRepository.Save(new LevelSpeciality
            {
                Level = _level,
                Speciality = _speciality
            });

            _student = _studentRepository.Save(new Student
            {
                Level = _level,
                LevelSpeciality = _levelSpeciality,
                FullName = "Chendjou Caleb",
                RegistrationId = "15T2541"
            });

            _examinationDepartment = _examinationDepartmentRepository.Save(new ExaminationDepartment
            {
                Department = _department
            });

            _examinationSpeciality = _examinationSpecialityRepository.Save(new ExaminationSpeciality
            {
                ExaminationDepartment = _examinationDepartment,
                Speciality = _speciality
            });

            _examinationLevel = _examinationLevelRepository.Save(new ExaminationLevel
            {
                ExaminationDepartment = _examinationDepartment,
                Level = _level
            });

            _examinationLevelSpeciality = _examinationLevelSpecialityRepository.Save(new ExaminationLevelSpeciality
            {
                ExaminationLevel = _examinationLevel,
                ExaminationSpeciality = _examinationSpeciality,
                LevelSpeciality = _levelSpeciality
            });
        }

        [Test]
        public void Add()
        {
            ExaminationStudent examinationStudent =
                _controller._Add(_student, _examinationLevel, _examinationLevelSpeciality);

            _examinationStudentRepository.Refresh(examinationStudent);

            Assert.NotNull(examinationStudent);
            Assert.AreEqual(examinationStudent.ExaminationLevel, _examinationLevel);
            Assert.AreEqual(examinationStudent.ExaminationLevelSpeciality, _examinationLevelSpeciality);

            Assert.AreEqual(examinationStudent.Student, _student);
        }

        [Test]
        public void Check_If_Add_IsPureMethod_ForExaminationLevel()
        {
            ExaminationStudent examinationStudent1 =
                _controller._Add(_student, _examinationLevel, _examinationLevelSpeciality);
            ExaminationStudent examinationStudent2 =
                _controller._Add(_student, _examinationLevel, _examinationLevelSpeciality);


            Assert.AreEqual(examinationStudent1, examinationStudent2);
        }


        [Test]
        public void Delete()
        {
            ExaminationStudent examinationStudent =
                _controller._Add(_student, _examinationLevel, _examinationLevelSpeciality);

            _controller.Delete(examinationStudent);
            Assert.False(_examinationStudentRepository.Exists(examinationStudent));
        }
    }
}