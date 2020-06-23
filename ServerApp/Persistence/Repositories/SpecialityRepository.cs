
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Models.Statistics;
using System.Linq;
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
                StudentCount = context.Set<Student>().Count(s => speciality.Equals(s.Speciality) ), 
                NonGroupedStudentsCount = context.Set<Student>()
                    .Count(s => speciality.Equals(s.Speciality) && s.Group == null),
                
                GroupCount = context.Set<Group>().Count(s => speciality.Equals(s.Speciality)),
                TestCount = context.Set<Test>().Count(t => speciality.Equals(t.Speciality)),
                WaitingTestCount = context.Set<Test>().Count(t => speciality.Equals(t.Speciality) && t.StartDate == null),
                CompletedTestCount = context.Set<Test>().Count(t => speciality.Equals(t.Speciality) && t.EndDate != null),
                PublishedTestCount = context.Set<Test>().Count(t => speciality.Equals(t.Speciality) && t.PublicationDate == null),
                ClosedTestCount = context.Set<Test>().Count(t => speciality.Equals(t.Speciality) && t.ClosingDate == null),
                    
                ApplicationCount = context.Set<Application>().Count(a => speciality.Equals(a.Speciality)),
                AcceptedApplicationCount = context.Set<Application>().Count(a => speciality.Equals(a.Speciality) && a.Student != null),
                WaitingApplicationCount = context.Set<Application>().Count(a => speciality.Equals(a.Speciality) && a.ProcessDate == null),

            };
        }
    }
}