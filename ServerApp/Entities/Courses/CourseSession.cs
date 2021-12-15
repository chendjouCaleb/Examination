using System;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Exam.Entities.Periods;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Entities.Courses
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class CourseSession: Entity<long>
    {
        public virtual SemesterCourseTeacher SemesterCourseTeacher { get; set; }
        public long? SemesterCourseTeacherId { get; set; }

        public virtual CourseHour CourseHour { get; set; }
        public long? CourseHourId { get; set; }
        
        public virtual SemesterCourse SemesterCourse { get; set; }
        public long SemesterCourseId { get; set; }

        public virtual Room Room { get; set; }
        public long? RoomId { get; set; }

        public DateTime? ExpectedStartDate { get; set; }
        public DateTime? ExpectedEndDate { get; set; }
        
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public string Objective { get; set; }
        public string Report { get; set; }
        public int? Presence { get; set; }
        public bool Lecture { get; set; }
    }
}