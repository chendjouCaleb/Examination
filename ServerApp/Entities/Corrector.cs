using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Everest.AspNetStartup.Models;

namespace Examination.Entities
{
    public class Corrector:Entity<long>
    {
        public string UserId { get; set; }

        [JsonIgnore]
        public virtual Examination Examination { get; set; }
        public long ExaminationId { get; set; }
        
        [JsonIgnore] 
        public virtual List<Paper> Papers { get; set; }
        public int PaperCount { get; set; }
        public int CorrectedPaperCount { get; set; }
        
    }
}