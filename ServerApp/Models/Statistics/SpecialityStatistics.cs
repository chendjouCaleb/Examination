namespace Exam.Models.Statistics
{
    public class SpecialityStatistics
    {
        public int StudentCount { get; set; }
        public int NonGroupedStudentsCount { get; set; }

        public int GroupCount { get; set; }

        public int TestCount { get; set; }
        public int WaitingTestCount => TestCount - ProgressTestCount - ClosedTestCount;
        public int ProgressTestCount { get; set; }
        public int ClosedTestCount { get; set; }
        
        public int ApplicationCount { get; set; }
        public int AcceptedApplicationCount { get; set; }
        public int RejectedApplicationCount { get; set; }
        public int WaitingApplicationCount => ApplicationCount - AcceptedApplicationCount - RejectedApplicationCount;

    }
}