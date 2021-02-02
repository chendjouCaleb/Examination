using System.Collections.Generic;
using System.Linq;

namespace Exam.Entities
{
    public abstract class AbstractExaminationStatistics
    {
        public IEnumerable<double> Means { get; set; }
        public double Mean { get; set; }
        public double Median { get; set; }
        
        public double Std { get; set; }

        public double Mode { get; set; }

        public int PaperCount { get; set; }
        public int CorrectedPaperCount { get; set; }
        public int PresentPaperCount { get; set; }
        
        public int StudentCount { get; set; }
        public int FailedCount { get; set; }
        public int SuccessCount { get; set; }
        
        public int TestCount { get; set; }
        public int WaitingTestCount { get; set; }
        public int ProgressTestCount { get; set; }
        public int ClosedTestCount { get; set; }
        public int PublishedTestCount { get; set; }

        public int CorrectedTestCount { get; set; }
        public int CourseWithoutTest { get; set; }
    }
    public class ExaminationStatistics:AbstractExaminationStatistics
    {
        public long ExaminationId { get; set; }
        
        public List<ExaminationDepartmentStatistics> ExaminationDepartmentStatistics { get; set; }
         
    }

    public class ExaminationDepartmentStatistics:AbstractExaminationStatistics
    {
        public long ExaminationDepartmentId { get; set; }
        public List<ExaminationLevelStatistics> ExaminationLevelStatistics { get; set; }
        public List<ExaminationSpecialityStatistics> ExaminationSpecialityStatistics { get; set; }
    }


    public class ExaminationLevelStatistics:AbstractExaminationStatistics
    {
        public long ExaminationLevelId { get; set; }
        public List<ExaminationStudentStatistics> ExaminationStudentStatistics { get; set; }
         
    }
    
    public class ExaminationSpecialityStatistics:AbstractExaminationStatistics
    {
        public long ExaminationSpecialityId { get; set; } 
    }
    
    public class ExaminationStudentStatistics
    {
        public ExaminationStudentStatistics() {}
        public ExaminationStudentStatistics(ExaminationStudent examinationStudent)
        {
        ExaminationStudentId = examinationStudent.Id;
            List<Paper> papers = examinationStudent.Papers;
            if (papers != null && papers.Count > 0)
            {
                Score = papers.Sum(p =>
                {
                    if (p.Score != null) return p.Score.Value * p.Test.Coefficient;
                    return 0;
                });
                TestCount = papers.Count;
                CorrectedTestCount = papers.Count(p => p.IsCorrected);
                Radical = papers.Sum(p => p.Test.Radical * p.Test.Coefficient);
                Mean = Score / Radical; 
            }
        }

        public long ExaminationStudentId { get; set; }
        public double Score { get; }
        public int TestCount { get; }
        public int CorrectedTestCount { get; }
        public double Radical { get;   }
        public double Mean { get; }
    }
}