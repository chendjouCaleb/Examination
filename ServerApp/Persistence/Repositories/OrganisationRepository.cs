using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Models.Statistics;
using Microsoft.EntityFrameworkCore;

namespace Exam.Persistence.Repositories
{
    public interface IOrganisationRepository : IRepository<Organisation, long>
    {
        OrganisationStatistics Statistics(Organisation organisation);
    }

    public class OrganisationRepository : Repository<Organisation, long>, IOrganisationRepository
    {
        public OrganisationRepository(DbContext dataContext) : base(dataContext)
        {
        }

        public OrganisationStatistics Statistics(Organisation organisation)
        {
            return new OrganisationStatistics
            {
                AdminCount = context.Set<Admin>().Count(a => organisation.Equals(a.Organisation)),
                RoomCount = context.Set<Room>().Count(r => organisation.Equals(r.Organisation)),
                Capacity = context.Set<Room>().Where(r => organisation.Equals(r.Organisation))
                    .Select(r => (int) r.Capacity).Sum(),
                ExaminationCount = context.Set<Examination>().Count(e => organisation.Equals(e.Organisation)),
                WaitingExaminationCount = context.Set<Examination>()
                    .Count(e => organisation.Equals(e.Organisation) && e.StartDate == null),
                ProgressExaminationCount = context.Set<Examination>()
                    .Count(e => organisation.Equals(e.Organisation) && e.StartDate != null && e.EndDate == null),
                ClosedExaminationCount = context.Set<Examination>()
                    .Count(e => organisation.Equals(e.Organisation) && e.StartDate != null && e.EndDate != null),
            };
        }
    }
}