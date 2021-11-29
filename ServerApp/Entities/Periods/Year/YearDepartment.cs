using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities.Periods
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class YearDepartment: PeriodChild
    {
        [JsonIgnore]
        public virtual Year Year { get; set; }
        public long YearId { get; set; }
        
       
        public virtual Department Department { get; set; }
        public virtual long? DepartmentId { get; set; }

        [JsonIgnore]
        public virtual List<YearLevel> YearLevels { get; set; }
        
        [JsonIgnore]
        public virtual List<YearSpeciality> YearSpecialities { get; set; }

        [JsonIgnore]
        public virtual List<SemesterDepartment> SemesterDepartments { get; set; }
        
        [JsonIgnore] 
        public virtual List<YearTeacher> YearTeachers { get; set; }
        
        
    }
}