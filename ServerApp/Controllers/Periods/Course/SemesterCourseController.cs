using System.Collections.Generic;
using System.Linq;
using Exam.Destructors;
using Exam.Entities.Courses;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Exam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers.Periods
{
    
    [Route("api/semesterCourses")]
    public class SemesterCourseController:Controller
    {
        private DbContext _dbContext;

        public SemesterCourseController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("{semesterCourseId}")]
        public SemesterCourse Get(long semesterCourseId)
        {
           return _dbContext.Set<SemesterCourse>().Include(s => s.Course)
                .First(c => c.Id == semesterCourseId);
        }


        [HttpGet]
        IEnumerable<SemesterCourse> List([FromQuery] long? courseId, [FromQuery] long? semesterLevelId,
            [FromQuery] long? yearLevelId)
        {
            IQueryable<SemesterCourse> query = _dbContext.Set<SemesterCourse>().Include(s => s.Course);

            if (semesterLevelId != null)
            {
                query = query.Where(s => s.SemesterLevelId == semesterLevelId);
            }

            if (courseId != null)
            {                
                query = query.Where(s => s.CourseId == courseId);
            }
            
            if (yearLevelId != null)
            {                
                query = query.Where(s => s.SemesterLevel.YearLevelId == yearLevelId);
            }

            return query.ToList();
        }


        public List<SemesterCourse> AddAll(Semester semester)
        {
            List<SemesterCourse> semesterCourses = _AddAll(semester);
            _dbContext.SaveChanges();

            return semesterCourses;
        }


        public NoContentResult Delete(SemesterCourse semesterCourse)
        {
            Assert.RequireNonNull(semesterCourse, nameof(semesterCourse));
            SemesterCourseDestructor destructor = new SemesterCourseDestructor(_dbContext);
            destructor.Destroy(semesterCourse);

            _dbContext.SaveChanges();
            return NoContent();
        }
        
        
        
        
        
        public List<SemesterCourse> _AddAll(Semester semester)
        {
            List<SemesterLevel> semesterLevels = _dbContext.Set<SemesterLevel>()
                .Where(sl => semester.Equals(sl.SemesterDepartment.Semester)).ToList();
            
            List<SemesterCourse> semesterCourses = new List<SemesterCourse>();

            foreach (SemesterLevel semesterLevel in semesterLevels)
            {
                semesterCourses.AddRange(_AddAll(semesterLevel));
            }

            return semesterCourses;
        }


        public List<SemesterCourse> _AddAll(SemesterLevel semesterLevel)
        {
            List<Course> courses = _dbContext.Set<Course>()
                .Where(c => c.Level.Equals(semesterLevel.YearLevel.Level))
                .ToList();

            return courses.ConvertAll(c => _AddCourse(c, semesterLevel));
        }
        
        
        public SemesterCourse _AddCourse(Course course, SemesterLevel semesterLevel)
        {
            Assert.RequireNonNull(course, nameof(course));
            Assert.RequireNonNull(semesterLevel, nameof(semesterLevel));
            SemesterCourseForm form = new SemesterCourseForm
            {
                Coefficient = course.Coefficient,
                Radical = course.Radical,
                IsGeneral = course.IsGeneral,
            };

            return _AddCourse(form, course, semesterLevel);
        }

        public SemesterCourse _AddCourse(SemesterCourseForm form, Course course, SemesterLevel semesterLevel)
        {
            Assert.RequireNonNull(form, nameof(form));
            Assert.RequireNonNull(course, nameof(course));
            Assert.RequireNonNull(semesterLevel, nameof(semesterLevel));

            if (!course.Level.Equals(semesterLevel.YearLevel.Level))
            {
                throw new IncompatibleEntityException(course, semesterLevel);
            }

            SemesterCourse semesterCourse = _dbContext.Set<SemesterCourse>()
                .First(sc => course.Equals(sc.Course) && semesterLevel.Equals(sc.SemesterLevel));

            if (semesterCourse != null)
            {
                return semesterCourse;
            }

            semesterCourse = new SemesterCourse
            {
                Coefficient = form.Coefficient,
                Radical = form.Radical,
                IsGeneral = form.IsGeneral,
                Course = course,
                SemesterLevel = semesterLevel
            };

            _dbContext.Add(semesterCourse);

            return semesterCourse;
        }
    }
}