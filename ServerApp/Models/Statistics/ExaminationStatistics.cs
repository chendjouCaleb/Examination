namespace Exam.Models.Statistics
{
    public class ExaminationStatistics
    {
        public int SecretaryCount{ get; set; }
        public int SupervisorCount { get; set; }
        public int CorrectorCount { get; set; }
        public int PrincipalCount { get; set; }
        public int StudentCount { get; set; }
        
        public int TestCount { get; set; }
        public int WaitingTestCount => TestCount - ProgressTestCount - CompletedTestCount;
        public int ProgressTestCount { get; set; }
        public int ClosedTestCount { get; set; }
        
        public int CompletedTestCount { get; set; }

        public int PublishedTestCount { get; set; }

        public int NonGroupedStudentsCount { get; set; }
        public int GroupCount { get; set; }
        public int SpecialityCount { get; set; }
    }
}