using System;
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



    public class AddCourseTeacherForm
    {
        public bool Tutorial { get; set; }
        public bool Lecture { get; set; }
        public bool IsPrincipal { get; set; }
    }


    public class AddCourseHour
    {
        public DayOfWeek DayOfWeek { get; set; }

        public TimeSpan StartHour { get; set; }

        public TimeSpan EndHour { get; set; }
        
        public bool Lecture { get; set; }
    }
    
    public class EditCourseHour
    {
        public DayOfWeek DayOfWeek { get; set; }

        public TimeSpan StartHour { get; set; }

        public TimeSpan EndHour { get; set; }
    }

    public class AddCourseSessionForm
    {
        public DateTime ExpectedStartDate { get; set; }
        public DateTime ExpectedEndDate { get; set; }

        public string Objective { get; set; }
        public bool Lecture { get; set; }
    }

    public class CourseSessionHourForm
    {
        public DateTime ExpectedStartDate { get; set; }
        public DateTime ExpectedEndDate { get; set; }
    }

    public class CourseSessionReportForm
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Report { get; set; }
        public int Presence { get; set; }
    }


}