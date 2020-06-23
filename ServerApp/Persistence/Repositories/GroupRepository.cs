using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Models.Statistics;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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
            int studentCount = context.Set<Student>().Count(s => group.Equals(s.Group));
                
            return new GroupStatistics
            {
                StudentCount = studentCount, 
                RemainingCapacity = (int)group.Capacity - studentCount
            };
        }
    }
}