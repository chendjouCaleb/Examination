namespace Exam.Entities
{
    public class UserExamination
    {
        public string UserId { get; set; }

        public bool IsCorrector { get; set; }

        public bool IsPrincipal { get; set; }

        public bool IsSecretary { get; set; }

        public bool IsSupervisor { get; set; }
        
        public bool IsStudent { get; set; }
    }
}