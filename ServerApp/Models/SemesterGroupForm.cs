using System.ComponentModel.DataAnnotations;

namespace Exam.Models
{
    public class SemesterGroupAddForm
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        public uint Capacity { get; set; }
    }
}