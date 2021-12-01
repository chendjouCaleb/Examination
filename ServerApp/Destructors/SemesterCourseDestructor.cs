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
    }
}