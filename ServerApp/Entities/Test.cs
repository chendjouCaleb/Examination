using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Test : Entity<long>
    {
        public string Name { get; set; }

        public string Code { get; set; }

        public string Room { get; set; }

        public int Coefficient { get; set; }

        public bool UseAnonymity { get; set; }
        

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public DateTime? RealStartDate { get; set; }
        public DateTime? RealEndDate { get; set; }
        
        [JsonIgnore]
        public virtual Speciality Speciality { get; set; }
        public long? GroupId;
        
        [JsonIgnore]
        public virtual List<TestReview> Reviews { get; set; }
        public int ReviewCount { get; set; }
        
        [JsonIgnore]
        public virtual List<TestSupervisor> TestSupervisors { get; set; }
        public int TestSupervisorCount { get; set; }
        
        [JsonIgnore]
        public virtual List<Group> Groups { get; set; }
        public int GroupCount { get; set; }

        [JsonIgnore]
        public virtual List<Paper> Papers { get; set; }

        public int PaperCount;

        public string State
        {
            get
            {
                if (RealEndDate != null)
                {
                    return PeriodState.FINISHED;
                }

                if (RealStartDate != null)
                {
                    return PeriodState.PROGRESS;
                }

                return PeriodState.PENDING;
            }
        }
    }
}