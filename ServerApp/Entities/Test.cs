using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Test : Entity<long>, IPeriod
    {
        public string PrincipalUserId { get; set; }
        
        public string Name { get; set; }

        public string Code { get; set; }
        
        public int Coefficient { get; set; }

        public bool IsPublished { get; set; }
        
        public bool IsClosed { get; set; }

        public bool UseAnonymity { get; set; }

        public DateTime? PublicationDate { get; set; }
        public DateTime? ClosingDate { get; set; }
        
        public DateTime ExpectedStartDate { get; set; }
        public DateTime ExpectedEndDate { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        
        [JsonIgnore]
        public virtual Speciality Speciality { get; set; }
        public long? SpecialityId;
        
        
        [JsonIgnore]
        public virtual Examination Examination { get; set; }
        public long? ExaminationId;
        
        [JsonIgnore]
        public virtual List<TestReview> Reviews { get; set; }
        public int ReviewCount { get; set; }
        
        
        [JsonIgnore]
        public virtual List<Group> Groups { get; set; }
        public int GroupCount { get; set; }
        
        public int PaperCount;

        public string State => this.GetState();
    }
}