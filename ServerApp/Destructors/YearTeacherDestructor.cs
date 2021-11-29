
using System.Linq;
using Exam.Entities.Periods;
using Microsoft.EntityFrameworkCore;

namespace Exam.Destructors
{
    public class YearTeacherDestructor
    {
        private DbContext _dbContext;
        private SemesterTeacherDestructor _semesterTeacherDestructor;

        public YearTeacherDestructor(DbContext dbContext)
        {
            _dbContext = dbContext;
            _semesterTeacherDestructor = new SemesterTeacherDestructor(dbContext);
        }


        public void Destroy(YearTeacher yearTeacher)
        {
            var semesterTeachers = _dbContext.Set<SemesterTeacher>().Where(st => st.YearTeacherId == yearTeacher.Id);

            foreach (var semesterTeacher in semesterTeachers)
            {
                _semesterTeacherDestructor.Destroy(semesterTeacher);
            }

            _dbContext.Remove(yearTeacher);
        }
    }
}