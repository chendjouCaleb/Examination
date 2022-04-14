using System.ComponentModel.DataAnnotations;

namespace Exam.Models.Identity
{
    public class ResetPasswordForm
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        public string Code { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }
}