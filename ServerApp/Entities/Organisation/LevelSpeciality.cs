using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Exam.Entities.Periods;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class LevelSpeciality:Entity<long>
    {
        
        [JsonIgnore]
        public virtual Speciality Speciality { get; set; }
        public long? SpecialityId { get; set; }

        [JsonIgnore]
        public virtual Level Level { get; set; }
        public long? LevelId { get; set; }
        
        [JsonIgnore]
        public virtual List<Student> Students { get; set; }
        
        [JsonIgnore]
        public virtual List<Application> Applications { get; set; }
        
        [JsonIgnore]
        public virtual List<YearLevelSpeciality> YearLevelSpecialities { get; set; }
    }
}