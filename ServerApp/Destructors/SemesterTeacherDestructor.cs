using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Exam.Destructors
{
    public class SemesterTeacherDestructor
    {
        private DbContext _dbContext;

        public SemesterTeacherDestructor(DbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public void Destroy(SemesterTeacher semesterTeacher)
        {
            Assert.RequireNonNull(semesterTeacher, nameof(semesterTeacher));
            _dbContext.Remove(semesterTeacher);
        }
    }
}