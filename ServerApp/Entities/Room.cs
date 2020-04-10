using System.Collections.Generic;
using Everest.AspNetStartup.Models;
using Newtonsoft.Json;

namespace Exam.Entities
{
    public class Room : Entity<long>
    {
        public string Name { get; set; }
        public uint Capacity { get; set; }
        public string Address { get; set; }
        
        public virtual Organisation Organisation { get; set; }
        public long OrganisationId { get; set; }
        
        [JsonIgnore]
        public virtual List<Group> Groups { get; set; }
        public uint GroupCount { get; set; }

        public virtual List<TestGroup> TestGroups { get; set; }
        public uint TestGroupCount { get; set; }
    }
}