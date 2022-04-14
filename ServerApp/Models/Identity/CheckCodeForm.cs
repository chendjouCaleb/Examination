using System.ComponentModel.DataAnnotations;

namespace Exam.Models.Identity
{
    public class CheckCodeForm
    {
        [Required]
        public string EmailOrPhone { get; set; } 
        
        [Required] public string Code { get; set; }
    }
}