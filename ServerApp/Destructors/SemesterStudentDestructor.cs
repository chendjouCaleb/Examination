using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Exam.Destructors
{
    public class SemesterStudentDestructor
    {
        private DbContext _dbContext;

        public SemesterStudentDestructor(DbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public void Destroy(SemesterStudent semesterStudent)
        {
            Assert.RequireNonNull(semesterStudent, nameof(semesterStudent));
            _dbContext.Remove(semesterStudent);
        }
    }
}