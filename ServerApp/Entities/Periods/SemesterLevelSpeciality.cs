using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities.Periods
{
    
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class SemesterLevelSpeciality:Entity<long>
    {
        public bool Opened { get; set; }
        public bool Closed { get; set; }
        public bool Pending { get; set; } = true;
        
        [JsonIgnore]
        public virtual YearLevelSpeciality YearLevelSpeciality { get; set; }
        public long? YearLevelSpecialityId { get; set; }

        [JsonIgnore]
        public virtual SemesterLevel SemesterLevel { get; set; }
        public long? SemesterLevelId { get; set; }

        [JsonIgnore]
        public virtual SemesterSpeciality SemesterSpeciality { get; set; }
        public long? SemesterSpecialityId { get; set; }
    }
}