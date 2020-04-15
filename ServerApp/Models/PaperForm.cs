using System;

namespace Exam.Models
{
    public class PaperReportForm
    {
        public string Comment { get; set; }
        public DateTime EndDate { get; set; }
    }
    
    
    public class PaperManageForm
    {
        public string Comment { get; set; }
        public string Anonymity  { get; set; }
    }
}