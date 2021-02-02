using System.ComponentModel.DataAnnotations;

namespace Exam.Models
{
    public class RoomForm
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        public uint Capacity { get; set; }
        
        [Required]
        public string Address { get; set; }
    }

    public class RoomInfoForm
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        public uint Capacity { get; set; }
        
        [Required]
        public string Address { get; set; }
    }
}