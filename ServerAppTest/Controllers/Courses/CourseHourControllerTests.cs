using System;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers.Courses;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Models;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers.Courses
{
    public class CourseHourControllerTests
    {
        private CourseHourController _controller;
        private IRepository<Course, long> _courseRepository;
        private IRepository<Room, long> _roomRepository;
        private IRepository<CourseHour, long> _courseHourRepository;
        private IRepository<Teacher, long> _teacherRepository;
        private IRepository<CourseTeacher, long> _courseTeacherRepository;

        private Course _course;
        private Room _room;
        private Teacher _teacher;
        private CourseTeacher _courseTeacher;
        private Department _department;
        private School _school;

        private AddCourseHourForm _form = new AddCourseHourForm
        {
            DayOfWeek = DayOfWeek.Friday,
            StartHour = new TimeSpan(0, 10, 0, 0),
            EndHour = new TimeSpan(0, 12, 0, 0),
            Lecture = true
        };

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<CourseHourController>();

            _roomRepository = serviceProvider.GetRequiredService<IRepository<Room, long>>();
            _courseRepository = serviceProvider.GetRequiredService<IRepository<Course, long>>();
            _teacherRepository = serviceProvider.GetRequiredService<IRepository<Teacher, long>>();
            _courseTeacherRepository = serviceProvider.GetRequiredService<IRepository<CourseTeacher, long>>();
            _courseHourRepository = serviceProvider.GetRequiredService<IRepository<CourseHour, long>>();
            
            var departmentRepository = serviceProvider.GetRequiredService<IRepository<Department, long>>();
            var schoolRepository = serviceProvider.GetRequiredService<IRepository<School, long>>();
            var levelRepository = serviceProvider.GetRequiredService<IRepository<Level, long>>();

            _school = schoolRepository.Save(new School { Name = "s"});
            _department = departmentRepository.Save(new Department
            {
                School = _school,
                Name = "dept name"
            });

            _room = _roomRepository.Save(new Room { School = _school, Name = "room Name"});
            Level level = levelRepository.Save(new Level {Index = 0, Department = _department});

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
                Department = _department,
                UserId = Guid.NewGuid().ToString()
            });

            _courseTeacher = _courseTeacherRepository.Save(new CourseTeacher
            {
                Teacher = _teacher,
                Course = _course
            });
        }

        [Test]
        public void Add()
        {
            CourseHour courseHour = _controller.Add(_course, _room, _courseTeacher, _form).Value as CourseHour;
            
            Assert.NotNull(courseHour);
            Assert.True(_courseHourRepository.Exists(courseHour));
            Assert.AreEqual(courseHour.Course, _course);
            Assert.AreEqual(courseHour.Room, _room);
            Assert.AreEqual(courseHour.CourseTeacher, _courseTeacher);
            Assert.AreEqual(courseHour.Lecture, _form.Lecture);
            Assert.AreEqual(courseHour.DayOfWeek, _form.DayOfWeek);
            Assert.AreEqual(courseHour.StartHour, _form.StartHour);
            Assert.AreEqual(courseHour.EndHour, _form.EndHour);
        }

        [Test]
        public void ChangeTeacher()
        {
            CourseHour courseHour = _controller.Add(_course, _room, _courseTeacher, _form).Value as CourseHour;
            Teacher teacher1 = _teacherRepository.Save(new Teacher
            {
                Department = _department,
                UserId = Guid.NewGuid().ToString()
            });

            CourseTeacher courseTeacher1 = _courseTeacherRepository.Save(new CourseTeacher
            {
                Teacher = teacher1,
                Course = _course
            });

            _controller.Teacher(courseHour, courseTeacher1);
            _courseHourRepository.Refresh(courseHour);
            
            Assert.AreEqual(courseTeacher1, courseHour.CourseTeacher);
        }

        [Test]
        public void ChangeRoom()
        {
            CourseHour courseHour = _controller.Add(_course, _room, _courseTeacher, _form).Value as CourseHour;
            Room room1 = _roomRepository.Save(new Room { School = _school, Name = "room Name"});

            _controller.Room(courseHour, room1);
            _courseHourRepository.Refresh(courseHour);
            
            Assert.AreEqual(room1, courseHour.Room);
        }


        [Test]
        public void Change_LectureAtTrue_ShouldSetItAtFalse()
        {
            CourseHour courseHour = _controller.Add(_course, _room, _courseTeacher, _form).Value as CourseHour;
            courseHour.Lecture = true;
            _courseHourRepository.Update(courseHour);

            _controller.Lecture(courseHour);
            _courseHourRepository.Refresh(courseHour);
            Assert.False(courseHour.Lecture);
        }
        
        [Test]
        public void Change_LectureAtFalse_ShouldSetItAtTrue()
        {
            CourseHour courseHour = _controller.Add(_course, _room, _courseTeacher, _form).Value as CourseHour;
            courseHour.Lecture = false;
            _courseHourRepository.Update(courseHour);

            _controller.Lecture(courseHour);
            _courseHourRepository.Refresh(courseHour);
            Assert.True(courseHour.Lecture);
        }
    }
}