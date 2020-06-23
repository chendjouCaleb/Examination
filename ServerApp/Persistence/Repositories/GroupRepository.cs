using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Models.Statistics;
using Microsoft.EntityFrameworkCore;

namespace Exam.Persistence.Repositories
{
    public interface IGroupRepository:IRepository<Group, long>
    {
        GroupStatistics Statistics(Group group);
    }
    
    public class GroupRepository: Repository<Group, long>, IGroupRepository
    {
        public GroupRepository(DbContext dataContext) : base(dataContext)
        {
        }

        public GroupStatistics Statistics(Group group)
        {
            return new GroupStatistics
            {
            
            };
        }
    }
}