using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Exam.Models.Statistics;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Examination:Entity<long>, IPeriod
    {
        public string Name { get; set; }
        
        public bool IsClosed { get; set; }
        
        public DateTime ExpectedStartDate { get; set; }
        public DateTime ExpectedEndDate { get; set; }
        
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        

        [JsonIgnore]
        public virtual School School { get; set; }
        public long SchoolId { get; set; }
        
        public string State => this.GetState();
        
        [JsonIgnore] 
        public virtual List<ExaminationDepartment> ExaminationDepartments { get; set; }
        
        
        [NotMapped] 
        public string Statistics { get; set; }
    }
}