
using System.Linq;
using Exam.Entities.Periods;
using Microsoft.EntityFrameworkCore;

namespace Exam.Destructors
{
    public class YearStudentDestructor
    {
        private DbContext _dbContext;
        private SemesterStudentDestructor _semesterStudentDestructor;

        public YearStudentDestructor(DbContext dbContext)
        {
            _dbContext = dbContext;
            _semesterStudentDestructor = new SemesterStudentDestructor(dbContext);
        }


        public void Destroy(YearStudent yearStudent)
        {
            var semesterStudents = _dbContext.Set<SemesterStudent>().Where(st => st.YearStudentId == yearStudent.Id);

            foreach (var semesterStudent in semesterStudents)
            {
                _semesterStudentDestructor.Destroy(semesterStudent);
            }

            _dbContext.Remove(yearStudent);
        }
    }
}