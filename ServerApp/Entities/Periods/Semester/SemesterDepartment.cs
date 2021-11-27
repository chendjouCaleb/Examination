using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities.Periods
{
    
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class SemesterDepartment:PeriodChild
    {
        [JsonIgnore]
        public virtual YearDepartment YearDepartment { get; set; }
        public long? YearDepartmentId { get; set; }

        [JsonIgnore]
        public virtual Semester Semester { get; set; }
        public long? SemesterId { get; set; }

        [JsonIgnore]
        public virtual List<SemesterLevel> SemesterLevels { get; set; }

        [JsonIgnore]
        public virtual List<SemesterSpeciality> SemesterSpecialities { get; set; }
        
        [JsonIgnore]
        public virtual List<SemesterTeacher> SemesterTeachers { get; set; }
    }
}