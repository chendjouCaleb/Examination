﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Everest.AspNetStartup.Models;

namespace Examination.Entities
{
    public class Examination:Entity<long>
    {
        public string Name { get; set; }
        
        
        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }
        
        [JsonIgnore]
        public virtual List<Student> Students { get; set; }

        public int StudentCount { get; set; }
        
        [JsonIgnore]
        public virtual List<ExaminationReview> Reviews { get; set; }
        
        public int ReviewCount { get; set; }
    }
}