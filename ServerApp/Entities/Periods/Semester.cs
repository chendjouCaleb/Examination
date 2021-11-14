using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities.Periods
{
    
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Semester : Period, IEntity<long>
    {
        public long Id { get; set; }

        public DateTime RegistrationDate { get; set; } = DateTime.Now;
        
        [JsonIgnore]
        public virtual Year Year { get; set; }
        public long YearId { get; set; }
        
        public DateTime ExpectedStartDate { get; set; }
        public DateTime ExpectedEndDate { get; set; }
    }
}