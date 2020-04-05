using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Group:Entity<long>, IPeriod
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        
        [JsonIgnore] 
        public virtual Room Room { get; set; }

        public long RoomId { get; set; }
        
        [JsonIgnore] 
        public virtual Test Test { get; set; }

        public long TestId { get; set; }
        
        [JsonIgnore]
        public virtual List<Paper> Papers { get; set; }

        public uint PaperCount { get; set; }

        [JsonIgnore]
        public virtual List<TestSupervisor> TestSupervisors { get; set; }
        public uint TestSupervisorCount { get; set; }
        
    }
}