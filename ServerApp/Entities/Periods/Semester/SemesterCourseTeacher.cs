using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;

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
    }
}