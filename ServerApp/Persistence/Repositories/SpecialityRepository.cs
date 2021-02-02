using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Models.Statistics;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Exam.Persistence.Repositories
{
    public interface ISpecialityRepository : IRepository<Speciality, long>
    {
        SpecialityStatistics Statistics(Speciality examinationSpeciality);
    }

    public class SpecialityRepository : Repository<Speciality, long>, ISpecialityRepository
    {
        public SpecialityRepository(DbContext dataContext) : base(dataContext)
        {
        }

        public SpecialityStatistics Statistics(Speciality speciality)
        {
            return new SpecialityStatistics
            {
                LevelCount = context.Set<LevelSpeciality>().Count(s => speciality.Equals(s.Speciality)),
                StudentCount = context.Set<Student>().Count(s =>  s.LevelSpeciality !=null && speciality.Id == s.LevelSpeciality.SpecialityId ),
                ApplicationCount = context.Set<Application>().Count(s =>
                    s.LevelSpeciality != null && speciality.Equals(s.LevelSpeciality.Speciality))
            };
        }
    }
}