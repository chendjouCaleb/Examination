using System;
using System.ComponentModel.DataAnnotations;

namespace Exam.Models
{
    public class AddUserModel
    {
        [Required]
        [MinLength( 3)]
        public string FirstName { get; set; }

        [Required]
        [MinLength( 3)]
        public string LastName { get; set; }
        
        [Required]
        public DateTime BirthDate { get; set; }

       
        [Required]
        public string Gender { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(4)]
        public string UserName { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }
        
        [Required]
        [StringLength(5)]
        public string Code { get; set; }
    }
}