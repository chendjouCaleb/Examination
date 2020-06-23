namespace Exam.Models.Statistics
{
    public class GroupStatistics
    {
        public int StudentCount { get; set; }

        public int RemainingCapacity { get; set; }
        public int TestCount { get; set; }
        public int WaitingTestCount { get; set; }
        public int ProgressTestCount => TestCount - WaitingTestCount - CompletedTestCount;
        public int ClosedTestCount { get; set; }
        public int CompletedTestCount { get; set; }
        public int PublishedTestCount { get; set; }
    }
}