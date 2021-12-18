using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities.Periods
{
    
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class SemesterSpeciality: PeriodChild
    {
         [JsonIgnore]
        public virtual SemesterDepartment SemesterDepartment { get; set; }
        public long? SemesterDepartmentId { get; set; }

        [JsonIgnore]
        public virtual YearSpeciality YearSpeciality { get; set; }
        public long? YearSpecialityId { get; set; }

        [JsonIgnore]
        public virtual List<SemesterLevelSpeciality> SemesterLevelSpecialities { get; set; }
        
        [JsonIgnore]
        public virtual List<ExaminationSpeciality> ExaminationSpecialities { get; set; }
    }
}