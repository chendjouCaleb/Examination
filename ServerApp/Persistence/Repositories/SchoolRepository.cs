using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Models.Statistics;
using Microsoft.EntityFrameworkCore;

namespace Exam.Persistence.Repositories
{
    public interface ISchoolRepository : IRepository<School, long>
    {
        SchoolStatistics Statistics(School school);
    }

    public class SchoolRepository : Repository<School, long>, ISchoolRepository
    {
        public SchoolRepository(DbContext dataContext) : base(dataContext)
        {
        }

        public SchoolStatistics Statistics(School school)
        {
            return new SchoolStatistics
            {
                PrincipalCount = context.Set<Principal>().Count(p => school.Equals(p.Department.School)),
                StudentCount = context.Set<Student>().Count(s => school.Equals(s.Level.Department.School)),
                CorrectorCount = context.Set<Corrector>().Count(c => school.Equals(c.Department.School)),
                SecretaryCount = context.Set<Secretary>().Count(s => school.Equals(s.Department.School)),
                
                SupervisorCount = context.Set<Supervisor>().Count(s => school.Equals(s.Department.School)),
                
                RoomCount = context.Set<Room>().Count(r => school.Equals(r.School)),
                Capacity = context.Set<Room>().Where(r => school.Equals(r.School))
                    .Select(r => (int) r.Capacity).Sum(),
                ExaminationCount = context.Set<Examination>().Count(e => school.Equals(e.School)),
                WaitingExaminationCount = context.Set<Examination>()
                    .Count(e => school.Equals(e.School) && e.StartDate == null),
                ProgressExaminationCount = context.Set<Examination>()
                    .Count(e => school.Equals(e.School) && e.StartDate != null && e.EndDate == null),
                ClosedExaminationCount = context.Set<Examination>()
                    .Count(e => school.Equals(e.School) && e.StartDate != null && e.EndDate != null),
            };
        }
    }
}