using System;

namespace Exam.Models
{
    public class ExaminationForm
    {
        public string Name { get; set; }
        public DateTime ExpectedStartDate { get; set; }
        public DateTime ExpectedEndDate { get; set; }
        public bool RequireSpeciality { get; set; }
    }
}