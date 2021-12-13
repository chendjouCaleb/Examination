using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Exam.Authorizers;
using Exam.Destructors;
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
    
    [Route("api/semesterCourses")]
    public class SemesterCourseController:Controller
    {
        private DbContext _dbContext;
        private SemesterCourseTeacherController _semesterCourseTeacherController;
        private SemesterCourseLevelSpecialityController _semesterCourseLevelSpecialityController;

        public SemesterCourseController(DbContext dbContext,
            SemesterCourseTeacherController semesterCourseTeacherController,
            SemesterCourseLevelSpecialityController semesterCourseLevelSpecialityController)
        {
            _dbContext = dbContext;
            _semesterCourseTeacherController = semesterCourseTeacherController;
            _semesterCourseLevelSpecialityController = semesterCourseLevelSpecialityController;
        }

        [HttpGet("{semesterCourseId}")]
        public SemesterCourse Get(long semesterCourseId)
        {
           return _dbContext.Set<SemesterCourse>().Include(s => s.Course)
                .First(c => c.Id == semesterCourseId);
        }


        [HttpGet]
        public IEnumerable<SemesterCourse> List([FromQuery] long? courseId, [FromQuery] long? semesterLevelId,
            [FromQuery] long? yearLevelId,
            [FromQuery] long? semesterDepartmentId,
            [FromQuery] long? yearDepartmentId,
            [FromQuery] long? semesterId,
            [FromQuery] long? yearId
            )
        {
            IQueryable<SemesterCourse> query = _dbContext.Set<SemesterCourse>()
                .Include(s => s.Course);

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
            
            if (semesterDepartmentId != null)
            {                
                query = query.Where(s => s.SemesterLevel.SemesterDepartmentId == semesterDepartmentId);
            }
            
            if (yearDepartmentId != null)
            {                
                query = query.Where(s => s.SemesterLevel.SemesterDepartment.YearDepartmentId == yearDepartmentId);
            }

            if (semesterId != null)
            {                
                query = query.Where(s => s.SemesterLevel.SemesterDepartment.SemesterId == semesterId);
            }
            
            if (yearId != null)
            {                
                query = query.Where(s => s.SemesterLevel.SemesterDepartment.YearDepartment.YearId == yearId);
            }

            return query.ToList();
        }

        
        [HttpPost]
        [RequireQueryParameter("courseId")]
        [RequireQueryParameter("semesterLevelId")]
        [LoadCourse(Source = ParameterSource.Query)]
        [LoadSemesterLevel(Source = ParameterSource.Query,DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public CreatedAtActionResult AddCourse(SemesterCourseForm form, Course course, 
            SemesterLevel semesterLevel, [FromQuery] long[]? semesterLevelSpecialityId = null)
        {
            Assert.RequireNonNull(form, nameof(form));
            Assert.RequireNonNull(course, nameof(course));
            Assert.RequireNonNull(semesterLevel, nameof(semesterLevel));

            SemesterCourse semesterCourse = _AddCourse(form, course, semesterLevel);
            _dbContext.Add(semesterCourse);

            if (semesterLevelSpecialityId != null)
            {
                var semesterCourseLevelSpecialities = 
                    _semesterCourseLevelSpecialityController._Add(semesterCourse, semesterLevelSpecialityId);
                _dbContext.AddRange(semesterCourseLevelSpecialities);
            }
            
            _dbContext.SaveChanges();

            return CreatedAtAction("Get", new {semesterCourseId = semesterCourse.Id}, semesterCourse);
        }


        [HttpPost("addAll")]
        [RequireQueryParameter("semesterId")]
        [LoadSemester(SchoolItemName = "school", Source = ParameterSource.Query)]
        [IsDirector]
        public List<SemesterCourse> AddAll(Semester semester)
        {
            Assert.RequireNonNull(semester, nameof(semester));
            List<SemesterCourse> semesterCourses = _AddAll(semester);
            _dbContext.AddRange(semesterCourses);
            _dbContext.SaveChanges();
            
            var semesterCourseLevelSpecialities = _semesterCourseLevelSpecialityController._AddAll(semester);
            _dbContext.AddRange(semesterCourseLevelSpecialities);
            _dbContext.SaveChanges();

            _semesterCourseTeacherController.AddAll(semester);
            
            return semesterCourses;
        }
        
        
        [HttpPost("addAllSemesterDepartment")]
        [RequireQueryParameter("semesterDepartmentId")]
        [LoadSemesterDepartment(Source = ParameterSource.Query, DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public List<SemesterCourse> AddAll(SemesterDepartment semesterDepartment)
        {
            Assert.RequireNonNull(semesterDepartment, nameof(semesterDepartment));
            List<SemesterCourse> semesterCourses = _AddAll(semesterDepartment);
            _dbContext.AddRange(semesterCourses);
            _dbContext.SaveChanges();
            
            var semesterCourseLevelSpecialities = _semesterCourseLevelSpecialityController._AddAll(semesterDepartment);
            _dbContext.AddRange(semesterCourseLevelSpecialities);
            _dbContext.SaveChanges();

            _semesterCourseTeacherController.AddAll(semesterDepartment);
            
            return semesterCourses;
        }
        
        [HttpPost("addAllSemesterLevel")]
        [RequireQueryParameter("semesterLevelId")]
        [LoadSemesterLevel(Source = ParameterSource.Query, DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public List<SemesterCourse> AddAll(SemesterLevel semesterLevel)
        {
            Assert.RequireNonNull(semesterLevel, nameof(semesterLevel));
            List<SemesterCourse> semesterCourses = _AddAll(semesterLevel);
            _dbContext.AddRange(semesterCourses);
            _dbContext.SaveChanges();
            
            var semesterCourseLevelSpecialities = _semesterCourseLevelSpecialityController._AddAll(semesterLevel);
            _dbContext.AddRange(semesterCourseLevelSpecialities);
            _dbContext.SaveChanges();

            _semesterCourseTeacherController.AddAll(semesterLevel);
            
            return semesterCourses;
        }


        [HttpDelete("{semesterCourseId}")]
        [LoadSemesterCourse(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public NoContentResult Delete(SemesterCourse semesterCourse)
        {
            Assert.RequireNonNull(semesterCourse, nameof(semesterCourse));
            SemesterCourseDestructor destructor = new SemesterCourseDestructor(_dbContext);
            destructor.Destroy(semesterCourse);

            _dbContext.SaveChanges();
            return NoContent();
        }


        public bool Contains(Course course, SemesterLevel semesterLevel)
        {
            return _dbContext.Set<SemesterCourse>()
                .Any(sc => course.Equals(sc.Course) && semesterLevel.Equals(sc.SemesterLevel));
        }
        
        public SemesterCourse Find(Course course, SemesterLevel semesterLevel)
        {
            return _dbContext.Set<SemesterCourse>()
                .First(sc => course.Equals(sc.Course) && semesterLevel.Equals(sc.SemesterLevel));
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
            
            List<SemesterCourse> semesterCourses = new List<SemesterCourse>();

            foreach (Course course in courses)
            {
                if (!Contains(course, semesterLevel))
                {
                    semesterCourses.Add(_AddCourse(course, semesterLevel));
                }
            }

            return semesterCourses;
        }
        
        
        public List<SemesterCourse> _AddAll(SemesterDepartment semesterDepartment)
        {
            Assert.RequireNonNull(semesterDepartment, nameof(semesterDepartment));
            List<SemesterLevel> semesterLevels = _dbContext.Set<SemesterLevel>()
                .Where(sl => semesterDepartment.Equals(sl.SemesterDepartment)).ToList();
            
            List<SemesterCourse> semesterCourses = new List<SemesterCourse>();

            foreach (SemesterLevel semesterLevel in semesterLevels)
            {
                semesterCourses.AddRange(_AddAll(semesterLevel));
            }

            return semesterCourses;
        }
        
        
        public SemesterCourse _AddCourse(Course course, SemesterLevel semesterLevel)
        {
            Assert.RequireNonNull(course, nameof(course));
            Assert.RequireNonNull(semesterLevel, nameof(semesterLevel));
            SemesterCourseForm form = new SemesterCourseForm
            {
                Coefficient = course.Coefficient,
                IsGeneral = course.IsGeneral,
                PracticalWork = course.PracticalWork
            };

            return _AddCourse(form, course, semesterLevel);
        }

        public SemesterCourse _AddCourse(SemesterCourseForm form, Course course,
            SemesterLevel semesterLevel)
        {
            Assert.RequireNonNull(form, nameof(form));
            Assert.RequireNonNull(course, nameof(course));
            Assert.RequireNonNull(semesterLevel, nameof(semesterLevel));

            if (!course.Level.Equals(semesterLevel.YearLevel.Level))
            {
                throw new IncompatibleEntityException(course, semesterLevel);
            }

            if (Contains(course, semesterLevel))
            {
                throw new DuplicateObjectException("DUPLICATE_SEMESTER_COURSE");
            }

            SemesterCourse semesterCourse = new SemesterCourse
            {
                Coefficient = form.Coefficient,
                Radical = form.Radical,
                IsGeneral = form.IsGeneral,
                PracticalWork = form.PracticalWork,
                Course = course,
                SemesterLevel = semesterLevel
            };
            return semesterCourse;
        }
    }
}