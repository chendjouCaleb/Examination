using System.ComponentModel.DataAnnotations;

namespace Exam.Models.Identity
{
    public class VerifyResetTokenForm
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        public string Token { get; set; }
    }
}