using System;
using System.ComponentModel.DataAnnotations.Schema;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Student:Entity<long>
    {
        public string RegistrationId { get; set; }
        public string FullName { get; set; }
        public DateTime BirthDate { get; set; }
        public string BirthPlace { get; set; }
        public char Gender { get; set; }

        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        
        public bool HasImage { get; set; }
        [NotMapped] public Uri ImageUrl { get; set; }
        
        public string UserId { get; set; }

        public string RegisterUserId { get; set; }

        [JsonIgnore] 
        public virtual Application Application { get; set; }
        
        [JsonIgnore] 
        public virtual Level Level { get; set; }
        public long LevelId { get; set; }
        
        [JsonIgnore]
        public virtual LevelSpeciality LevelSpeciality { get; set; }
        public long? LevelSpecialityId{ get; set; }
        
        
        
    }
}