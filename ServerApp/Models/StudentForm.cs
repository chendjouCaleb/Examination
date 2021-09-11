using System;
using Microsoft.AspNetCore.Http;

namespace Exam.Models
{
    public class StudentForm
    {
        public string RegistrationId { get; set; }
        public string FullName { get; set; }
        public DateTime BirthDate { get; set; }
        public string BirthPlace { get; set; }
        
        public char Gender { get; set; }
        
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        
        public IFormFile Image { get; set; }
        
    }


    public class StudentFormInfo
    {
        public string FullName { get; set; }
        public DateTime BirthDate { get; set; }

        public string BirthPlace { get; set; }
        public char Gender { get; set; }
    }

    public class StudentFormContact
    {
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
    }
}