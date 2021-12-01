using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Exam.Entities.Courses;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers.Periods
{
    
    [Route("api/semesterCourseLevelSpecialities")]
    public class SemesterLevelSpecialityCourseController:Controller
    {
        private DbContext _dbContext;


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
        public SemesterCourseLevelSpeciality Add(SemesterCourse semesterCourse,
            SemesterLevelSpeciality semesterLevelSpeciality)
        {
            Assert.RequireNonNull(semesterCourse, nameof(semesterCourse));
            Assert.RequireNonNull(semesterLevelSpeciality, nameof(semesterLevelSpeciality));

            SemesterCourseLevelSpeciality courseLevelSpeciality = _Add(semesterCourse, semesterLevelSpeciality);
            _dbContext.SaveChanges();

            return courseLevelSpeciality;
        }


        public SemesterCourseLevelSpeciality _Add(SemesterCourse semesterCourse,
            SemesterLevelSpeciality semesterLevelSpeciality)
        {
            Assert.RequireNonNull(semesterCourse, nameof(semesterCourse));
            Assert.RequireNonNull(semesterLevelSpeciality, nameof(semesterLevelSpeciality));

            SemesterCourseLevelSpeciality item = _dbContext.Set<SemesterCourseLevelSpeciality>()
                .First(s => semesterCourse.Equals(s.SemesterCourse) &&
                            semesterLevelSpeciality.Equals(s.SemesterLevelSpeciality));

            if (item != null)
            {
                return item;
            }

            if (!semesterCourse.SemesterLevel.Equals(semesterLevelSpeciality.SemesterLevel))
            {
                throw new IncompatibleEntityException(semesterCourse, semesterLevelSpeciality);
            }

            CourseLevelSpeciality courseLevelSpeciality = _dbContext.Set<CourseLevelSpeciality>()
                .First(c => c.Course.Equals(semesterCourse.Course) &&
                            c.LevelSpeciality.Equals(semesterLevelSpeciality.YearLevelSpeciality.LevelSpeciality));

            item = new SemesterCourseLevelSpeciality
            {
                SemesterCourse =  semesterCourse,
                CourseLevelSpeciality = courseLevelSpeciality,
                SemesterLevelSpeciality = semesterLevelSpeciality
            };

            _dbContext.Add(item);

            return item;
        }
    }
}