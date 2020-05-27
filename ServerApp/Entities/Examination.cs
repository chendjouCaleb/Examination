using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Examination:Entity<long>, IPeriod
    {
        public string RegisterUserId { get; set; }
        public string Name { get; set; }

        public bool RequireSpeciality { get; set; }

        public bool IsClosed { get; set; }
        
        public DateTime ExpectedStartDate { get; set; }
        public DateTime ExpectedEndDate { get; set; }
        
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        [JsonIgnore]
        public virtual Organisation Organisation { get; set; }
        public long OrganisationId { get; set; }
        
        public string State => this.GetState();
        
        [JsonIgnore]
        public virtual List<Principal> Principals { get; set; }
        public int PrincipalCount { get; set; }
        
        [JsonIgnore]
        public virtual List<Student> Students { get; set; }
        public int StudentCount { get; set; }
        
        
        [JsonIgnore]
        public virtual List<Test> Tests { get; set; }
        public int TestCount { get; set; }
        
        [JsonIgnore]
        public virtual List<Corrector> Correctors { get; set; }
        public int CorrectorCount { get; set; }

        [JsonIgnore]
        public virtual List<Group> Groups { get; set; }
        public int GroupCount { get; set; }
        
        [JsonIgnore]
        public virtual List<Supervisor> Supervisors { get; set; }
        public int SupervisorCount { get; set; }
        
        [JsonIgnore]
        public virtual List<Speciality> Specialities { get; set; }
        public int SpecialityCount;
        
        [JsonIgnore]
        public virtual List<Secretary> Secretaries { get; set; }
        public int SecretaryCount;
        
        [JsonIgnore] 
        public virtual List<Application> Applications { get; set; }

        public int ApplicationCount { get; set; }
        public int AcceptedApplicationCount { get; set; }
        public int RejectedApplicationCount { get; set; }
        
        
        [JsonIgnore]
        public virtual List<ExaminationReview> Reviews { get; set; }
        
        public int ReviewCount { get; set; }
        public int ReviewAverage { get; set; }
    }
}