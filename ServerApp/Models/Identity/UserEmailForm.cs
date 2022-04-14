using System.ComponentModel.DataAnnotations;

namespace Exam.Models
{
    public class UserEmailForm
    {
        [Required] public string Code { get; set; }

        [Required] [EmailAddress] public string Email { get; set; }
    }
}