using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities.Periods
{
    
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class YearStudent:Entity<long>
    {
        public virtual Student Student { get; set; }
        public long? StudentId { get; set; }

        [JsonIgnore]
        public virtual YearLevel YearLevel { get; set; }
        public long YearLevelId { get; set; }

        [JsonIgnore]
        public virtual YearLevelSpeciality YearLevelSpeciality { get; set; }
        public long? YearLevelSpecialityId { get; set; }

        [JsonIgnore]
        public virtual List<SemesterStudent> SemesterStudents { get; set; }
    }
}