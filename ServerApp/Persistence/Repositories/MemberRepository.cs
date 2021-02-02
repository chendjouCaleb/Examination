using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Microsoft.EntityFrameworkCore;

namespace Exam.Persistence.Repositories
{
    public interface IMemberRepository : IRepository<Member, long>
    {
        void DeleteAll(School school);
    }
    
    public class MemberRepository:Repository<Member, long>, IMemberRepository
    {
        private readonly DbContext _dataContext;
        public MemberRepository(DbContext dataContext) : base(dataContext)
        {
            _dataContext = dataContext;
        }
        
        public void DeleteAll(School school)
        {
         _dataContext.Set<Member>().RemoveRange(Set.Where(m => m.SchoolId == school.Id));
         _dataContext.SaveChanges();
        }
    }
}