using System.ComponentModel.DataAnnotations;

namespace Exam.Models
{
    public class AddDepartmentForm
    {
        [Required] [MinLength(2)] public string Name { get; set; }

        [Required] [MinLength(2)] public string Acronym { get; set; }

        [Required] [MinLength(2)] public string Address { get; set; }

        [Required] public string UserId { get; set; }
    }


    public class EditDepartmentForm
    {
        [Required] [MinLength(2)] public string Name { get; set; }

        [Required] [MinLength(2)] public string Acronym { get; set; }

        [Required] [MinLength(2)] public string Address { get; set; }
    }
}