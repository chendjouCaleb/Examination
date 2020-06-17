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

        public Principal Save(Principal item)
        {
            item = base.Save(item);
            item.Examination.PrincipalCount += 1;
            _dataContext.Update(item.Examination);
            _dataContext.SaveChanges();
            return item;
        }

        public void Delete(Principal item)
        {
            item = base.Save(item);
            item.Examination.PrincipalCount -= 1;
            _dataContext.Update(item.Examination);
            _dataContext.SaveChanges();
        }
    }
}