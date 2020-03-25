using System.Collections.Generic;
using Everest.AspNetStartup.Models;
using Newtonsoft.Json;

namespace Examination.Entities
{
    public class Speciality:Entity<long>
    {
        public string Name { get; set; }

        [JsonIgnore]
        public virtual Examination Examination { get; set; }
        public long? ExaminationId { get; set; }

        [JsonIgnore]
        public virtual List<Student> Students { get; set; }
        public int StudentCount { get; set; }
        
        [JsonIgnore]
        public virtual List<Test> Tests { get; set; }
        public int TestCount { get; set; }
    }
}