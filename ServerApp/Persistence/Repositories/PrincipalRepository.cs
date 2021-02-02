using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Microsoft.EntityFrameworkCore;

namespace Exam.Persistence.Repositories
{
    public class PrincipalRepository:Repository<Principal, long>, IRepository<Principal, long>
    {
        private DbContext _dataContext;
        public PrincipalRepository(DbContext dataContext) : base(dataContext)
        {
            _dataContext = dataContext;
        }

        public new Principal Save(Principal item)
        {
            return base.Save(item);
            
        }

        public new void Delete(Principal item)
        {
         base.Delete(item);
         
        }
    }
}