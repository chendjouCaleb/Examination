namespace Exam.Entities
{
    public class UserOrganisation
    {
        public string UserId { get; set; }
        
        public bool IsPrincipal { get; set; }

        public bool IsAdmin { get; set; }
    }
}