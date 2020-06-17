namespace Exam.Models.Statistics
{
    public class OrganisationStatistics
    {
        public int AdminCount { get; set; }
        public int ExaminationCount { get; set; }

        public int WaitingExaminationCount { get; set; }
        public int ProgressExaminationCount { get; set; }
        public int ClosedExaminationCount { get; set; }
        public int RoomCount { get; set; }

        public int Capacity { get; set; }
    }
}