using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Models.Statistics;
using Microsoft.EntityFrameworkCore;

namespace Exam.Persistence.Repositories
{
    public interface ISpecialityRepository : IRepository<Speciality, long>
    {
        SpecialityStatistics Statistics(Speciality speciality);
    }
    
    public class SpecialityRepository:Repository<Speciality, long>, ISpecialityRepository
    {
        public SpecialityRepository(DbContext dataContext) : base(dataContext)
        {
        }

        public SpecialityStatistics Statistics(Speciality speciality)
        {
            return new SpecialityStatistics
            {

            };
        }
    }
}