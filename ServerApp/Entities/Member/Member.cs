using System.ComponentModel.DataAnnotations.Schema;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Member:Entity<long>
    {
        public Member()
        {
            
        }

        public Member(string userId, School school)
        {
            UserId = userId;
            School = school;
        }

        public string UserId { get; set; }

        [JsonIgnore]
        [InverseProperty("Members")]
        public virtual School School { get; set; }
        public long? SchoolId { get; set; }

        [JsonIgnore]
        public virtual Corrector Corrector {get; set;}

        [JsonIgnore]
        public virtual Principal Principal {get; set;}
    }
}