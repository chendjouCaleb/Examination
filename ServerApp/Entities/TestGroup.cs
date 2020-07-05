using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class TestGroup:Entity<long>, IPeriod
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public bool IsClosed { get; set; }
        
        [JsonIgnore] 
        public virtual Group Group { get; set; }
        public long? GroupId { get; set; }
        
        
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
        public virtual List<TestGroupSupervisor> TestGroupSupervisors { get; set; }
        
        [JsonIgnore]
        public virtual List<TestGroupSecretary> TestGroupSecretaries { get; set; }
        
        [JsonIgnore] 
        public virtual List<TestGroupCorrector> TestGroupCorrectors { get; set; }
        
    }
    
    public class UserTestGroup
    {
        public bool IsCorrector { get; set; }
        public bool IsSupervisor { get; set; }
        public bool IsSecretary { get; set; }
        public bool IsStudent { get; set; }
    }
    
    public class TestGroupStatistics
    {
        public int Presence { get; set; }
    }
}