using System;

namespace Exam.Models
{
    public class ExaminationForm
    {
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool RequireSpeciality { get; set; }
    }
}