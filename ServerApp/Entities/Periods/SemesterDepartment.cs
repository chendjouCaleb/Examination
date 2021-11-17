using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities.Periods
{
    
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class SemesterDepartment:Entity<long>
    {
        public bool Opened { get; set; }
        public bool Closed { get; set; }
        public bool Pending { get; set; } = true;
        
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
    }
}