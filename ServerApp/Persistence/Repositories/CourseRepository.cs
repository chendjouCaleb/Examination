using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Entities.Courses;
using Microsoft.EntityFrameworkCore;

namespace Exam.Persistence.Repositories
{
    public interface ICourseRepository : IRepository<Course, long>
    {
        void DeleteAll(Level level);
    }
    
    public class CourseRepository:Repository<Course, long>, ICourseRepository
    {
        private readonly DbContext _dataContext;
        public CourseRepository(DbContext dataContext) : base(dataContext)
        {
            _dataContext = dataContext;
        }
        
        public void DeleteAll(Level level)
        {
         _dataContext.Set<Course>().RemoveRange(Set.Where(m => m.LevelId == level.Id));
         _dataContext.SaveChanges();
        }
    }
}