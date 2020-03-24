using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Models;
using Newtonsoft.Json;

namespace Examination.Entities
{
    public class Test : Entity<long>
    {
        public string Name { get; set; }

        public string Room { get; set; }

        public int Coefficient { get; set; }
        

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public DateTime? RealStartDate { get; set; }
        public DateTime? RealEndDate { get; set; }
        
        [JsonIgnore]
        public virtual List<TestReview> Reviews { get; set; }
        
        public int ReviewCount { get; set; }

        [JsonIgnore]
        public virtual List<Paper> Papers { get; set; }

        public int PaperCount;

        public string State
        {
            get
            {
                if (RealEndDate != null)
                {
                    return "finished";
                }

                if (RealStartDate != null)
                {
                    return "progress";
                }

                return "pending";
            }
        }
    }
}