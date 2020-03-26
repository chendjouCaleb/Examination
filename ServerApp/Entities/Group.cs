using System.Collections.Generic;
using System.Text.Json.Serialization;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Group:Entity<long>
    {
        public string Name { get; set; }

        public string RoomName { get; set; }
        
        [JsonIgnore]
        public virtual List<Paper> Papers { get; set; }

        public int PaperCount { get; set; }

        [JsonIgnore]
        public virtual List<TestSupervisor> TestSupervisors { get; set; }
        public int TestSupervisorCount { get; set; }
        
    }
}