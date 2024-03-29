﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Department:Entity<long>
    {
        public string Name { get; set; }

        public string Acronym { get; set; }
        public string Address { get; set; }
        
        public string PrincipalUserId { get; set; }
        public bool HasImage { get; set; }
        public bool HasCoverImage { get; set; }
        
        public virtual School School { get; set; }
        public long SchoolId { get; set; }
        
        [JsonIgnore]
        public virtual List<Student> Students { get; set; }
        
        [JsonIgnore]
        public virtual List<Teacher> Teachers { get; set; }
        
        [JsonIgnore] 
        public virtual List<Application> Applications { get; set; }

        [JsonIgnore]
        public virtual List<Room> Rooms { get; set; }

        [JsonIgnore]
        public virtual List<Level> Levels { get; set; }
        
        [JsonIgnore]
        public virtual List<Speciality> Specialities { get; set; }
        
        [JsonIgnore]
        public virtual List<Principal> Principals { get; set; }
        
        [JsonIgnore]
        public virtual List<Corrector> Correctors { get; set; }
        
        [JsonIgnore]
        public virtual List<Supervisor> Supervisors { get; set; }
        
        [JsonIgnore]
        public virtual List<Secretary> Secretaries { get; set; }

        [NotMapped]
        public bool IsPrincipalUser { get; set; }
        
        [NotMapped]
        public bool IsStudent { get; set; }
        
        [NotMapped]
        public bool IsPrincipal { get; set; }
        
        [NotMapped]
        public bool IsSupervisor { get; set; }
        
        [NotMapped]
        public bool IsSecretary { get; set; }
        
        [NotMapped]
        public bool IsCorrector { get; set; }
        
    }
}