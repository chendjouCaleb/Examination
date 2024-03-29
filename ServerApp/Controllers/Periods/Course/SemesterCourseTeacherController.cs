﻿using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities.Courses;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Loaders.Courses;
using Exam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers.Periods
{
    [Route("api/semesterCourseTeachers")]
    public class SemesterCourseTeacherController : Controller
    {
        private DbContext _dbContext;
        private IRepository<SemesterCourseTeacher, long> _semesterCourseTeacherRepository;

        public SemesterCourseTeacherController(DbContext dbContext,
            IRepository<SemesterCourseTeacher, long> semesterCourseTeacherRepository)
        {
            _dbContext = dbContext;
            _semesterCourseTeacherRepository = semesterCourseTeacherRepository;
        }

        [HttpGet("{semesterCourseTeacherId}")]
        public SemesterCourseTeacher Get(long semesterCourseTeacherId)
        {
            SemesterCourseTeacher semesterCourseTeacher =
                _dbContext.Set<SemesterCourseTeacher>()
                    
                    .Find(semesterCourseTeacherId);
            return semesterCourseTeacher;
        }

        [HttpGet]
        public IEnumerable<SemesterCourseTeacher> List([FromQuery] long? semesterCourseId,
            [FromQuery] long? courseId,
            [FromQuery] long? semesterTeacherId,
            [FromQuery] long? teacherId)
        {
            IQueryable<SemesterCourseTeacher> query = _dbContext.Set<SemesterCourseTeacher>()
                .Include(s => s.SemesterTeacher)
                .ThenInclude(s => s.YearTeacher).ThenInclude(s => s.Teacher)
                .Include(s => s.SemesterCourse);

            if (semesterCourseId != null)
            {
                query = query.Where(s => s.SemesterCourseId == semesterCourseId);
            }

            if (courseId != null)
            {
                query = query.Where(c => c.SemesterCourse.CourseId == courseId);
            }

            if (teacherId != null)
            {
                query = query.Where(c => c.SemesterTeacher.YearTeacher.TeacherId == teacherId);
            }

            if (semesterTeacherId != null)
            {
                query = query.Where(c => c.SemesterTeacherId == semesterTeacherId);
            }

            return query.ToList();
        }


        [HttpPost]
        [RequireQueryParameter("semesterCourseId")]
        [RequireQueryParameter("semesterTeacherId")]
        [LoadSemesterCourse(Source = ParameterSource.Query, DepartmentItemName = "department")]
        [LoadSemesterTeacher(Source = ParameterSource.Query)]
        [IsDepartmentPrincipal]
        [ValidModel]
        public CreatedAtActionResult Add(SemesterCourse semesterCourse, SemesterTeacher semesterTeacher,
            [FromBody] AddSemesterCourseTeacherForm form)
        {
            Assert.RequireNonNull(semesterCourse, nameof(semesterCourse));
            Assert.RequireNonNull(semesterTeacher, nameof(semesterTeacher));
            Assert.RequireNonNull(form, nameof(form));

            SemesterCourseTeacher semesterCourseTeacher = _Add(semesterCourse, semesterTeacher, form);
            _dbContext.Add(semesterCourseTeacher);
            _dbContext.SaveChanges();
            return CreatedAtAction("Get", new {semesterCourseTeacherId = semesterCourseTeacher.IsPrincipal},
                semesterCourseTeacher);
        }

        
        [HttpPost("addAll")]
        [RequireQueryParameter("semesterId")]
        [LoadSemester(Source = ParameterSource.Query, SchoolItemName = "school")]
        [IsDirector]
        public List<SemesterCourseTeacher> AddAll(Semester semester)
        {
            Assert.RequireNonNull(semester, nameof(semester));

            List<CourseTeacher> courseTeachers = _dbContext.Set<CourseTeacher>()
                .Where(ct => ct.Course.Level.Department.School.Equals(semester.Year.School)).ToList();

            List<SemesterTeacher> semesterTeachers = _dbContext.Set<SemesterTeacher>()
                .Where(st => semester.Equals(st.SemesterDepartment.Semester))
                .Include(st => st.SemesterDepartment).ToList();
            
            List<SemesterCourse> semesterCourses = _dbContext.Set<SemesterCourse>()
                .Where(sc => semester.Equals(sc.SemesterLevel.SemesterDepartment.Semester))
                .Include(st => st.SemesterLevel)
                .ThenInclude(sl => sl.SemesterDepartment)
                .ToList();

            var semesterCourseTeachers = _AddAll(courseTeachers, semesterTeachers, semesterCourses);
            _dbContext.AddRange(semesterCourseTeachers);
            _dbContext.SaveChanges();

            return semesterCourseTeachers;
        }
        
        
        [HttpPost("addAll")]
        [RequireQueryParameter("semesterDepartmentId")]
        [LoadSemesterDepartment(Source = ParameterSource.Query, DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public List<SemesterCourseTeacher> AddAll(SemesterDepartment semesterDepartment)
        {
            Assert.RequireNonNull(semesterDepartment, nameof(semesterDepartment));

            List<CourseTeacher> courseTeachers = _dbContext.Set<CourseTeacher>()
                .Where(ct => ct.Course.Level.Department.Equals(semesterDepartment.YearDepartment.Department)).ToList();

            List<SemesterTeacher> semesterTeachers = _dbContext.Set<SemesterTeacher>()
                .Where(st => semesterDepartment.Equals(st.SemesterDepartment))
                .Include(st => st.SemesterDepartment).ToList();
            
            List<SemesterCourse> semesterCourses = _dbContext.Set<SemesterCourse>()
                .Where(sc => semesterDepartment.Equals(sc.SemesterLevel.SemesterDepartment))
                .Include(st => st.SemesterLevel)
                .ThenInclude(sl => sl.SemesterDepartment)
                .ToList();

            var semesterCourseTeachers = _AddAll(courseTeachers, semesterTeachers, semesterCourses);
            
            _dbContext.AddRange(semesterCourseTeachers);
            _dbContext.SaveChanges();

            return semesterCourseTeachers;
        }
        
        
        
        public List<SemesterCourseTeacher> AddAll(SemesterLevel semesterLevel)
        {
            Assert.RequireNonNull(semesterLevel, nameof(semesterLevel));

            List<CourseTeacher> courseTeachers = _dbContext.Set<CourseTeacher>()
                .Where(ct => ct.Course.Level.Equals(semesterLevel.YearLevel.Level)).ToList();

            List<SemesterTeacher> semesterTeachers = _dbContext.Set<SemesterTeacher>()
                .Where(st => semesterLevel.SemesterDepartment.Equals(st.SemesterDepartment))
                .Include(st => st.SemesterDepartment).ToList();
            
            List<SemesterCourse> semesterCourses = _dbContext.Set<SemesterCourse>()
                .Where(sc => semesterLevel.Equals(sc.SemesterLevel))
                .Include(st => st.SemesterLevel)
                .ThenInclude(sl => sl.SemesterDepartment)
                .ToList();

            var semesterCourseTeachers = _AddAll(courseTeachers, semesterTeachers, semesterCourses);
            
            _dbContext.AddRange(semesterCourseTeachers);
            _dbContext.SaveChanges();

            return semesterCourseTeachers;
        }


        public List<SemesterCourseTeacher> _AddAll(List<CourseTeacher> courseTeachers,
            List<SemesterTeacher> semesterTeachers, List<SemesterCourse> semesterCourses)
        {
            Assert.RequireNonNull(semesterTeachers, nameof(semesterTeachers));
            Assert.RequireNonNull(semesterCourses, nameof(semesterCourses));
            Assert.RequireNonNull(courseTeachers, nameof(courseTeachers));
            
            List<SemesterCourseTeacher> semesterCourseTeachers = new List<SemesterCourseTeacher>();

            foreach (var courseTeacher in courseTeachers)
            {
                SemesterTeacher semesterTeacher =
                    semesterTeachers.Find(s => courseTeacher.TeacherId == s.YearTeacher.TeacherId);

                SemesterCourse semesterCourse = semesterCourses.Find(s => s.CourseId == courseTeacher.CourseId);

                if (semesterTeacher != null && semesterCourse != null && !Contains(semesterTeacher, semesterCourse))
                {
                    semesterCourseTeachers.Add(_Add(semesterCourse, semesterTeacher, courseTeacher));
                }
            }

            return semesterCourseTeachers;
        }
        
        

        public SemesterCourseTeacher _Add(SemesterCourse semesterCourse, SemesterTeacher semesterTeacher,
            CourseTeacher courseTeacher)
        {
            AddSemesterCourseTeacherForm form = new AddSemesterCourseTeacherForm
            {
                IsPrincipal = courseTeacher.IsPrincipal,
                Lecture = courseTeacher.Lecture,
                Tutorial = courseTeacher.Tutorial
            };

            return _Add(semesterCourse, semesterTeacher, form);
        }

        public SemesterCourseTeacher _Add(SemesterCourse semesterCourse, SemesterTeacher semesterTeacher,
            AddSemesterCourseTeacherForm form)
        {
            Assert.RequireNonNull(semesterCourse, nameof(semesterCourse));
            Assert.RequireNonNull(semesterTeacher, nameof(semesterTeacher));
            Assert.RequireNonNull(form, nameof(form));
            
            if (Contains(semesterTeacher, semesterCourse))
            {
                throw new DuplicateObjectException("DUPLICATE_OBJECT");
            }

            if (!semesterTeacher.SemesterDepartment.Equals(semesterCourse.SemesterLevel.SemesterDepartment))
            {
                throw new IncompatibleEntityException(semesterCourse, semesterTeacher);
            }

            SemesterCourseTeacher semesterCourseTeacher = _semesterCourseTeacherRepository
                .First(c => semesterCourse.Equals(c.SemesterCourse) && semesterTeacher.Equals(c.SemesterTeacher));

            if (semesterCourseTeacher != null)
            {
                return semesterCourseTeacher;
            }

            semesterCourseTeacher = new SemesterCourseTeacher
            {
                SemesterCourse = semesterCourse,
                SemesterTeacher = semesterTeacher,
                Tutorial = form.Tutorial,
                Lecture = form.Lecture
            };

            if (form.IsPrincipal)
            {
                _RemoveAllPrincipalRole(semesterCourse);
                semesterCourseTeacher.IsPrincipal = true;
            }
            
            return semesterCourseTeacher;
        }

        [HttpPut("{semesterCourseTeacherId}/lecture")]
        [LoadSemesterCourseTeacher(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public StatusCodeResult Lecture(SemesterCourseTeacher semesterCourseTeacher)
        {
            Assert.RequireNonNull(semesterCourseTeacher, nameof(semesterCourseTeacher));
            semesterCourseTeacher.Lecture = !semesterCourseTeacher.Lecture;
            _semesterCourseTeacherRepository.Update(semesterCourseTeacher);

            return Ok();
        }
        
        
        [HttpPut("{semesterCourseTeacherId}/tutorial")]
        [LoadSemesterCourseTeacher(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public StatusCodeResult Tutorial(SemesterCourseTeacher semesterCourseTeacher)
        {
            Assert.RequireNonNull(semesterCourseTeacher, nameof(semesterCourseTeacher));
            semesterCourseTeacher.Tutorial = !semesterCourseTeacher.Tutorial;
            _semesterCourseTeacherRepository.Update(semesterCourseTeacher);

            return Ok();
        }
        

        [HttpPut("{semesterCourseTeacherId}/principal")]
        [LoadSemesterCourseTeacher(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public StatusCodeResult IsPrincipal(SemesterCourseTeacher semesterCourseTeacher)
        {
            Assert.RequireNonNull(semesterCourseTeacher, nameof(semesterCourseTeacher));
            _RemoveAllPrincipalRole(semesterCourseTeacher.SemesterCourse);

            semesterCourseTeacher.IsPrincipal = true;
            _dbContext.Update(semesterCourseTeacher);
            _dbContext.SaveChanges();

            return Ok();
        }

        public SemesterCourseTeacher Find(SemesterTeacher semesterTeacher, SemesterCourse semesterCourse)
        {
            return _semesterCourseTeacherRepository
                .First(c => semesterCourse.Equals(c.SemesterCourse) && semesterTeacher.Equals(c.SemesterTeacher));
        }

        public bool Contains(SemesterTeacher semesterTeacher, SemesterCourse semesterCourse)
        {
            return _semesterCourseTeacherRepository
                .Exists(c => semesterCourse.Equals(c.SemesterCourse) && semesterTeacher.Equals(c.SemesterTeacher));
        }

        private void _RemoveAllPrincipalRole(SemesterCourse semesterCourse)
        {
            Assert.RequireNonNull(semesterCourse, nameof(semesterCourse));
            IList<SemesterCourseTeacher> semesterCourseTeachers = _dbContext.Set<SemesterCourseTeacher>()
                .Where(c => c.SemesterCourseId == semesterCourse.Id).ToArray();

            foreach (var item in semesterCourseTeachers)
            {
                item.IsPrincipal = false;
                _dbContext.Update(item);
            }
        }

        [HttpDelete("{semesterCourseTeacherId}")]
        [LoadSemesterCourseTeacher(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public NoContentResult Delete(SemesterCourseTeacher semesterCourseTeacher, [FromQuery] bool semesterCourseHour,
            [FromQuery] bool semesterCourseSession)
        {
            Assert.RequireNonNull(semesterCourseTeacher, nameof(semesterCourseTeacher));
            _semesterCourseTeacherRepository.Delete(semesterCourseTeacher);
            return NoContent();
        }
    }
}