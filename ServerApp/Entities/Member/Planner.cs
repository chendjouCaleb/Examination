
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    /// <summary>
    /// Personne chargée de dresser les emplois du temps.
    /// 
    /// </summary>
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Planner : Entity<long>
    {
        public string RegisterUserId { get; set; }
        public string UserId { get; set; }
        
        
        [JsonIgnore]
        public virtual Member Member { get; set; }
        public long MemberId { get; set; }

        [JsonIgnore]
        public virtual School School { get; set; }
        public long SchoolId { get; set; }
    }
}