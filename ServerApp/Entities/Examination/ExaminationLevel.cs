
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class ExaminationLevel:Entity<long>
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        
        [NotMapped]
        public string Statistics { get; set; }
       
        public virtual Level Level { get; set; }

        public long? LevelId { get; set; }

        
        [JsonIgnore]
        public virtual ExaminationDepartment ExaminationDepartment { get; set; }
        public long? ExaminationDepartmentId { get; set; }
        
        [JsonIgnore]
        public virtual List<ExaminationLevelSpeciality> ExaminationLevelSpecialities { get; set; }
        
        [JsonIgnore]
        public virtual List<ExaminationStudent> ExaminationStudents { get; set; }
        
        [JsonIgnore]
        public virtual List<Test> Tests { get; set; }
        
    }
}