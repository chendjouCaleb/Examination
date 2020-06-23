using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Models.Statistics;
using Microsoft.EntityFrameworkCore;

namespace Exam.Persistence.Repositories
{
    public interface IExaminationRepository:IRepository<Examination, long>
    {
        void UpdateStatistics(Examination examination);
        ExaminationStatistics Statistics(Examination examination);
    }
    public class ExaminationRepository : Repository<Examination, long>, IExaminationRepository
    {

        public ExaminationRepository(DbContext dataContext) : base(dataContext)
        {
        }

        public void UpdateStatistics(Examination examination)
        {
            examination.PrincipalCount = context.Set<Principal>().Count(p => examination.Equals(p.Examination));
            examination.StudentCount = context.Set<Student>().Count(s => examination.Equals(s.Examination));
            examination.TestCount = context.Set<Test>().Count(t => examination.Equals(t.Examination));
            examination.CorrectorCount = context.Set<Corrector>().Count(c => examination.Equals(c.Examination));
            examination.GroupCount = context.Set<Group>().Count(g => examination.Equals(g.Examination));
            examination.SecretaryCount = context.Set<Secretary>().Count(s => examination.Equals(s.Examination));
            examination.SpecialityCount = context.Set<Speciality>().Count(s => examination.Equals(s.Examination));
            examination.SupervisorCount = context.Set<Supervisor>().Count(s => examination.Equals(s.Examination));
            examination.NonGroupedStudentsCount = context.Set<Student>()
                .Count(s => examination.Equals(s.Examination) && s.Group == null);

            context.Update(examination);
            context.SaveChanges();
            
        }
        
        public ExaminationStatistics Statistics(Examination examination)
        {
            return new ExaminationStatistics
            {
                 PrincipalCount = context.Set<Principal>().Count(p => examination.Equals(p.Examination)), 
                 StudentCount = context.Set<Student>().Count(s => examination.Equals(s.Examination)), 
                 TestCount = context.Set<Test>().Count(t => examination.Equals(t.Examination)), 
                 CorrectorCount = context.Set<Corrector>().Count(c => examination.Equals(c.Examination)), 
                 GroupCount = context.Set<Group>().Count(g => examination.Equals(g.Examination)), 
                 SecretaryCount = context.Set<Secretary>().Count(s => examination.Equals(s.Examination)), 
                 SpecialityCount = context.Set<Speciality>().Count(s => examination.Equals(s.Examination)), 
                 SupervisorCount = context.Set<Supervisor>().Count(s => examination.Equals(s.Examination)), 
                 NonGroupedStudentsCount = context.Set<Student>()
                .Count(s => examination.Equals(s.Examination) && s.Group == null)  
            };

        }
    }
    
    
}