using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Speciality:Entity<long>
    {
        public string Name { get; set; }
        
        public DateTime? LastGroupingDate { get; set; }

        public bool Grouped { get; set; }

        [JsonIgnore]
        public virtual Examination Examination { get; set; }
        public long? ExaminationId { get; set; }

        [JsonIgnore]
        public virtual List<Student> Students { get; set; }
        public int StudentCount { get; set; }
        
        [JsonIgnore]
        public virtual List<Group> Groups { get; set; }
        public int GroupCount { get; set; }
        
        
        [JsonIgnore]
        public virtual List<Test> Tests { get; set; }
        public int TestCount { get; set; }
        
        [JsonIgnore] 
        public virtual List<Application> Applications { get; set; }

        public int ApplicationCount { get; set; }
        public int AcceptedApplicationCount { get; set; }
        public int RejectedApplicationCount { get; set; }
    }
}