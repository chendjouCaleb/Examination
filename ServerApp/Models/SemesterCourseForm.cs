using System;
using System.ComponentModel.DataAnnotations;

namespace Exam.Models
{
    public class SemesterCourseForm
    {
        [Range(1, 1000)]
        public uint Radical { get; set; }

        public bool IsGeneral { get; set; }

        public bool PracticalWork { get; set; }


        [Required]
        [Range(1, 100)]
        public uint Coefficient { get; set; }
    }



    public class AddSemesterCourseTeacherForm
    {
        public bool Lecture { get; set; }

        public bool Tutorial { get; set; }
        public bool IsPrincipal { get; set; }
    }
    

}