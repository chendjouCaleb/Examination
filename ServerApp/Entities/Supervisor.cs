using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Supervisor:Entity<long>
    {
        public string UserId { get; set; }
        
        [JsonIgnore]
        public virtual Examination Examination { get; set; }
        public long ExaminationId { get; set; }
        
        [JsonIgnore] 
        public virtual List<TestGroupSupervisor> TestGroupSupervisors { get; set; }
    }

    
}