using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers.Courses;
using Exam.Controllers.Periods;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Exam.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace ServerAppTest.Controllers.Periods
{
    public class SemesterCourseControllerTests
    {
        private SemesterCourseController _controller;
        private SemesterCourseTeacherController _semesterCourseTeacherController;
        private SemesterCourseLevelSpecialityController _semesterCourseLevelSpecialityController;
        private CourseTeacherController _courseTeacherController;
        private IRepository<SemesterCourse, long> _semesterCourseRepository;
        private IRepository<SemesterCourseTeacher, long> _semesterCourseTeacherRepository;
        private IRepository<Course, long> _courseRepository;
        
        private SchoolBuilder _schoolBuilder;
        private DbContext _dbContext;

        private School _school;
        private Year _year;
        private Semester _semester;

        private SemesterLevel _semesterLevel;
        private SemesterLevelSpeciality _semesterLevelSpeciality;
        private Course _course;
        private CourseTeacher _courseTeacher;
        private SemesterTeacher _semesterTeacher;
        private SemesterCourseForm _form = new SemesterCourseForm
        {
            Coefficient = 5,
            IsGeneral = false,
            Radical = 10
        };
        
        AddSemesterCourseTeacherForm _teacherForm = new AddSemesterCourseTeacherForm
        {
            IsPrincipal = false,
            Lecture = true
        };

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();

            _controller = serviceProvider.GetRequiredService<SemesterCourseController>();
            _semesterCourseTeacherController = serviceProvider.GetRequiredService<SemesterCourseTeacherController>();
            _semesterCourseLevelSpecialityController =
                serviceProvider.GetService<SemesterCourseLevelSpecialityController>();
            _courseTeacherController = serviceProvider.GetRequiredService<CourseTeacherController>();
            _semesterCourseRepository = serviceProvider.GetRequiredService<IRepository<SemesterCourse, long>>();
            _semesterCourseTeacherRepository = serviceProvider.GetRequiredService<IRepository<SemesterCourseTeacher, long>>();
            _courseRepository = serviceProvider.GetRequiredService<IRepository<Course, long>>();
            _dbContext = serviceProvider.GetRequiredService<DbContext>();
            _schoolBuilder = new SchoolBuilder(serviceProvider);

            _school = _schoolBuilder.CreateSchool();
            _year = _schoolBuilder.CreateYear(_school);
            _semester = _schoolBuilder.CreateSemester(_year);
            _schoolBuilder.AddYearStudents(_year);

            _schoolBuilder.AddYearTeachers(_year);
            _schoolBuilder.AddSemesterTeachers(_semester);

            _semesterLevel = _dbContext.Set<SemesterLevel>().First(ys => ys.YearLevel.YearDepartment.Year.Equals(_year));
            _semesterLevelSpeciality = _dbContext.Set<SemesterLevelSpeciality>().First(sl => sl.SemesterLevel.Equals(_semesterLevel));
            _semesterTeacher = _dbContext.Set<SemesterTeacher>()
                .First(st => st.SemesterDepartment.Equals(_semesterLevel.SemesterDepartment));

            _course = _courseRepository.Save(new Course
            {
                Code = "1452",
                IsGeneral = true,
                Level = _semesterLevel.YearLevel.Level,
                Coefficient = 5,
                Radical = 50
            });
            
            _courseTeacher = _courseTeacherController.Add(_course, _semesterTeacher.YearTeacher.Teacher, new AddCourseTeacherForm
            {
                IsPrincipal = true,
                Lecture = true,
            }).Value as CourseTeacher;
        }


        [Test]
        public void AddSemesterCourse()
        {
            SemesterCourse semesterCourse = _controller._AddCourse(_course, _semesterLevel);
            
            Assert.NotNull(semesterCourse);
            
            Assert.AreEqual(_semesterLevel, semesterCourse.SemesterLevel);
            Assert.AreEqual(_course, semesterCourse.Course);
            Assert.AreEqual(_course.Coefficient, semesterCourse.Coefficient);
            Assert.AreEqual(_course.IsGeneral, semesterCourse.IsGeneral);
            Assert.AreEqual(_course.Radical, semesterCourse.Radical);
            Assert.AreEqual(_course.PracticalWork, semesterCourse.PracticalWork);
        }
        
        
        [Test]
        public void AddSemesterCourseWithForm()
        {
            SemesterCourse semesterCourse = _controller._AddCourse(_form, _course, _semesterLevel);
            
            Assert.NotNull(semesterCourse);
            
            Assert.AreEqual(_semesterLevel, semesterCourse.SemesterLevel);
            Assert.AreEqual(_course, semesterCourse.Course);
            Assert.AreEqual(_form.Coefficient, semesterCourse.Coefficient);
            Assert.AreEqual(_form.IsGeneral, semesterCourse.IsGeneral);
            Assert.AreEqual(_form.Radical, semesterCourse.Radical);
            Assert.AreEqual(_form.PracticalWork, semesterCourse.PracticalWork);
        }


        [Test]
        public void DuplicateSemesterCourse_ShouldThrow()
        {
            _controller.AddCourse(_form, _course, _semesterLevel);

             Assert.Throws<DuplicateObjectException>(
                () => _controller._AddCourse(_course, _semesterLevel)
            );
        }

        [Test]
        public void AddSemesterCourseTeacher()
        {
            SemesterCourse semesterCourse = _controller.AddCourse(_form, _course, _semesterLevel).Value as SemesterCourse;
            
            SemesterCourseTeacher semesterCourseTeacher = _semesterCourseTeacherController
                .Add(semesterCourse, _semesterTeacher, _teacherForm).Value as SemesterCourseTeacher;
            
            Assert.NotNull(semesterCourseTeacher);
            Assert.AreEqual(semesterCourse, semesterCourseTeacher.SemesterCourse);
            Assert.AreEqual(_semesterTeacher, semesterCourseTeacher.SemesterTeacher);
            Assert.AreEqual(_teacherForm.IsPrincipal, semesterCourseTeacher.IsPrincipal);
            Assert.AreEqual(_teacherForm.Lecture, semesterCourseTeacher.Lecture);
            Assert.AreEqual(!_teacherForm.Lecture, semesterCourseTeacher.Tutorial);
        }

        [Test]
        public void DuplicateSemesterCourseTeacher_ShouldThrow()
        {
            SemesterCourse semesterCourse = _controller.AddCourse(_form, _course, _semesterLevel).Value as SemesterCourse;
            _semesterCourseTeacherController.Add(semesterCourse, _semesterTeacher, _teacherForm);
            
            Assert.Throws<DuplicateObjectException>(
                () => _semesterCourseTeacherController.Add(semesterCourse, _semesterTeacher, _teacherForm)
                );
        }


        [Test]
        public void SetSemesterCourseTeacher_LectureState()
        {
            SemesterCourse semesterCourse = _controller.AddCourse(_form, _course, _semesterLevel).Value as SemesterCourse;
            SemesterCourseTeacher semesterCourseTeacher = _semesterCourseTeacherController
                .Add(semesterCourse, _semesterTeacher, _teacherForm).Value as SemesterCourseTeacher;

            _semesterCourseTeacherController.Lecture(semesterCourseTeacher);
            _semesterCourseTeacherRepository.Refresh(semesterCourseTeacher);
            
            Assert.NotNull(semesterCourseTeacher);
            Assert.False(semesterCourseTeacher.Lecture);
        }


        [Test]
        public void AddCourseLevelSpeciality()
        {
            SemesterCourse semesterCourse = _controller.AddCourse(_form, _course, _semesterLevel).Value as SemesterCourse;

            SemesterCourseLevelSpeciality item = _semesterCourseLevelSpecialityController
                .Add(semesterCourse, _semesterLevelSpeciality).Value as SemesterCourseLevelSpeciality;
            
            
            Assert.NotNull(item);
            
            Assert.AreEqual(_semesterLevelSpeciality, item.SemesterLevelSpeciality);
            Assert.AreEqual(semesterCourse, item.SemesterCourse);

            if (item.CourseLevelSpeciality != null)
            {
                Assert.AreEqual(semesterCourse.Course, item.CourseLevelSpeciality.Course);
                Assert.AreEqual(_semesterLevelSpeciality.YearLevelSpeciality.LevelSpeciality,
                    item.CourseLevelSpeciality.LevelSpeciality);
            }
        }
    }
}