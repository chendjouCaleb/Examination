using System.ComponentModel.DataAnnotations;

namespace Exam.Models
{
    public class CourseForm
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Code { get; set; }

        [Range(1, 1000)]
        public uint Radical { get; set; }

        public bool IsGeneral { get; set; }


        [Required]
        [Range(1, 100)]
        public uint Coefficient { get; set; }
    }
}