using System.ComponentModel.DataAnnotations;

namespace Exam.Models
{
    public class SchoolForm
    {
        [Required]
        public string Identifier { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Address { get; set; }
        
        [Required]
        public string Acronym { get; set; }

        [Required]
        public string Code { get; set; }
    }

    public class SchoolInfoForm
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Address { get; set; }
        
        [Required]
        public string Acronym { get; set; }
    }
}