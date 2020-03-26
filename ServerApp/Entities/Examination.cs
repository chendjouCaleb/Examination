using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Examination:Entity<long>, IPeriod
    {
        public string UserId { get; set; }

        public string AdminUserId { get; set; }
        
        public string Name { get; set; }

        public bool RequireSpeciality { get; set; }
        
        public DateTime ExpectedStartDate { get; set; }
        public DateTime ExpectedEndDate { get; set; }
        
        public DateTime? RealStartDate { get; set; }
        public DateTime? RealEndDate { get; set; }
        
        public string State => this.GetState();
        
        [JsonIgnore]
        public virtual List<Student> Students { get; set; }
        public int StudentCount { get; set; }
        
        [JsonIgnore]
        public virtual List<Speciality> Specialities { get; set; }
        public int SpecialityCount;
        
        
        [JsonIgnore]
        public virtual List<ExaminationReview> Reviews { get; set; }
        
        public int ReviewCount { get; set; }
        public int ReviewAverage { get; set; }
    }
}