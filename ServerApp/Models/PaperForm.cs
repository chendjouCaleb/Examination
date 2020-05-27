using System;

namespace Exam.Models
{
    public class PaperCollectForm
    {
        public string Comment { get; set; }
        public DateTime EndDate { get; set; }
    }
    
    
    public class PaperReportForm
    {
        public string Comment { get; set; }
        public string Anonymity  { get; set; }
    }
}