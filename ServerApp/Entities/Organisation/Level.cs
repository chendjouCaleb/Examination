using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Exam.Entities.Courses;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Level:Entity<long>
    {
        public int Index { get; set; }

        [JsonIgnore]
        public virtual Department Department { get; set; }
        public long DepartmentId { get; set; }


        [JsonIgnore]
        public virtual List<LevelSpeciality> LevelSpecialities { get; set; }

        [JsonIgnore]
        public virtual List<Course> Courses { get; set; }
        
        [JsonIgnore]
        public virtual List<Student> Students { get; set; }
        
        [JsonIgnore]
        public virtual List<Application> Applications { get; set; }

        [JsonIgnore]
        public virtual List<ExaminationLevel> ExaminationLevels { get; set; }
    }
}