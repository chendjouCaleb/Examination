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
    public class CourseSessionControllerTests
    {
        private CourseSessionController _controller;
        private IRepository<Course, long> _courseRepository;
        private IRepository<Room, long> _roomRepository;
        private IRepository<CourseHour, long> _courseHourRepository;
        private IRepository<CourseSession, long> _courseSessionRepository;
        private IRepository<Teacher, long> _teacherRepository;
        private IRepository<CourseTeacher, long> _courseTeacherRepository;

        private Course _course;
        private CourseHour _courseHour;
        private Room _room;
        private Teacher _teacher;
        private CourseTeacher _courseTeacher;
        private Department _department;
        private School _school;

        private AddCourseSessionForm _form = new AddCourseSessionForm
        {
            ExpectedStartDate = new DateTime(2021, 2, 1, 10, 0, 0),
            ExpectedEndDate = new DateTime(2021, 2, 1, 12, 0, 0),
            Objective = "objective",
            Lecture = true,
        };

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<CourseSessionController>();

            _roomRepository = serviceProvider.GetRequiredService<IRepository<Room, long>>();
            _courseRepository = serviceProvider.GetRequiredService<IRepository<Course, long>>();
            _teacherRepository = serviceProvider.GetRequiredService<IRepository<Teacher, long>>();
            _courseTeacherRepository = serviceProvider.GetRequiredService<IRepository<CourseTeacher, long>>();
            _courseHourRepository = serviceProvider.GetRequiredService<IRepository<CourseHour, long>>();
            _courseSessionRepository = serviceProvider.GetRequiredService<IRepository<CourseSession, long>>();
            
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

            _courseHour = _courseHourRepository.Save(new CourseHour
            {
                Course = _course,
                CourseTeacher = _courseTeacher,
                DayOfWeek = DayOfWeek.Friday,
                StartHour = new TimeSpan(0, 10, 0, 0),
                EndHour = new TimeSpan(0, 12, 0, 0),
                Lecture = true
            });
        }

        [Test]
        public void Add()
        {
            CourseSession courseSession =
                _controller.Add(_course, _courseTeacher, _room, _courseHour.Id, _form).Value as CourseSession;
            
            Assert.NotNull(courseSession);
            Assert.True(_courseSessionRepository.Exists(courseSession));
            Assert.AreEqual(courseSession.Course, _course);
            Assert.AreEqual(courseSession.Room, _room);
            Assert.AreEqual(courseSession.CourseTeacher, _courseTeacher);
            Assert.AreEqual(courseSession.CourseHour, _courseHour);
            Assert.AreEqual(courseSession.Lecture, _form.Lecture);
            Assert.AreEqual(courseSession.ExpectedEndDate, _form.ExpectedEndDate);
            Assert.AreEqual(courseSession.ExpectedStartDate, _form.ExpectedStartDate);
            Assert.AreEqual(courseSession.Objective, _form.Objective);
        }

        [Test]
        public void Add_WithoutCourseHour()
        {
            CourseSession courseSession =
                _controller.Add(_course, _courseTeacher, _room, null, _form).Value as CourseSession;
            
            Assert.NotNull(courseSession);
            Assert.True(_courseSessionRepository.Exists(courseSession));
            Assert.AreEqual(courseSession.Course, _course);
            Assert.AreEqual(courseSession.Room, _room);
            Assert.AreEqual(courseSession.CourseTeacher, _courseTeacher);
            Assert.Null(courseSession.CourseHour);
            Assert.AreEqual(courseSession.Lecture, _form.Lecture);
            Assert.AreEqual(courseSession.ExpectedEndDate, _form.ExpectedEndDate);
            Assert.AreEqual(courseSession.ExpectedStartDate, _form.ExpectedStartDate);
            Assert.AreEqual(courseSession.Objective, _form.Objective);
        }
        
        
        [Test]
        public void ChangeHour()
        {
            CourseSession courseSession =
                _controller.Add(_course, _courseTeacher, _room, _courseHour.Id, _form).Value as CourseSession;

            CourseSessionHourForm hourForm = new CourseSessionHourForm
            {
                ExpectedStartDate = new DateTime(2021, 2, 1, 12, 0, 0),
                ExpectedEndDate = new DateTime(2021, 2, 1, 14, 0, 0),
            };

            _controller.Hour(courseSession, hourForm);
            _courseSessionRepository.Refresh(courseSession);
            
            Assert.NotNull(courseSession);
            Assert.AreEqual(courseSession.ExpectedEndDate, hourForm.ExpectedEndDate);
            Assert.AreEqual(courseSession.ExpectedStartDate, hourForm.ExpectedStartDate);
        }
        
        
        [Test]
        public void Report()
        {
            CourseSession courseSession =
                _controller.Add(_course, _courseTeacher, _room, _courseHour.Id, _form).Value as CourseSession;

            CourseSessionReportForm reportForm = new CourseSessionReportForm
            {
                StartDate = new DateTime(2021, 2, 1, 12, 0, 0),
                EndDate = new DateTime(2021, 2, 1, 14, 0, 0),
                Presence = 10,
                Report = "content"
            };

            _controller.Report(courseSession, reportForm);
            _courseSessionRepository.Refresh(courseSession);
            
            Assert.NotNull(courseSession);
            Assert.AreEqual(courseSession.EndDate, reportForm.EndDate);
            Assert.AreEqual(courseSession.StartDate, reportForm.StartDate);
            Assert.AreEqual(courseSession.Report, reportForm.Report);
            Assert.AreEqual(courseSession.Presence, reportForm.Presence);
        }

        [Test]
        public void ChangeObjective()
        {
            CourseSession courseSession =
                _controller.Add(_course, _courseTeacher, _room, _courseHour.Id, _form).Value as CourseSession;

            string newObjective = "new objective";

            _controller.Objective(courseSession, newObjective);
            _courseSessionRepository.Refresh(courseSession);
            
            Assert.AreEqual(newObjective, courseSession.Objective);
        }
        
        
        [Test]
        public void ChangeTeacher()
        {
            CourseSession courseSession =
                _controller.Add(_course, _courseTeacher, _room, _courseHour.Id, _form).Value as CourseSession;
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

            _controller.Teacher(courseSession, courseTeacher1);
            _courseSessionRepository.Refresh(courseSession);
            
            Assert.AreEqual(courseTeacher1, courseSession.CourseTeacher);
        }

        [Test]
        public void ChangeRoom()
        {
            CourseSession courseSession =
                _controller.Add(_course, _courseTeacher, _room, _courseHour.Id, _form).Value as CourseSession;
            Room room1 = _roomRepository.Save(new Room { School = _school, Name = "room Name"});

            _controller.Room(courseSession, room1);
            _courseSessionRepository.Refresh(courseSession);
            
            Assert.AreEqual(room1, courseSession.Room);
        }
        


        [Test]
        public void Change_LectureAtTrue_ShouldSetItAtFalse()
        {
            CourseSession courseSession =
                _controller.Add(_course, _courseTeacher, _room, _courseHour.Id, _form).Value as CourseSession;
            courseSession.Lecture = true;
            _courseSessionRepository.Update(courseSession);

            _controller.Lecture(courseSession);
            _courseSessionRepository.Refresh(courseSession);
            Assert.False(courseSession.Lecture);
        }
        
        [Test]
        public void Change_LectureAtFalse_ShouldSetItAtTrue()
        {
            CourseSession courseSession =
                _controller.Add(_course, _courseTeacher, _room, _courseHour.Id, _form).Value as CourseSession;
            courseSession.Lecture = false;
            _courseSessionRepository.Update(courseSession);

            _controller.Lecture(courseSession);
            _courseSessionRepository.Refresh(courseSession);
            Assert.True(courseSession.Lecture);
        }
    }
}