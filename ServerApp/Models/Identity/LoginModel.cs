using System.ComponentModel.DataAnnotations;

namespace Exam.Models
{
    public class LoginModel
    {
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
        
        public bool IsPersisted { get; set; }
    }
}