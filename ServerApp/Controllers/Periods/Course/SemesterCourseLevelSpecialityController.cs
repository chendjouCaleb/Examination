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
    public class SemesterCourseLevelSpecialityController : Controller
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
        public IEnumerable<SemesterCourseLevelSpeciality> List([FromQuery] long? semesterCourseId,
            [FromQuery] long? semesterLevelSpecialityId,
            [FromQuery] long? semesterSpecialityId,
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
            
            if (semesterSpecialityId != null)
            {
                query = query.Where(s => s.SemesterLevelSpeciality.SemesterSpecialityId == semesterSpecialityId);
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

            return CreatedAtAction("Get", new {semesterCourseLevelSpecialityId = courseLevelSpeciality.Id},
                courseLevelSpeciality);
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
            IQueryable<CourseLevelSpeciality> courseLevelSpecialities = _dbContext.Set<CourseLevelSpeciality>()
                .Where(s => s.LevelSpeciality.Level.Department.School.Equals(semester.Year.School));

            IQueryable<SemesterCourse> semesterCourses = _dbContext.Set<SemesterCourse>()
                .Where(s => s.SemesterLevel.SemesterDepartment.Semester.Equals(semester));

            IQueryable<SemesterLevelSpeciality> semesterLevelSpecialities = _dbContext.Set<SemesterLevelSpeciality>()
                .Where(s => s.SemesterLevel.SemesterDepartment.Semester.Equals(semester));

            return _AddAll(courseLevelSpecialities, semesterCourses, semesterLevelSpecialities);
        }
        
        public List<SemesterCourseLevelSpeciality> _AddAll(SemesterDepartment semesterDepartment)
        {
            IQueryable<CourseLevelSpeciality> courseLevelSpecialities = _dbContext.Set<CourseLevelSpeciality>()
                .Where(s => s.LevelSpeciality.Level.Department.Equals(semesterDepartment.YearDepartment.Department));

            IQueryable<SemesterCourse> semesterCourses = _dbContext.Set<SemesterCourse>()
                .Where(s => s.SemesterLevel.SemesterDepartment.Equals(semesterDepartment));

            IQueryable<SemesterLevelSpeciality> semesterLevelSpecialities = _dbContext.Set<SemesterLevelSpeciality>()
                .Where(s => s.SemesterLevel.SemesterDepartment.Equals(semesterDepartment));

            return _AddAll(courseLevelSpecialities, semesterCourses, semesterLevelSpecialities);
        }

        public List<SemesterCourseLevelSpeciality> _AddAll(SemesterLevel semesterLevel)
        {
            IQueryable<CourseLevelSpeciality> courseLevelSpecialities = _dbContext.Set<CourseLevelSpeciality>()
                .Where(s => s.LevelSpeciality.Level.Equals(semesterLevel.YearLevel.Level));

            IQueryable<SemesterCourse> semesterCourses = _dbContext.Set<SemesterCourse>()
                .Where(s => s.SemesterLevel.Equals(semesterLevel));

            IQueryable<SemesterLevelSpeciality> semesterLevelSpecialities = _dbContext.Set<SemesterLevelSpeciality>()
                .Where(s => s.SemesterLevel.Equals(semesterLevel));

            return _AddAll(courseLevelSpecialities, semesterCourses, semesterLevelSpecialities);
        }
        
        
        

        public List<SemesterCourseLevelSpeciality> _AddAll(
            IQueryable<CourseLevelSpeciality> courseLevelSpecialityQuery,
            IQueryable<SemesterCourse> semesterCourseQuery,
            IQueryable<SemesterLevelSpeciality> semesterLevelSpecialityQuery)
        {
            var semesterCourses = semesterCourseQuery
                .Include(s => s.SemesterLevel)
                .Include(s => s.Course)
                .ToList();
            
            var courseLevelSpecialities = courseLevelSpecialityQuery
                .Include(c => c.Course)
                .ToList();
            
            var semesterLevelSpecialities = semesterLevelSpecialityQuery
                .Include(s => s.SemesterLevel)
                .Include(s => s.YearLevelSpeciality.LevelSpeciality)
                .ToList();

            return _AddAll(courseLevelSpecialities, semesterCourses, semesterLevelSpecialities);
        }

        public List<SemesterCourseLevelSpeciality> _AddAll(IEnumerable<CourseLevelSpeciality> courseLevelSpecialities,
            List<SemesterCourse> semesterCourses, List<SemesterLevelSpeciality> semesterLevelSpecialities)
        {
            var semesterCourseLevelSpecialities = new List<SemesterCourseLevelSpeciality>();

            foreach (CourseLevelSpeciality courseLevelSpeciality in courseLevelSpecialities)
            {
                SemesterCourse semesterCourse = semesterCourses
                    .FirstOrDefault(s => s.Course.Equals(courseLevelSpeciality.Course));

                SemesterLevelSpeciality semesterLevelSpeciality = semesterCourse == null
                    ? null
                    : semesterLevelSpecialities
                        .FirstOrDefault(s => s.SemesterLevel.Equals(semesterCourse.SemesterLevel)
                                             && s.YearLevelSpeciality.LevelSpeciality.Equals(courseLevelSpeciality
                                                 .LevelSpeciality));

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
                                     c.LevelSpeciality.Equals(semesterLevelSpeciality.YearLevelSpeciality
                                         .LevelSpeciality));

            SemesterCourseLevelSpeciality item = new SemesterCourseLevelSpeciality
            {
                SemesterCourse = semesterCourse,
                CourseLevelSpeciality = courseLevelSpeciality,
                SemesterLevelSpeciality = semesterLevelSpeciality
            };

            return item;
        }


        public List<SemesterCourseLevelSpeciality> _Add(SemesterCourse semesterCourse,
            IEnumerable<long> semesterLevelSpecialityId)
        {
            Assert.RequireNonNull(semesterLevelSpecialityId, nameof(semesterLevelSpecialityId));
            Assert.RequireNonNull(semesterCourse, nameof(semesterCourse));

            var semesterCourseLevelSpecialities = new List<SemesterCourseLevelSpeciality>();
            var semesterLevelSpecialities = _dbContext.Set<SemesterLevelSpeciality>()
                .Include(s => s.YearLevelSpeciality)
                .ThenInclude(s => s.LevelSpeciality)
                .Where(s => semesterLevelSpecialityId.Contains(s.Id));

            foreach (var semesterLevelSpeciality in semesterLevelSpecialities)
            {
                semesterCourseLevelSpecialities.Add(_Add(semesterCourse, semesterLevelSpeciality));
            }

            return semesterCourseLevelSpecialities;
        }

        public List<SemesterCourseLevelSpeciality> _Add(SemesterCourse semesterCourse,
            IEnumerable<SemesterLevelSpeciality> semesterLevelSpecialities)
        {
            Assert.RequireNonNull(semesterLevelSpecialities, nameof(semesterLevelSpecialities));
            Assert.RequireNonNull(semesterCourse, nameof(semesterCourse));

            var semesterCourseLevelSpecialities = new List<SemesterCourseLevelSpeciality>();

            foreach (var semesterLevelSpeciality in semesterLevelSpecialities)
            {
                semesterCourseLevelSpecialities.Add(_Add(semesterCourse, semesterLevelSpeciality));
            }

            return semesterCourseLevelSpecialities;
        }

        public bool Contains(SemesterCourse semesterCourse, SemesterLevelSpeciality semesterLevelSpeciality)
        {
            return _dbContext.Set<SemesterCourseLevelSpeciality>()
                .Any(s => semesterCourse.Equals(s.SemesterCourse) &&
                          semesterLevelSpeciality.Equals(s.SemesterLevelSpeciality));
        }

        public SemesterCourseLevelSpeciality Find(SemesterCourse semesterCourse,
            SemesterLevelSpeciality semesterLevelSpeciality)
        {
            return _dbContext.Set<SemesterCourseLevelSpeciality>()
                .First(s => semesterCourse.Equals(s.SemesterCourse) &&
                            semesterLevelSpeciality.Equals(s.SemesterLevelSpeciality));
        }
    }
}