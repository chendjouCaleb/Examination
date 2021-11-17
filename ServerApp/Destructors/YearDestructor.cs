using System.Linq;
using Exam.Entities.Periods;
using Microsoft.EntityFrameworkCore;

namespace Exam.Destructors
{
    public class YearDestructor
    {
        private DbContext _dbContext;

        public YearDestructor(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Destroy(Year year)
        {
            _dbContext.Remove(year);
            
            DestroyLevelSpeciality(year);
            DestroyLevel(year);
            DestroySpeciality(year);
            DestroyDepartment(year);
        }

        private void DestroyDepartment(Year year)
        {
            var items = _dbContext.Set<YearDepartment>().Where(y => y.YearId == year.Id);
            _dbContext.RemoveRange(items);
        }

        private void DestroyLevel(Year year)
        {
            var items = _dbContext.Set<YearLevel>().Where(y => y.YearDepartment.YearId == year.Id);
            _dbContext.RemoveRange(items);
        }

        private void DestroySpeciality(Year year)
        {
            var items = _dbContext.Set<YearSpeciality>().Where(y => y.YearDepartment.YearId == year.Id);
            _dbContext.RemoveRange(items);
        }


        private void DestroyLevelSpeciality(Year year)
        {
            var items = _dbContext.Set<YearLevelSpeciality>().Where(y => y.YearLevel.YearDepartment.YearId == year.Id);
            _dbContext.RemoveRange(items);
        }
    }
}