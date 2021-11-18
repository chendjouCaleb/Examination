using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities.Periods
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class YearLevel: PeriodChild
    {

        [JsonIgnore]
        public virtual YearDepartment YearDepartment { get; set; }
        public long? YearDepartmentId { get; set; }

        [JsonIgnore]
        public virtual Level Level { get; set; }
        public long? LevelId { get; set; }

        [JsonIgnore]
        public virtual List<YearLevelSpeciality> YearLevelSpecialities { get; set; }

        [JsonIgnore] public virtual List<SemesterLevel> SemesterLevels { get; set; }
        
    }
}