using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Contest:Entity<long>
    {
        public string Comment { get; set; }
        
        public bool Resolved { get; set; }

        [JsonIgnore]
        public virtual Paper Paper { get; set; }
        public long PaperId { get; set; }
    }
}