using System.Collections.Generic;
using System.Text.Json.Serialization;
using Everest.AspNetStartup.Models;

namespace Examination.Entities
{
    public class Student:Entity<long>
    {
        public string RegistrationId { get; set; }
        public string UserId { get; set; }

        public string FullName { get; set; }

        public int Position { get; set; }
        
        [JsonIgnore]
        public virtual Examination Examination { get; set; }
        public long ExaminationId;

        [JsonIgnore]
        public virtual List<Paper> Papers { get; set; }
        public int PaperCount { get; set; }
        
        
    }
}