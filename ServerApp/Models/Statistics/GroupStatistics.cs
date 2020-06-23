namespace Exam.Models.Statistics
{
    public class GroupStatistics
    {
        public int StudentCount { get; set; }

        public int RemainingCapacity { get; set; }
        public int TestCount { get; set; }
        public int WaitingTestCount => TestCount - ProgressTestCount - ClosedTestCount;
        public int ProgressTestCount { get; set; }
        public int ClosedTestCount { get; set; }
    }
}