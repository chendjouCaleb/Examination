using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities.Periods
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class YearLevelSpeciality: PeriodChild
    {
        public virtual LevelSpeciality LevelSpeciality { get; set; }
        public long? LevelSpecialityId { get; set; }


        [JsonIgnore]
        public virtual YearLevel YearLevel { get; set; }
        public long? YearLevelId { get; set; }

        [JsonIgnore]
        public virtual YearSpeciality YearSpeciality { get; set; }
        public long? YearSpecialityId { get; set; }

        [JsonIgnore]
        public virtual List<SemesterLevelSpeciality> SemesterLevelSpecialities { get; set; }
        
        [JsonIgnore]
        public virtual List<YearStudent> YearStudents { get; set; }
    }
}