using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities.Courses
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class CourseTeacher: Entity<long>
    {
        [JsonIgnore]
        public virtual Course Course { get; set; }
        public long? CourseId { get; set; }

        [JsonIgnore]
        public virtual Teacher Teacher { get; set; }
        public long? TeacherId { get; set; }
        
        public bool Tutorial { get; set; }
        public bool Lecture { get; set; }

        public bool IsPrincipal { get; set; }
    }
}