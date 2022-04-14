using System.ComponentModel.DataAnnotations;

namespace Exam.Models.Identity
{
    public class AddUserCodeForm
    {
        [Required]
        public string EmailOrPhone { get; set; } 
    }
}