using System.Collections.Generic;
using System.Text.Json.Serialization;
using Everest.AspNetStartup.Models;

namespace Exam.Entities
{
    public class PaperManager:Entity<long>
    {
        public string RegisterUserId { get; set; }

        public string UserId { get; set; }
        
        [JsonIgnore]
        public virtual TestGroup TestGroup { get; set; }
        public long TestGroupId { get; set; }


        [JsonIgnore]
        public virtual List<Paper> Papers { get; set; }
        public int PaperCount { get; set; }
    }
}