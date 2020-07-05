using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Exam.Persistence.Repositories
{
    public interface ITestGroupRepository : IRepository<TestGroup, long>
    {
        TestGroupStatistics Statistics(TestGroup testGroup);

        UserTestGroup UserTestGroup(TestGroup testGroup, string userId);
    }

    public class TestGroupRepository : Repository<TestGroup, long>, ITestGroupRepository
    {
        public TestGroupRepository(DbContext dataContext) : base(dataContext)
        {
        }

        public TestGroupStatistics Statistics(TestGroup testGroup)
        {
            return new TestGroupStatistics
            {
                Presence = context.Set<Paper>().Count(p => testGroup.Equals(p.TestGroup))
            };
        }

        public UserTestGroup UserTestGroup(TestGroup testGroup, string userId)
        {
            return new UserTestGroup
            {
                IsStudent = context.Set<Student>().Any(s => userId == s.UserId
                                                            && testGroup.Test.Examination.Equals(s.Examination)
                                                            && s.SpecialityId == testGroup.Test.SpecialityId),

                IsCorrector = context.Set<TestGroupCorrector>()
                    .Any(c => c.Corrector.UserId == userId && testGroup.Equals(c.TestGroup)),
                IsSupervisor = context.Set<TestGroupSupervisor>()
                    .Any(c => c.Supervisor.UserId == userId && testGroup.Equals(c.TestGroup)),
                IsSecretary = context.Set<TestGroupSecretary>()
                    .Any(c => c.Secretary.UserId == userId && testGroup.Equals(c.TestGroup))
            };
        }
    }
}