using Exam.Entities;

namespace Exam.Statistics
{
    public class ExaminationStudentStatisticsBuilder
    {
        public ExaminationStudentStatistics GetStatistics(ExaminationStudent examinationStudent)
        {
            return new ExaminationStudentStatistics(examinationStudent);
        }
    }
}