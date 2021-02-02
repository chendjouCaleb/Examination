using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Models.Statistics;
using MathNet.Numerics.Statistics;
using Microsoft.EntityFrameworkCore;

namespace Exam.Persistence.Repositories
{
    public interface IExaminationRepository : IRepository<Examination, long>
    {
        void UpdateStatistics(Examination examination);
        ExaminationStatistics Statistics(Examination examination);
    }

    public class ExaminationRepository : Repository<Examination, long>, IExaminationRepository
    {
        public ExaminationRepository(DbContext dataContext) : base(dataContext)
        {
        }

        public void UpdateStatistics(Examination examination)
        {
            context.Update(examination);
            context.SaveChanges();
        }

        public ExaminationStatistics Statistics(Examination examination)
        {
            var courseCount = context.Set<Course>().Count(c => examination.School.Equals(c.Level.Department.School));
            var examinationDepartments = context.Set<ExaminationDepartment>()
                .Where(d => examination.Equals(d.Examination))
                .Include(d => d.ExaminationLevels)
                .ThenInclude(d => d.Tests)
                .ThenInclude(d => d.Papers)
                .ThenInclude(p => p.ExaminationStudent)
                .Include(d => d.ExaminationLevels)
                .ThenInclude(d => d.ExaminationStudents)
                .Include(d => d.ExaminationSpecialities)
                .ToList();

            var examinationLevels = examinationDepartments.SelectMany(d => d.ExaminationLevels).ToList();
            var examinationSpecialities = examinationDepartments.SelectMany(d => d.ExaminationSpecialities);
            var examinationStudents = examinationLevels.SelectMany(e => e.ExaminationStudents).ToList();
            
            var tests = examinationLevels.SelectMany(e => e.Tests).ToList();
            var papers = tests.SelectMany(e => e.Papers).ToList();
            
            foreach (var examinationStudent in examinationStudents)
            {
                examinationStudent.Statistics = new ExaminationStudentStatistics(examinationStudent);
            }

            var examinationStudentsStatistics =
                examinationStudents.ConvertAll(e => e.Statistics);

            var means = examinationStudentsStatistics.ConvertAll(m => m.Mean);

            var meanStatistics = new DescriptiveStatistics(means);

            var statistics = new ExaminationStatistics
            {
                TestCount = tests.Count,
                PublishedTestCount = tests.Count(t => t.IsPublished),
                ClosedTestCount = tests.Count(t => t.IsClosed),
                CourseWithoutTest = courseCount - tests.Count,
                
                Means = means,
                Mean = meanStatistics.Mean,
                Median = means.Median(),
                
                SuccessCount = means.Count(m => m >= 0.5),
                FailedCount = means.Count(m => m < 0.5)
            };


            return statistics;
        }
    }
}