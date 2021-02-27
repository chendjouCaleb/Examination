using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Entities.Courses;
using MathNet.Numerics.Statistics;
using Microsoft.EntityFrameworkCore;

namespace Exam.Persistence.Repositories
{
    public interface ITestRepository : IRepository<Test, long>
    {
        TestStatistics GetStatistics(Test test);

        Test Find(long courseId, long examinationLevelId);

        Test Find(Course course, ExaminationLevel examinationLevel);

        bool Exists(Course course, ExaminationLevel examinationLevel);

        School GetSchool(Test test);

        Department GetDepartment(Test test);

        Examination GetExamination(Test test);

        UserTest UserTest(Test test, string userId);
    }

    public class TestRepository : Repository<Test, long>, ITestRepository
    {
        public TestRepository(DbContext dataContext) : base(dataContext)
        {
        }
        
        public Test Find(long courseId, long examinationLevelId)
        {
            return Set.First(t => t.CourseId == courseId && t.ExaminationLevelId == examinationLevelId);
        }

        public Test Find(Course course, ExaminationLevel examinationLevel)
        {
            return Set.First(t => course.Equals(t.Course) && examinationLevel.Equals(t.ExaminationLevel));
        }
        
        public bool Exists(Course course, ExaminationLevel examinationLevel)
        {
            return Set.Any(t => course.Equals(t.Course) && examinationLevel.Equals(t.ExaminationLevel));
        }

        public School GetSchool(Test test)
        {
            return context.Set<School>().First(s => s.Equals(test.Course.Level.Department.School));
        }

        public TestStatistics Statistics(Test test)
        {
            return new TestStatistics
            {
                Presence = context.Set<Paper>().Count(p => test.Equals(p.TestGroup.Test))
            };
        }


        public Examination GetExamination(Test test)
        {
            return context.Set<Examination>()
                .First(s => s.Equals(test.ExaminationLevel.ExaminationDepartment.Examination));
        }

        public Department GetDepartment(Test test)
        {
            return context.Set<Department>().First(s => s.Equals(test.Course.Level.Department));
        }

        public UserTest UserTest(Test test, string userId)
        {
            return new UserTest
            {
                IsStudent = context.Set<Paper>().Any(s => userId == s.ExaminationStudent.Student.UserId
                                                          && test.Equals(s.TestGroup.Test)),

                IsCorrector = context.Set<TestGroupCorrector>()
                    .Any(c => c.Corrector.UserId == userId && test.Equals(c.TestGroup.Test)),
                IsSupervisor = context.Set<TestGroupSupervisor>()
                    .Any(c => c.Supervisor.UserId == userId && test.Equals(c.TestGroup.Test)),
                IsSecretary = context.Set<TestGroupSecretary>()
                    .Any(c => c.Secretary.UserId == userId && test.Equals(c.TestGroup.Test))
            };
        }
        
        public TestStatistics GetStatistics(Test test)
        {
            var papers = context.Set<Paper>().Where(p => test.Equals(p.Test)).ToList();
            
            var scores = papers.Where(p => p.Score != null).Select(t => t.Score ?? 0).OrderBy(c => c).ToArray();
            
            if (scores.Length == 0)
            {
                return new TestStatistics();
            }
            var statistics = new DescriptiveStatistics(scores);
            
            return new TestStatistics
            {
                Frequency = papers.Count,
                Mean = statistics.Mean,
                Median = scores.Median(),
                Std = statistics.StandardDeviation,
                Variance = statistics.Variance,
                Mode = scores.GroupBy(c => c).OrderByDescending(c => c.Count()).Select(c => c.Key).FirstOrDefault(),
                Min = scores.Min(),
                Max = statistics.Maximum,
                Skewness = statistics.Skewness,
                
                Quartile0 = scores.LowerQuartile(),
                Quartile1 = scores.Median(),
                Quartile2 = scores.UpperQuartile(),
                
                MinPaper = papers.FirstOrDefault(p => p.Score != null && p.Score <= scores.Min()),
                MaxPaper = papers.FirstOrDefault(p => p.Score != null && p.Score.Value >= statistics.Maximum),
                
                Scores = scores,
                
                ConsignedFrequency = papers.Count(p => !string.IsNullOrWhiteSpace(p.SecretaryUserId)),
                CorrectedFrequency = papers.Count(p => p.Score != null),
                Presence = papers.Count(p => p.IsPresent)
            };
        }
    }
}