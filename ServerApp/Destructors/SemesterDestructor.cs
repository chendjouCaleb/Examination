using System.Linq;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Exam.Destructors
{
    public class SemesterDestructor
    {
        private DbContext _dbContext;

        public SemesterDestructor(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Destroy(Year year)
        {
            Assert.RequireNonNull(year, nameof(year));

            var semesters = _dbContext.Set<Semester>().Where(s => s.YearId == year.Id);

            foreach (Semester semester in semesters)
            {
                Destroy(semester);
            }
        }

        public void Destroy(Semester semester)
        {
            _dbContext.Remove(semester);
            
            DestroyLevelSpeciality(semester);
            DestroyLevel(semester);
            DestroySpeciality(semester);
            DestroyDepartment(semester);
        }

        private void DestroyDepartment(Semester semester)
        {
            var items = _dbContext.Set<SemesterDepartment>().Where(y => y.SemesterId == semester.Id);
            _dbContext.RemoveRange(items);
        }

        private void DestroyLevel(Semester semester)
        {
            var items = _dbContext.Set<SemesterLevel>().Where(y => y.SemesterDepartment.SemesterId == semester.Id);
            _dbContext.RemoveRange(items);
        }

        private void DestroySpeciality(Semester semester)
        {
            var items = _dbContext.Set<SemesterSpeciality>().Where(y => y.SemesterDepartment.SemesterId == semester.Id);
            _dbContext.RemoveRange(items);
        }
        
        private void DestroyLevelSpeciality(Semester semester)
        {
            var items = _dbContext.Set<SemesterLevelSpeciality>().Where(y => y.SemesterLevel.SemesterDepartment.SemesterId == semester.Id);
            _dbContext.RemoveRange(items);
        }
    }
}