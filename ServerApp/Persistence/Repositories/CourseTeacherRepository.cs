using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Entities.Courses;
using Microsoft.EntityFrameworkCore;

namespace Exam.Persistence.Repositories
{
    public interface ICourseTeacherRepository : IRepository<CourseTeacher, long>
    {
        
    }
    
    public class CourseTeacherRepository:Repository<CourseTeacher, long>, ICourseTeacherRepository
    {
        private readonly DbContext _dataContext;
        public CourseTeacherRepository(DbContext dataContext) : base(dataContext)
        {
            _dataContext = dataContext;
        }
    }
}