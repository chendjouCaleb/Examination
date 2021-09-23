using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Exam.Models
{
    public class StudentForm
    {
        [Required]
        public string RegistrationId { get; set; }
        
        [Required]
        public string FullName { get; set; }
        
        [DataType(DataType.Date)]
        public DateTime BirthDate { get; set; }
        
        [Required]
        public string BirthPlace { get; set; }
        
        [Required]
        public char Gender { get; set; }
        
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        
        public IFormFile Image { get; set; }
    }


    public class StudentFormInfo
    {
        [Required]
        public string FullName { get; set; }
        
        [Required]
        public DateTime BirthDate { get; set; }

        [Required]
        public string BirthPlace { get; set; }
        
        [Required]
        public char Gender { get; set; }
    }

    public class StudentFormContact
    {
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
    }
}