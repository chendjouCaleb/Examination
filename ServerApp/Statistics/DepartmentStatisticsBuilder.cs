using System.Linq;
using Exam.Entities;
using Exam.Models.Statistics;
using Microsoft.EntityFrameworkCore;

namespace Exam.Statistics
{
    public class DepartmentStatisticsBuilder
    {
        private DbContext _dbContext;
        public DepartmentStatisticsBuilder(DbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public DepartmentStatistics GetStatistics(Department department)
        {
            DepartmentStatistics statistics = new DepartmentStatistics();

            statistics.CourseCount = _dbContext.Set<Course>().Count(c => c.Level.DepartmentId == department.Id);
            statistics.LevelCount = _dbContext.Set<Level>().Count(l => l.DepartmentId == department.Id);
            statistics.RoomCount = _dbContext.Set<Room>().Count(r => r.DepartmentId == department.Id);
            statistics.SpecialityCount = _dbContext.Set<Speciality>().Count(s => s.DepartmentId == department.Id);
            statistics.StudentCount = _dbContext.Set<Student>().Count(s => s.Level.DepartmentId == department.Id);

            return statistics;
        }
    }
}