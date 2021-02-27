using System;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers.Courses;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers.Courses
{
    public class CourseLevelSpecialityControllerTests
    {
        private CourseLevelSpecialityController _controller;
        private ICourseLevelSpecialityRepository _courseLevelSpecialityRepository;
        private IRepository<Course, long> _courseRepository;
        private IRepository<Level, long> _levelRepository;
        private IRepository<Speciality, long> _specialityRepository;
        private IRepository<LevelSpeciality, long> _levelSpecialityRepository;

        private LevelSpeciality _levelSpeciality;
        private Level _level;
        private Speciality _speciality;
        private Course _course;


        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<CourseLevelSpecialityController>();

            _courseRepository = serviceProvider.GetRequiredService<IRepository<Course, long>>();
            _courseLevelSpecialityRepository = serviceProvider.GetRequiredService<ICourseLevelSpecialityRepository>();
            _specialityRepository = serviceProvider.GetRequiredService<IRepository<Speciality, long>>();
            _levelRepository = serviceProvider.GetRequiredService<IRepository<Level, long>>();
            _levelSpecialityRepository = serviceProvider.GetRequiredService<IRepository<LevelSpeciality, long>>();
            var departmentRepository = serviceProvider.GetRequiredService<IRepository<Department, long>>();


            Department department = departmentRepository.Save(new Department
            {
                Name = "dept name"
            });
            _level = _levelRepository.Save(new Level {Index = 0, Department = department});
            _speciality = _specialityRepository.Save(new Speciality {Name = "Name"});
            _levelSpeciality = _levelSpecialityRepository.Save(new LevelSpeciality
            {
                Level = _level,
                Speciality = _speciality
            });

            _course = _courseRepository.Save(new Course
            {
                Name = "course form",
                Code = "123",
                Coefficient = 1,
                Radical = 5,
                Level = _level
            });
        }

        [Test]
        public void Add()
        {
            CourseLevelSpeciality courseLevelSpeciality = _controller.Add(_course, _levelSpeciality);

            _courseLevelSpecialityRepository.Refresh(courseLevelSpeciality);
            Assert.NotNull(courseLevelSpeciality);

            Assert.AreEqual(_levelSpeciality, courseLevelSpeciality.LevelSpeciality);
            Assert.AreEqual(_course, courseLevelSpeciality.Course);
        }


        [Test]
        public void Edit_WithUsedCode_ShouldThrow()
        {
            _course.IsGeneral = true;
            _courseRepository.Update(_course);

            Exception ex = Assert.Throws<InvalidOperationException>(
                () => _controller.Add(_course, _levelSpeciality)
            );

            Assert.AreEqual(ex.Message, "{courseLevelSpeciality.constraints.isNotGeneralCourse}");
        }

        [Test]
        public void Delete()
        {
            CourseLevelSpeciality courseLevelSpeciality = _controller.Add(_course, _levelSpeciality);

            _controller.Delete(courseLevelSpeciality);

            Assert.False(_courseLevelSpecialityRepository.Exists(courseLevelSpeciality));
        }
    }
}