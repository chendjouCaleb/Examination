﻿using System.Collections.Generic;
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
        public virtual Member Member { get; set; }
        public long MemberId { get; set; }

        [JsonIgnore]
        public virtual Department Department { get; set; }
        public long DepartmentId { get; set; }
        
        [JsonIgnore] 
        public virtual List<TestGroupSupervisor> TestGroupSupervisors { get; set; }
    }

    
}