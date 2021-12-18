using System;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers.Courses;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Entities.Periods;
using Exam.Models;
using Microsoft.EntityFrameworkCore;
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
        private IRepository<SemesterCourseTeacher, long> _semesterCourseTeacherRepository;
        private IRepository<SemesterTeacher, long> _semesterTeacherRepository;
        private IRepository<YearTeacher, long> _yearTeacherRepository;
        private IRepository<SemesterCourse, long> _semesterCourseRepository;
        private DbContext _dbContext;
        private SchoolBuilder _schoolBuilder;
        

        private Course _course;
        private Room _room;
        private Teacher _teacher;
        private SemesterCourseTeacher _semesterCourseTeacher;
        private Department _department;
        private School _school;
        private Year _year;
        
        private Semester _semester;
        private SemesterLevel _semesterLevel;
        private SemesterDepartment _semesterDepartment;
        private SemesterTeacher _semesterTeacher;
        private SemesterCourse _semesterCourse;

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
            _semesterCourseTeacherRepository = serviceProvider.GetRequiredService<IRepository<SemesterCourseTeacher, long>>();
            _semesterTeacherRepository = serviceProvider.GetRequiredService<IRepository<SemesterTeacher, long>>();
            _yearTeacherRepository = serviceProvider.GetRequiredService<IRepository<YearTeacher, long>>();
            _semesterCourseRepository = serviceProvider.GetRequiredService<IRepository<SemesterCourse, long>>();
            _courseHourRepository = serviceProvider.GetRequiredService<IRepository<CourseHour, long>>();

            _courseRepository = serviceProvider.GetRequiredService<IRepository<Course, long>>();
            _dbContext = serviceProvider.GetRequiredService<DbContext>();
            _schoolBuilder = new SchoolBuilder(serviceProvider);

            _school = _schoolBuilder.CreateSchool();
            _year = _schoolBuilder.CreateYear(_school);
            _semester = _schoolBuilder.CreateSemester(_year);
            _schoolBuilder.AddYearStudents(_year);

            
            _schoolBuilder.AddYearTeachers(_year);
            _schoolBuilder.AddSemesterTeachers(_semester);

            _department = _dbContext.Set<Department>().First(d => d.School.Equals(_school));
            
            _semesterDepartment = _dbContext.Set<SemesterDepartment>().First(ys => ys.YearDepartment.Year.Equals(_year) 
                                                                              && _department.Equals(ys.YearDepartment.Department));
            
            _semesterLevel = _dbContext.Set<SemesterLevel>().First(ys => ys.SemesterDepartment.Equals(_semesterDepartment));
            
            _teacher = _teacherRepository.First(t => t.Department.School.Equals(_school));
            _semesterTeacher = _dbContext.Set<SemesterTeacher>().First(st => 
                st.SemesterDepartment.Equals(_semesterLevel.SemesterDepartment) && _teacher.Equals(st.YearTeacher.Teacher));

            _room = _roomRepository.Save(new Room { School = _school, Name = "room Name"});
            

            _course = _courseRepository.Save(new Course
            {
                Level = _semesterLevel.YearLevel.Level,
                Name = "course form",
                Code = "123",
                Coefficient = 1,
                Description = "Course description",
                Radical = 5,
                IsGeneral = false
            });

            _semesterCourse = _semesterCourseRepository.Save(new SemesterCourse
            {
                Course = _course,
                SemesterLevel = _semesterLevel
            });

            _semesterCourseTeacher = _semesterCourseTeacherRepository.Save(new SemesterCourseTeacher
            {
                SemesterTeacher = _semesterTeacher,
                SemesterCourse = _semesterCourse
            });
        }

        [Test]
        public void Add()
        {
            CourseHour courseHour = _controller.Add(_semesterCourse, _room, _semesterCourseTeacher, _form).Value as CourseHour;
            
            Assert.NotNull(courseHour);
            Assert.True(_courseHourRepository.Exists(courseHour));
            Assert.AreEqual(courseHour.SemesterCourse, _semesterCourse);
            Assert.AreEqual(courseHour.Room, _room);
            Assert.AreEqual(courseHour.SemesterCourseTeacher, _semesterCourseTeacher);
            Assert.AreEqual(courseHour.Lecture, _form.Lecture);
            Assert.AreEqual(courseHour.DayOfWeek, _form.DayOfWeek);
            Assert.AreEqual(courseHour.StartHour, _form.StartHour);
            Assert.AreEqual(courseHour.EndHour, _form.EndHour);
        }

        [Test]
        public void ChangeTeacher()
        {
            CourseHour courseHour = _controller.Add(_semesterCourse, _room, _semesterCourseTeacher, _form).Value as CourseHour;
            Teacher teacher1 = _teacherRepository.Save(new Teacher
            {
                Department = _department,
                UserId = Guid.NewGuid().ToString()
            });
            YearTeacher yearTeacher = _yearTeacherRepository.Save(new YearTeacher
            {
                Teacher = teacher1,
                YearDepartment = _dbContext.Set<YearDepartment>()
                    .First(y => y.Year.Equals(_year) && _department.Equals(y.Department))
            });
            SemesterTeacher semesterTeacher1 = _semesterTeacherRepository.Save(new SemesterTeacher
            {
                YearTeacher = yearTeacher,
                SemesterDepartment = _semesterDepartment
            });

            SemesterCourseTeacher semesterCourseTeacher1 = _semesterCourseTeacherRepository.Save(new SemesterCourseTeacher
            {
                SemesterTeacher = semesterTeacher1,
                SemesterCourse = _semesterCourse
            });

            _controller.Teacher(courseHour, semesterCourseTeacher1);
            _courseHourRepository.Refresh(courseHour);
            
            Assert.AreEqual(semesterCourseTeacher1, courseHour?.SemesterCourseTeacher);
        }

        [Test]
        public void ChangeRoom()
        {
            CourseHour courseHour = _controller.Add(_semesterCourse, _room, _semesterCourseTeacher, _form).Value as CourseHour;
            Room room1 = _roomRepository.Save(new Room { School = _school, Name = "room Name"});

            _controller.Room(courseHour, room1);
            _courseHourRepository.Refresh(courseHour);
            
            Assert.AreEqual(room1, courseHour?.Room);
        }


        [Test]
        public void Change_LectureAtTrue_ShouldSetItAtFalse()
        {
            CourseHour courseHour = _controller.Add(_semesterCourse, _room, _semesterCourseTeacher, _form).Value as CourseHour;
            Assert.NotNull(courseHour);
            
            courseHour.Lecture = true;
            _courseHourRepository.Update(courseHour);

            _controller.Lecture(courseHour);
            _courseHourRepository.Refresh(courseHour);
            Assert.False(courseHour.Lecture);
        }
        
        [Test]
        public void Change_LectureAtFalse_ShouldSetItAtTrue()
        {
            CourseHour courseHour = _controller.Add(_semesterCourse, _room, _semesterCourseTeacher, _form).Value as CourseHour;
            Assert.NotNull(courseHour);
            
            courseHour.Lecture = false;
            _courseHourRepository.Update(courseHour);

            _controller.Lecture(courseHour);
            _courseHourRepository.Refresh(courseHour);
            Assert.True(courseHour.Lecture);
        }
    }
}