using System.ComponentModel.DataAnnotations;

namespace Exam.Models.Identity
{
    public class UpdatePasswordModel
    {
        [Required]
        [MinLength(6)]
        public string CurrentPassword { get; set; }

        [Required]
        [MinLength(6)]
        public string NewPassword { get; set; }
    }
}