using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Entities.Courses;
using Microsoft.EntityFrameworkCore;

namespace Exam.Persistence.Repositories
{
    public interface ICourseSessionRepository : IRepository<CourseSession, long>
    {
        
    }
    
    public class CourseSessionRepository:Repository<CourseSession, long>, ICourseSessionRepository
    {
        private readonly DbContext _dataContext;
        public CourseSessionRepository(DbContext dataContext) : base(dataContext)
        {
            _dataContext = dataContext;
        }
    }
}