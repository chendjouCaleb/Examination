using System.ComponentModel.DataAnnotations;

namespace Exam.Infrastructure
{
    public class RefreshTokenForm
    {
        [Required]
        public string Code { get; set; }
        
        [Required]
        public string RefreshToken { get; set; }
        
        [Required]
        public string AccessToken { get; set; }
    }
}