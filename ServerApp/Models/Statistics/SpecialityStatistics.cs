namespace Exam.Models.Statistics
{
    public class SpecialityStatistics
    {
        public int StudentCount { get; set; }
        public int NonGroupedStudentsCount { get; set; }

        public int GroupCount { get; set; }

        public int TestCount { get; set; }
        public int WaitingTestCount { get; set; }
        public int ProgressTestCount => TestCount - WaitingTestCount - CompletedTestCount;
        public int ClosedTestCount { get; set; }
        public int CompletedTestCount { get; set; }
        public int PublishedTestCount { get; set; }
        
        public int ApplicationCount { get; set; }
        public int AcceptedApplicationCount { get; set; }
        public int RejectedApplicationCount => ApplicationCount - AcceptedApplicationCount - WaitingApplicationCount;
        public int WaitingApplicationCount { get; set; }

    }
}