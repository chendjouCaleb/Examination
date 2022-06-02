using System;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers.Courses;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Exceptions;
using Exam.Models;
using Exam.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers.Courses
{
    public class CourseControllerTests
    {
        private CourseController _controller;
        private ICourseLevelSpecialityRepository _courseLevelSpecialityRepository;
        private IRepository<Course, long> _courseRepository;
        private IRepository<Level, long> _levelRepository;
        private IRepository<Speciality, long> _specialityRepository;
        private IRepository<LevelSpeciality, long> _levelSpecialityRepository;

        private LevelSpeciality _levelSpeciality;
        private Level _level;
        private Speciality _speciality;

        private CourseForm _form = new CourseForm
        {
            Name = "course form",
            Code = "123",
            Coefficient = 1,
            Description = "Course description",
            Radical = 5,
            IsGeneral = false
        };

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<CourseController>();
            _courseLevelSpecialityRepository = serviceProvider.GetRequiredService<ICourseLevelSpecialityRepository>();

            _courseRepository = serviceProvider.GetRequiredService<IRepository<Course, long>>();
            _levelRepository = serviceProvider.GetRequiredService<IRepository<Level, long>>();
            _specialityRepository = serviceProvider.GetRequiredService<IRepository<Speciality, long>>();
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
            _levelSpecialityRepository.Refresh(_levelSpeciality);
        }

        [Test]
        public void Add()
        {
            Course course = _controller.Add(_form, _level);

            _courseRepository.Refresh(course);

            Assert.NotNull(course);

            Assert.AreEqual(_form.Name, course.Name);
            Assert.AreEqual(_form.Coefficient, course.Coefficient);
            Assert.AreEqual(_form.Description, course.Description);
            Assert.AreEqual(_form.Name, course.Name);
            Assert.AreEqual(_form.Radical, course.Radical);

            Assert.AreEqual(_level, course.Level);
            Assert.AreEqual(_level.Department, course.Level.Department);
            Assert.AreEqual(_level.Department.School, course.School);
            
            Assert.False(course.MultipleScore);
            Assert.False(course.IsGeneral);
        }

        [Test]
        public void Add_WithCourseLevelSpeciality()
        {
            Course course = _controller.Add(_form, _level, new[] {_levelSpeciality.Id}).Value as Course;

            _courseRepository.Refresh(course);
            Assert.NotNull(course);

            Assert.AreEqual(1, _courseLevelSpecialityRepository.Count(c => course.Equals(c.Course)));
            CourseLevelSpeciality courseLevelSpeciality = course.CourseLevelSpecialities[0];

            Assert.AreEqual(_levelSpeciality, courseLevelSpeciality.LevelSpeciality);
            Assert.AreEqual(course, courseLevelSpeciality.Course);
        }

        [Test]
        public void Set_General_ToTrue_ShouldRemoveAll_CourseSpeciality()
        {
            Course course = _controller.Add(_form, _level, new[] {_levelSpeciality.Id}).Value as Course;

            _controller.General(course);
            _courseRepository.Refresh(course);

            Assert.NotNull(course);
            Assert.True(course.IsGeneral);
            Assert.AreEqual(0, _courseLevelSpecialityRepository.Count(c => course.Equals(c.Course)));
        }

        [Test]
        public void Restrict()
        {
            Course course = _controller.Add(_form, _level);

            _controller.Restrict(course, new[] {_levelSpeciality.Id});

            _courseRepository.Refresh(course);

            Assert.NotNull(course);
            Assert.False(course.IsGeneral);
            
            Assert.AreEqual(1, _courseLevelSpecialityRepository.Count(c => course.Equals(c.Course)));
            CourseLevelSpeciality courseLevelSpeciality = course.CourseLevelSpecialities[0];

            Assert.AreEqual(_levelSpeciality, courseLevelSpeciality.LevelSpeciality);
            Assert.AreEqual(course, courseLevelSpeciality.Course);
        }


        [Test]
        public void Add_WithUsedCode_ShouldThrow()
        {
            _controller.Add(_form, _level);

            Exception ex = Assert.Throws<UniqueValueException>(
                () => _controller.Add(new CourseForm {Code = _form.Code}, _level)
            );

            Assert.AreEqual(ex.Message, "{course.constraints.uniqueCode}");
        }


        [Test]
        public void Edit()
        {
            Course course = _controller.Add(_form, _level);

            CourseForm editForm = new CourseForm
            {
                Code = "A85",
                Name = "New name",
                Description = "Description name",
                Coefficient = 7,
                Radical = 120
            };

            _controller.Edit(course, editForm);
            _courseRepository.Refresh(course);

            Assert.NotNull(course);
            Assert.AreEqual(editForm.Name, course.Name);
            Assert.AreEqual(editForm.Coefficient, course.Coefficient);
            Assert.AreEqual(editForm.Description, course.Description);
            Assert.AreEqual(editForm.Name, course.Name);
            Assert.AreEqual(editForm.Radical, course.Radical);
        }

        [Test]
        public void EditWithSameValue()
        {
            Course course = _controller.Add(_form, _level);
            _controller.Edit(course, _form);
        }


        [Test]
        public void Edit_WithUsedCode_ShouldThrow()
        {
            _controller.Add(_form, _level);
            Course course = _controller.Add(new CourseForm
            {
                Code = "A85",
                Name = "New name",
                Description = "Description name",
                Coefficient = 7,
                Radical = 120
            }, _level);

            Exception ex = Assert.Throws<UniqueValueException>(
                () => _controller.Edit(course, _form)
            );

            Assert.AreEqual(ex.Message, "{course.constraints.uniqueCode}");
        }

        [Test]
        public void Delete()
        {
            Course course = _controller.Add(_form, _level);
            _controller.Delete(course);

            Assert.False(_courseRepository.Exists(course));
        }
    }
}