using System;
using System.ComponentModel.DataAnnotations;

namespace Exam.Models.Identity
{
    public class UserInfoForm
    {
        [Required] [MinLength( 3)] public string FirstName { get; set; }

        [Required] [MinLength( 3)] public string LastName { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        [Required]
        [StringLength(1, MinimumLength = 1)] 
        public string Gender { get; set; }
    }
}