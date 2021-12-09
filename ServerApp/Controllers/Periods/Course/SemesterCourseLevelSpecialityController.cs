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
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers.Periods
{
    
    [Route("api/semesterCourseLevelSpecialities")]
    public class SemesterCourseLevelSpecialityController:Controller
    {
        private DbContext _dbContext;

        public SemesterCourseLevelSpecialityController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet("{semesterCourseLevelSpecialityId}")]
        public SemesterCourseLevelSpeciality Get(long semesterCourseLevelSpecialityId)
        {
            return _dbContext.Set<SemesterCourseLevelSpeciality>()
                .Include(s => s.SemesterCourse)
                .ThenInclude(s => s.Course)
                .First(s => s.Id == semesterCourseLevelSpecialityId);
        }

        [HttpGet]
        IEnumerable<SemesterCourseLevelSpeciality> List([FromQuery] long? semesterCourseId,
            [FromQuery] long? semesterLevelSpecialityId,
            [FromQuery] long? yearLevelSpecialityId
        )
        {
            IQueryable<SemesterCourseLevelSpeciality> query = _dbContext.Set<SemesterCourseLevelSpeciality>()
                .Include(s => s.SemesterCourse)
                .ThenInclude(s => s.Course);

            if (semesterCourseId != null)
            {
                query = query.Where(s => s.SemesterCourseId == semesterCourseId);
            }
            
            if (semesterLevelSpecialityId != null)
            {
                query = query.Where(s => s.SemesterLevelSpecialityId == semesterLevelSpecialityId);
            }
            
            if (yearLevelSpecialityId != null)
            {
                query = query.Where(s => s.SemesterLevelSpeciality.YearLevelSpecialityId == yearLevelSpecialityId);
            }

            return query.ToList();
        }


        [HttpPost]
        [RequireQueryParameter("semesterCourseId")]
        [RequireQueryParameter("semesterLevelSpecialityId")]
        [LoadSemesterCourse(DepartmentItemName = "department")]
        [LoadSemesterLevelSpeciality(Source = ParameterSource.Query)]
        [IsDepartmentPrincipal]
        public CreatedAtActionResult Add(SemesterCourse semesterCourse,
            SemesterLevelSpeciality semesterLevelSpeciality)
        {
            Assert.RequireNonNull(semesterCourse, nameof(semesterCourse));
            Assert.RequireNonNull(semesterLevelSpeciality, nameof(semesterLevelSpeciality));

            SemesterCourseLevelSpeciality courseLevelSpeciality = _Add(semesterCourse, semesterLevelSpeciality);
            _dbContext.Add(courseLevelSpeciality);
            _dbContext.SaveChanges();

            return CreatedAtAction("Get", new {semesterCourseLevelSpecialityId = courseLevelSpeciality.Id}, courseLevelSpeciality);
        }

        public List<SemesterCourseLevelSpeciality> AddAll(Semester semester)
        {
            var semesterCourseLevelSpecialities = _AddAll(semester);
            _dbContext.AddRange(semesterCourseLevelSpecialities);
            _dbContext.SaveChanges();

            return semesterCourseLevelSpecialities;
        }


        [HttpDelete("{semesterCourseLevelSpecialityId}")]
        [LoadSemesterCourseLevelSpeciality(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public NoContentResult Delete(SemesterCourseLevelSpeciality semesterCourseLevelSpeciality)
        {
            Assert.RequireNonNull(semesterCourseLevelSpeciality, nameof(semesterCourseLevelSpeciality));
            var destructor = new SemesterCourseLevelSpecialityDestructor(_dbContext);
            
            destructor.Destroy(semesterCourseLevelSpeciality);
            _dbContext.SaveChanges();

            return NoContent();
        }
        

        public List<SemesterCourseLevelSpeciality> _AddAll(Semester semester)
        {
            List<CourseLevelSpeciality> courseLevelSpecialities = _dbContext.Set<CourseLevelSpeciality>()
                .Where(s => s.LevelSpeciality.Level.Department.School.Equals(semester.Year.School))
                .ToList();

            IEnumerable<SemesterCourse> semesterCourses = _dbContext.Set<SemesterCourse>()
                .Where(s => s.SemesterLevel.SemesterDepartment.Semester.Equals(semester));
            
            List<SemesterLevelSpeciality> semesterLevelSpecialities = _dbContext.Set<SemesterLevelSpeciality>()
                .Where(s => s.SemesterLevel.SemesterDepartment.Semester.Equals(semester)).ToList();

            return _AddAll(courseLevelSpecialities, semesterCourses, semesterLevelSpecialities);
        }

        public List<SemesterCourseLevelSpeciality> _AddAll(SemesterLevel semesterLevel)
        {
            List<CourseLevelSpeciality> courseLevelSpecialities = _dbContext.Set<CourseLevelSpeciality>()
                .Where(s => s.LevelSpeciality.Level.Equals(semesterLevel.YearLevel.Level))
                .ToList();

            List<SemesterCourse> semesterCourses = _dbContext.Set<SemesterCourse>()
                .Where(s => s.SemesterLevel.Equals(semesterLevel)).ToList();
            
            List<SemesterLevelSpeciality> semesterLevelSpecialities = _dbContext.Set<SemesterLevelSpeciality>()
                .Where(s => s.SemesterLevel.Equals(semesterLevel)).ToList();

            return _AddAll(courseLevelSpecialities, semesterCourses, semesterLevelSpecialities);
        }

        public List<SemesterCourseLevelSpeciality> _AddAll(IEnumerable<CourseLevelSpeciality> courseLevelSpecialities,
            IEnumerable<SemesterCourse> semesterCourses, IEnumerable<SemesterLevelSpeciality> semesterLevelSpecialities)
        {
            var semesterCourseLevelSpecialities = new List<SemesterCourseLevelSpeciality>();
            
            foreach (CourseLevelSpeciality courseLevelSpeciality in courseLevelSpecialities)
            {
                SemesterCourse semesterCourse = _dbContext.Set<SemesterCourse>()
                    .FirstOrDefault(s => s.Course.Equals(courseLevelSpeciality.Course));

                SemesterLevelSpeciality semesterLevelSpeciality = _dbContext.Set<SemesterLevelSpeciality>()
                    .FirstOrDefault(s => s.SemesterLevel.Equals(semesterCourse.SemesterLevel) 
                                && s.YearLevelSpeciality.LevelSpeciality.Equals(courseLevelSpeciality.LevelSpeciality));

                if (semesterCourse != null && semesterLevelSpeciality != null &&
                    !Contains(semesterCourse, semesterLevelSpeciality))
                {
                    semesterCourseLevelSpecialities.Add(_Add(semesterCourse, semesterLevelSpeciality));
                } 
            }

            return semesterCourseLevelSpecialities;
        }


        public SemesterCourseLevelSpeciality _Add(SemesterCourse semesterCourse,
            SemesterLevelSpeciality semesterLevelSpeciality)
        {
            Assert.RequireNonNull(semesterCourse, nameof(semesterCourse));
            Assert.RequireNonNull(semesterLevelSpeciality, nameof(semesterLevelSpeciality));

            if (Contains(semesterCourse, semesterLevelSpeciality))
            {
                throw new DuplicateObjectException("DUPLICATE_SEMESTER_COURSE_LEVEL_SPECIALITY");
            }

            if (!semesterCourse.SemesterLevel.Equals(semesterLevelSpeciality.SemesterLevel))
            {
                throw new IncompatibleEntityException(semesterCourse, semesterLevelSpeciality);
            }

            CourseLevelSpeciality courseLevelSpeciality = _dbContext.Set<CourseLevelSpeciality>()
                .FirstOrDefault(c => c.Course.Equals(semesterCourse.Course) &&
                            c.LevelSpeciality.Equals(semesterLevelSpeciality.YearLevelSpeciality.LevelSpeciality));

            SemesterCourseLevelSpeciality item = new SemesterCourseLevelSpeciality
            {
                SemesterCourse =  semesterCourse,
                CourseLevelSpeciality = courseLevelSpeciality,
                SemesterLevelSpeciality = semesterLevelSpeciality
            };

            return item;
        }

        public bool Contains(SemesterCourse semesterCourse, SemesterLevelSpeciality semesterLevelSpeciality)
        {
            return _dbContext.Set<SemesterCourseLevelSpeciality>()
                .Any(s => semesterCourse.Equals(s.SemesterCourse) &&
                            semesterLevelSpeciality.Equals(s.SemesterLevelSpeciality));
        }

        public SemesterCourseLevelSpeciality Find(SemesterCourse semesterCourse, SemesterLevelSpeciality semesterLevelSpeciality)
        {
            return _dbContext.Set<SemesterCourseLevelSpeciality>()
                .First(s => semesterCourse.Equals(s.SemesterCourse) &&
                            semesterLevelSpeciality.Equals(s.SemesterLevelSpeciality));
        }
    }
}