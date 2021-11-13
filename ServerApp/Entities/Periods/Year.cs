using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities.Periods
{
    
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Year : Period, IEntity<long>
    {
        public long Id { get; set; }

        public DateTime RegistrationDate { get; set; } = DateTime.Now;
        
        [JsonIgnore]
        public virtual School School { get; set; }
        public long SchoolId { get; set; }
        
        public DateTime ExpectedStartDate { get; set; }
        public DateTime ExpectedEndDate { get; set; }

        [JsonIgnore]
        public virtual List<YearDepartment> YearDepartments { get; set; }
    }
}