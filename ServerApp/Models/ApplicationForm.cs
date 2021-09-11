using System;

namespace Exam.Models
{
    public class ApplicationForm
    {
        public string RegistrationId { get; set; }
        
        public string FullName { get; set; }
        
        public DateTime BirthDate { get; set; }
        public Char Gender { get; set; }
        
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
    }
}