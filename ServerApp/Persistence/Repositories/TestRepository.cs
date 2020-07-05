using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Exam.Persistence.Repositories
{
    public interface ITestRepository : IRepository<Test, long>
    {
        TestStatistics Statistics(Test test);

        UserTest UserTest(Test test, string userId);
    }

    public class TestRepository : Repository<Test, long>, ITestRepository
    {
        public TestRepository(DbContext dataContext) : base(dataContext)
        {
        }

        public TestStatistics Statistics(Test test)
        {
            return new TestStatistics
            {
                Presence = context.Set<Paper>().Count(p => test.Equals(p.TestGroup.Test))
            };
        }

        public UserTest UserTest(Test test, string userId)
        {
            return new UserTest
            {
                IsStudent = context.Set<Student>().Any(s => userId == s.UserId
                                                            && test.Examination.Equals(s.Examination)
                                                            && s.SpecialityId == test.SpecialityId),

                IsCorrector = context.Set<TestGroupCorrector>()
                    .Any(c => c.Corrector.UserId == userId && test.Equals(c.TestGroup.Test)),
                IsSupervisor = context.Set<TestGroupSupervisor>()
                    .Any(c => c.Supervisor.UserId == userId && test.Equals(c.TestGroup.Test)),
                IsSecretary = context.Set<TestGroupSecretary>()
                    .Any(c => c.Secretary.UserId == userId && test.Equals(c.TestGroup.Test))
            };
        }
    }
}