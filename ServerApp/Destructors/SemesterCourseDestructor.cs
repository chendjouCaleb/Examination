using System.Collections.Generic;
using System.Linq;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Exam.Destructors
{
    public class SemesterCourseDestructor
    {
        private DbContext _dbContext;

        public SemesterCourseDestructor(DbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public void Destroy(SemesterCourse semesterCourse)
        {
            Assert.RequireNonNull(semesterCourse, nameof(semesterCourse));
            _dbContext.Remove(semesterCourse);
        }

        private void _DestroyLevelSpeciality(SemesterCourse semesterCourse)
        {
            IEnumerable<SemesterCourseLevelSpeciality> items = _dbContext.Set<SemesterCourseLevelSpeciality>()
                .Where(s => semesterCourse.Equals(s.SemesterCourse));
            
            var destructor = new SemesterCourseLevelSpecialityDestructor(_dbContext);

            foreach (var item in items)
            {
                destructor.Destroy(item);
            }
        }
    }
}