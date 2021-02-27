using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities.Courses
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class CourseHour: Entity<long>
    {
        // Cette propriété permet de ne pas avoir de CourseTeacher.
        [JsonIgnore]
        public virtual Course Course { get; set; }
        public long CourseId { get; set; }

        [JsonIgnore]
        public virtual CourseTeacher CourseTeacher { get; set; }
        public long? CourseTeacherId { get; set; }
        
        [JsonIgnore]
        public virtual Room Room { get; set; }
        public long? RoomId { get; set; }

        public DayOfWeek DayOfWeek { get; set; }

        public TimeSpan StartHour { get; set; }

        public TimeSpan EndHour { get; set; }
        
        /// <summary>
        /// Tells if this CourseHour is a lecture or tutorial.
        /// </summary>
        public bool Lecture { get; set; }
        
        [JsonIgnore] public virtual List<CourseSession> CourseSessions { get; set; }
    }
}