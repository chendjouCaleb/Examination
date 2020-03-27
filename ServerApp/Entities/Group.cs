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
        public string Name { get; set; }

        public string RoomName { get; set; }
        
        public DateTime ExpectedStartDate { get; set; }
        public DateTime ExpectedEndDate { get; set; }

        public DateTime? RealStartDate { get; set; }
        public DateTime? RealEndDate { get; set; }
        
        [JsonIgnore] 
        public virtual Test Test { get; set; }

        public long TestId { get; set; }
        
        [JsonIgnore]
        public virtual List<Paper> Papers { get; set; }

        public int PaperCount { get; set; }

        [JsonIgnore]
        public virtual List<TestSupervisor> TestSupervisors { get; set; }
        public int TestSupervisorCount { get; set; }
        
    }
}