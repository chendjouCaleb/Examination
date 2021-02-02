using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class TestScore:Entity<long>
    {
        public string Name { get; set; }
        
        public double Radical { get; set; }

        [JsonIgnore]
        public virtual Test Test { get; set; }
        public long TestId { get; set; }
    }
}