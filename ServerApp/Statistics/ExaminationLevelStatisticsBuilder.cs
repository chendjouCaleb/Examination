using System.Linq;
using Exam.Entities;
using MathNet.Numerics.Statistics;
using Microsoft.EntityFrameworkCore;

namespace Exam.Statistics
{
    public class ExaminationLevelStatisticsBuilder
    {
        private DbContext _dbContext;

        public ExaminationLevelStatisticsBuilder(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ExaminationLevelStatistics Statistics(ExaminationLevel examinationLevel)
        {
            var examinationStudents = _dbContext.Set<ExaminationStudent>()
                .Where(e => examinationLevel.Equals(e.ExaminationLevel))
                .Include(e => e.Papers)
                .ThenInclude(p => p.Test)
                .ToList();

            
            var examinationStudentStatistics = examinationStudents
                .ConvertAll(r => new ExaminationStudentStatistics(r));

            var means = examinationStudentStatistics.ConvertAll(m => m.Mean);

            var meanStatistics = new DescriptiveStatistics(means);

            var tests = _dbContext.Set<Test>().Where(e => examinationLevel.Equals(e.ExaminationLevel))
                .Include(t => t.Papers).ToList();
            var courseCount = _dbContext.Set<Course>().Count(e => e.Level.Equals(examinationLevel.Level));

            var papers = tests.SelectMany(t => t.Papers).ToList();
            return new ExaminationLevelStatistics
            {
                ExaminationLevelId = examinationLevel.Id,
                TestCount = tests.Count,
                PublishedTestCount = tests.Count(t => t.IsPublished),
                ClosedTestCount = tests.Count(t => t.IsClosed),
                CorrectedTestCount =  tests.Count(t => t.CorrectedPaperCount == t.PaperCount),
                CourseWithoutTest = courseCount - tests.Count,
                
                PaperCount = papers.Count,
                CorrectedPaperCount = papers.Count(p => p.IsCorrected),
                PresentPaperCount = papers.Count(p => p.IsPresent),

                Means = means,
                Mean = meanStatistics.Mean,
                Median = means.Median(),
                Std = meanStatistics.StandardDeviation,
                Mode = means.ConvertAll(m => 0 + (int)m).GroupBy(c => c).OrderByDescending(c => c.Count()).Select(c => c.Key).FirstOrDefault(),

                StudentCount = examinationStudents.Count,
                SuccessCount = means.Count(m => m >= 0.5),
                FailedCount = means.Count(m => m < 0.5),
                ExaminationStudentStatistics = examinationStudentStatistics
            };
            
        }
    }
}