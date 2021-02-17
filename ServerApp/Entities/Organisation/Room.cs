﻿using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Room : Entity<long>
    {
        public string Name { get; set; }
        public uint Capacity { get; set; }
        public string Address { get; set; }
        
        public string RegisterUserId { get; set; }
        
        [JsonIgnore]
        public virtual School School { get; set; }
        public long SchoolId { get; set; }
        
        [JsonIgnore]
        public virtual Department Department { get; set; }
        public long? DepartmentId { get; set; }

        [JsonIgnore]
        public virtual Level Level  { get; set; }
        public long? LevelId { get; set; }
        
    }
}