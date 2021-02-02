using System.ComponentModel.DataAnnotations;

namespace Exam.Models
{
    public class SpecialityForm
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Description { get; set; }
    }
    
    
    public class SpecialityEditForm
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Description { get; set; }
    }
}