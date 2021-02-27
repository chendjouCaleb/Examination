using System;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Entities.Courses
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class CourseSession: Entity<long>
    {
        public virtual CourseTeacher CourseTeacher { get; set; }
        public long? CourseTeacherId { get; set; }

        public virtual CourseHour CourseHour { get; set; }
        public long? CourseHourId { get; set; }
        
        public virtual Course Course { get; set; }
        public long CourseId { get; set; }

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