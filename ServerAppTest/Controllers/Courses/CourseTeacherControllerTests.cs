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
    public class CourseTeacherControllerTests
    {
        private CourseTeacherController _controller;
        private ICourseLevelSpecialityRepository _courseLevelSpecialityRepository;
        private IRepository<Course, long> _courseRepository;
        private IRepository<CourseTeacher, long> _courseTeacherRepository;
        private IRepository<Teacher, long> _teacherRepository;

        private Course _course;
        private Teacher _teacher;

        private AddCourseTeacherForm _form = new AddCourseTeacherForm
        {
            Tutorial = false,
            Lecture = true,
            IsPrincipal = false
        };

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<CourseTeacherController>();
            _courseLevelSpecialityRepository = serviceProvider.GetRequiredService<ICourseLevelSpecialityRepository>();

            _courseRepository = serviceProvider.GetRequiredService<IRepository<Course, long>>();
            _teacherRepository = serviceProvider.GetRequiredService<IRepository<Teacher, long>>();
            _courseTeacherRepository = serviceProvider.GetRequiredService<IRepository<CourseTeacher, long>>();
            
            var departmentRepository = serviceProvider.GetRequiredService<IRepository<Department, long>>();
            var levelRepository = serviceProvider.GetRequiredService<IRepository<Level, long>>();


            Department department = departmentRepository.Save(new Department
            {
                Name = "dept name"
            });
            Level level = levelRepository.Save(new Level {Index = 0, Department = department});

            _course = _courseRepository.Save(new Course
            {
                Level = level,
                Name = "course form",
                Code = "123",
                Coefficient = 1,
                Description = "Course description",
                Radical = 5,
                IsGeneral = false
            });

            _teacher = _teacherRepository.Save(new Teacher
            {
                Department = department,
                UserId = Guid.NewGuid().ToString()
            });
        }

        [Test]
        public void Add()
        {
            CourseTeacher courseTeacher = _controller.Add(_course, _teacher, _form).Value as CourseTeacher;
            
            Assert.NotNull(courseTeacher);
            Assert.True(_courseTeacherRepository.Exists(courseTeacher));
            Assert.AreEqual(courseTeacher.Course, _course);
            Assert.AreEqual(courseTeacher.Teacher, _teacher);
            Assert.AreEqual(courseTeacher.Lecture, _form.Lecture);
            Assert.AreEqual(courseTeacher.Tutorial, _form.Tutorial);
            Assert.AreEqual(courseTeacher.IsPrincipal, _form.IsPrincipal);
        }

        [Test]
        public void Add_CourseTeacher_TwoTime_ShouldThrow()
        {
            _controller.Add(_course, _teacher, _form);

            var ex = Assert.Catch<InvalidOperationException>(() => { _controller.Add(_course, _teacher, _form); });
            
            Assert.AreEqual(ex.Message, "{courseTeacher.constraints.unique}");
        }

        [Test]
        public void Change_TutorialAtTrue_ShouldSetItAtFalse()
        {
            CourseTeacher courseTeacher = _controller.Add(_course, _teacher, _form).Value as CourseTeacher;
            courseTeacher.Tutorial = true;
            _courseTeacherRepository.Update(courseTeacher);

            _controller.Tutorial(courseTeacher);
            _courseTeacherRepository.Refresh(courseTeacher);
            Assert.False(courseTeacher.Tutorial);
        }
        
        [Test]
        public void Change_TutorialAtFalse_ShouldSetItAtTrue()
        {
            CourseTeacher courseTeacher = _controller.Add(_course, _teacher, _form).Value as CourseTeacher;
            courseTeacher.Tutorial = false;
            _courseTeacherRepository.Update(courseTeacher);

            _controller.Tutorial(courseTeacher);
            _courseTeacherRepository.Refresh(courseTeacher);
            Assert.True(courseTeacher.Tutorial);
        }
        
        
        
        [Test]
        public void Change_LectureAtTrue_ShouldSetItAtFalse()
        {
            CourseTeacher courseTeacher = _controller.Add(_course, _teacher, _form).Value as CourseTeacher;
            courseTeacher.Lecture = true;
            _courseTeacherRepository.Update(courseTeacher);

            _controller.Lecture(courseTeacher);
            _courseTeacherRepository.Refresh(courseTeacher);
            Assert.False(courseTeacher.Lecture);
        }
        
        [Test]
        public void Change_LectureAtFalse_ShouldSetItAtTrue()
        {
            CourseTeacher courseTeacher = _controller.Add(_course, _teacher, _form).Value as CourseTeacher;
            courseTeacher.Lecture = false;
            _courseTeacherRepository.Update(courseTeacher);

            _controller.Lecture(courseTeacher);
            _courseTeacherRepository.Refresh(courseTeacher);
            Assert.True(courseTeacher.Lecture);
        }

        [Test]
        public void SetPrincipal_ShouldSetIt_AtTrue()
        {
            CourseTeacher courseTeacher = _controller.Add(_course, _teacher, _form).Value as CourseTeacher;
            _controller.IsPrincipal(courseTeacher);
            _courseTeacherRepository.Refresh(courseTeacher);
            
            Assert.True(courseTeacher.IsPrincipal);
        }
        
    }
}