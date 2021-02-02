namespace Exam.Models.Statistics
{
    public class SchoolStatistics
    {
        public int SecretaryCount{ get; set; }
        public int SupervisorCount { get; set; }
        public int CorrectorCount { get; set; }
        public int PrincipalCount { get; set; }
        public int StudentCount { get; set; }
        public int AdminCount { get; set; }
        public int ExaminationCount { get; set; }
        public int DepartmentCount { get; set; }

        public int WaitingExaminationCount { get; set; }
        public int ProgressExaminationCount { get; set; }
        public int ClosedExaminationCount { get; set; }
        public int RoomCount { get; set; }

        public int Capacity { get; set; }
    }
}