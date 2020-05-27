using System;

namespace Exam.Models
{
    public class ExpectedPeriodForm
    {
        public DateTime ExpectedStartDate { get; set; }
        public DateTime ExpectedEndDate { get; set; }
    }
    
    
    public class PeriodForm
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}