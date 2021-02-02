using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using MathNet.Numerics.Statistics;


namespace Exam.Persistence.Repositories
{
    public interface ITestGroupRepository : IRepository<TestGroup, long>
    {
        School GetSchool(TestGroup testGroup);

        Department GetDepartment(TestGroup testGroup);

        TestGroupStatistics GetStatistics(TestGroup testGroup);

        UserTestGroup UserTestGroup(TestGroup testGroup, string userId);
    }

    public class TestGroupRepository : Repository<TestGroup, long>, ITestGroupRepository
    {
        public TestGroupRepository(DbContext dataContext) : base(dataContext)
        {
        }

        public TestGroupStatistics GetStatistics(TestGroup testGroup)
        {
            var papers = context.Set<Paper>().Where(p => testGroup.Equals(p.TestGroup)).ToList();

            var scores = papers.Where(p => p.Score != null).Select(t => t.Score ?? 0).OrderBy(c => c).ToArray();
            
            if (scores.Length == 0)
            {
                return new TestGroupStatistics();
            }
            
            var statistics = new DescriptiveStatistics(scores);


            return new TestGroupStatistics
            {
                Frequency = papers.Count,
                Mean = statistics.Mean,
                Median = scores.Median(),
                Std = statistics.StandardDeviation,
                Variance = statistics.Variance,
                Mode = scores.GroupBy(c => c).OrderByDescending(c => c.Count()).Select(c => c.Key).FirstOrDefault(),
                Min = statistics.Minimum,
                Max = statistics.Maximum,
                Skewness = statistics.Skewness,

                Quartile0 = scores.LowerQuartile(),
                Quartile1 = scores.Median(),
                Quartile2 = scores.UpperQuartile(),

                MinPaper = papers.First(p => p.Score != null && p.Score.Value <= statistics.Minimum),
                MaxPaper = papers.First(p => p.Score != null && p.Score.Value >= statistics.Maximum),

                Scores = scores,

                ConsignedFrequency = papers.Count(p => !string.IsNullOrWhiteSpace(p.SecretaryUserId)),
                CorrectedFrequency = papers.Count(p => p.Score != null),
                Presence = papers.Count(p => p.IsPresent)
            };
        }

        public School GetSchool(TestGroup testGroup)
        {
            return context.Set<School>().First(s => s.Equals(testGroup.Test.Course.Level.Department.School));
        }

        public Department GetDepartment(TestGroup testGroup)
        {
            return context.Set<Department>().First(s => s.Equals(testGroup.Test.Course.Level.Department));
        }

        public UserTestGroup UserTestGroup(TestGroup testGroup, string userId)
        {
            return new UserTestGroup
            {
                IsStudent = context.Set<Paper>().Any(s => userId == s.ExaminationStudent.Student.UserId
                                                          && testGroup.Equals(s.TestGroup)),

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