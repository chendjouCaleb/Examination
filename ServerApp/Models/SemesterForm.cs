using System;
using System.ComponentModel.DataAnnotations;
using Exam.Validators;

namespace Exam.Models
{
    public class SemesterForm
    {
        [Required]
        [Future]
        public DateTime ExpectedStartDate { get; set; }
        
        [Required]
        [Future]
        public DateTime ExpectedEndDate { get; set; }
        
    }
}