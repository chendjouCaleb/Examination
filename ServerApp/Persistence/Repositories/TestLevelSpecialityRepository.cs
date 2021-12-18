using System;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Entities.Periods;
using MathNet.Numerics.Statistics;
using Microsoft.EntityFrameworkCore;

namespace Exam.Persistence.Repositories
{
    public interface ITestLevelSpecialityRepository : IRepository<TestLevelSpeciality, long>
    {
        PapersStatistics GetStatistics(TestLevelSpeciality testLevelSpeciality);
        void DeleteAll(Test test);
        void DeleteAll(SemesterCourseLevelSpeciality semesterCourseLevelSpeciality);
    }

    public class TestLevelSpecialityRepository : Repository<TestLevelSpeciality, long>,
        ITestLevelSpecialityRepository
    {
        private readonly DbContext _dataContext;

        public TestLevelSpecialityRepository(DbContext dataContext) : base(dataContext)
        {
            _dataContext = dataContext;
        }
        
        public PapersStatistics GetStatistics(TestLevelSpeciality testLevelSpeciality)
        {
            var papers = context.Set<Paper>().Where(p => testLevelSpeciality.Equals(p.TestLevelSpeciality)).ToList();
            Console.WriteLine("Papers count: " + papers.Count);
            
            var scores = papers.Where(p => p.Score != null).Select(t => t.Score ?? 0).OrderBy(c => c).ToArray();
            
            if (scores.Length == 0)
            {
                return new PapersStatistics();
            }
            var statistics = new DescriptiveStatistics(scores);
            
            return new PapersStatistics 
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

        public void DeleteAll(Test test)
        {
            _dataContext.Set<TestLevelSpeciality>().RemoveRange(Set.Where(m => m.TestId == test.Id));
            _dataContext.SaveChanges();
        }

        public void DeleteAll(SemesterCourseLevelSpeciality semesterCourseLevelSpeciality)
        {
            _dataContext.Set<TestLevelSpeciality>().RemoveRange(
                Set.Where(m => m.SemesterCourseLevelSpecialityId == semesterCourseLevelSpeciality.Id)
            );
            _dataContext.SaveChanges();
        }
    }
}