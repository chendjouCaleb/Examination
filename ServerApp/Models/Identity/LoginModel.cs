using System.ComponentModel.DataAnnotations;

namespace Exam.Models.Identity
{
    public class LoginModel
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Password { get; set; }
        
        public bool IsPersisted { get; set; }
    }
}