using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Exam.Entities.Courses;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities.Periods
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class SemesterCourseTeacher:Entity<long>
    {
        public bool Tutorial { get; set; }
        public bool Lecture { get; set; }

        public bool IsPrincipal { get; set; }
        
        public virtual SemesterCourse SemesterCourse { get; set; }
        public long? SemesterCourseId { get; set; }

        
        public virtual SemesterTeacher SemesterTeacher { get; set; }
        public long? SemesterTeacherId { get; set; }
        
        [JsonIgnore]
        public virtual List<CourseHour> CourseHours { get; set; }
        
        [JsonIgnore]
        public virtual List<CourseSession> CourseSessions { get; set; }
    }
}