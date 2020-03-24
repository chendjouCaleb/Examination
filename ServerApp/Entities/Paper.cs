using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Everest.AspNetStartup.Models;

namespace Examination.Entities
{
    public class Paper:Entity<long>
    {
        public decimal Score { get; set; }

        public bool IsPresent { get; set; }

        [JsonIgnore]
        public string Anonymity { get; set; }

        public int TableNumber { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public virtual Corrector Corrector { get; set; }
        public long CorrectorId { get; set; }

        public virtual Test Test { get; set; }
        public long TestId { get; set; }
        
        public virtual Student Student { get; set; }
        public long StudentId { get; set; }
        
        public virtual Supervisor Supervisor { get; set; }
        public long SupervisorId { get; set; }
        
        public virtual List<Contest> Contests { get; set; }
        

        [JsonIgnore]
        public virtual List<PaperReview> Reviews { get; set; }
        
        public int ReviewCount { get; set; }
    }
}