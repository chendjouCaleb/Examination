using Everest.AspNetStartup.Models;
using Newtonsoft.Json;

namespace Examination.Entities
{
    public class Contest:Entity<long>
    {
        public string Comment { get; set; }
        
        public bool Resolved { get; set; }

        [JsonIgnore]
        public virtual Paper Paper { get; set; }
        public long PaperId { get; set; }
    }
}