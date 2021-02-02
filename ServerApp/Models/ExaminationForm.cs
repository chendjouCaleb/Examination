using System;
using System.ComponentModel.DataAnnotations;

namespace Exam.Models
{
    public class ExaminationForm
    {
        [Required]    
        public string Name { get; set; }
        
        [Required]
        public DateTime ExpectedStartDate { get; set; }
        
        [Required]
        public DateTime ExpectedEndDate { get; set; }
    }
}