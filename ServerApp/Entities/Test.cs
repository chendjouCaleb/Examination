using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Test : Entity<long>, IExtendedPeriod
    {
        public string RegisterUserId { get; set; }
        
        public string Name { get; set; }

        public string Code { get; set; }
        
        public uint Coefficient { get; set; }

        [NotMapped] public bool IsPublished => PublicationDate != null;
        
        public DateTime? PublicationDate { get; set; }


        [NotMapped] public bool IsClosed => ClosingDate != null;
        public DateTime? ClosingDate { get; set; }

        public bool UseAnonymity { get; set; }
        
        
        
        public DateTime ExpectedStartDate { get; set; }
        public DateTime ExpectedEndDate { get; set; }
        
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        
        
        [JsonIgnore]
        public virtual Speciality Speciality { get; set; }
        public long? SpecialityId{ get; set; } 
        
        
        [JsonIgnore]
        public virtual Examination Examination { get; set; }
        public long? ExaminationId{ get; set; } 
        
        [JsonIgnore]
        public virtual List<TestReview> Reviews { get; set; }
        public int ReviewCount { get; set; }
        
        
        [JsonIgnore]
        public virtual List<TestGroup> Groups { get; set; }
        public int GroupCount { get; set; }
        
        public int PaperCount;

        public string State
        {
            get
            {
                if (Groups.TrueForAll(g => g.GetState() == PeriodState.FINISHED))
                {
                    return PeriodState.FINISHED;
                }
                
                if (Groups.TrueForAll(g => g.GetState() == PeriodState.PENDING))
                {
                    return PeriodState.PENDING;
                }

                return PeriodState.PROGRESS;
            }
        }
    }
}