using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Microsoft.EntityFrameworkCore;

namespace Exam.Persistence.Repositories
{
    public interface ICourseLevelSpecialityRepository : IRepository<CourseLevelSpeciality, long>
    {
        void DeleteAll(Course course);
        void DeleteAll(LevelSpeciality levelSpeciality);
    }

    public class CourseLevelSpecialityRepository : Repository<CourseLevelSpeciality, long>,
        ICourseLevelSpecialityRepository
    {
        private readonly DbContext _dataContext;

        public CourseLevelSpecialityRepository(DbContext dataContext) : base(dataContext)
        {
            _dataContext = dataContext;
        }

        public void DeleteAll(Course course)
        {
            _dataContext.Set<CourseLevelSpeciality>().RemoveRange(Set.Where(m => m.CourseId == course.Id));
            _dataContext.SaveChanges();
        }

        public void DeleteAll(LevelSpeciality levelSpeciality)
        {
            _dataContext.Set<CourseLevelSpeciality>().RemoveRange(
                Set.Where(m => m.LevelSpecialityId == levelSpeciality.Id)
            );
            _dataContext.SaveChanges();
        }
    }
}