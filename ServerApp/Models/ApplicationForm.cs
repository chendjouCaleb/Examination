using System;

namespace Exam.Models
{
    public class ApplicationForm
    {
        public string RegistrationId { get; set; }
        
        public string FullName { get; set; }
        
        public DateTime BirthDate { get; set; }
        public char Gender { get; set; }
    }
}