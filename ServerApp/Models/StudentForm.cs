using System;

namespace Exam.Models
{
    public class StudentForm
    {
        public string RegistrationId { get; set; }
        public string FullName { get; set; }
        public DateTime BirthDate { get; set; }
        
        public char Gender { get; set; }
        
    }


    public class StudentFormInfo
    {
        public string FullName { get; set; }
        public DateTime BirthDate { get; set; }
        public char Gender { get; set; }
    }
}