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
    public class TestGroup:Entity<long>, IPeriod
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        
        public uint Capacity { get; set; }

        public int Index { get; set; }

        public bool IsClosed { get; set; }
        
        public uint PaperCount { get; set; }
        public uint CorrectedPaperCount { get; set; }
        public uint PresentPaperCount { get; set; }
        public uint ConsignedPaperCount { get; set; }
        
        [JsonIgnore] 
        public virtual Room Room { get; set; }

        public long? RoomId { get; set; }
        
        [JsonIgnore] 
        public virtual Test Test { get; set; }
        public long TestId { get; set; }
        
        
        [JsonIgnore]
        public virtual List<Paper> Papers { get; set; }

        [NotMapped]
        public UserTestGroup Relation { get; set; }
        

        [JsonIgnore]
        public virtual List<TestGroupSupervisor> TestGroupSupervisors { get; set; }
        
        [JsonIgnore]
        public virtual List<TestGroupSecretary> TestGroupSecretaries { get; set; }
        
        [JsonIgnore] 
        public virtual List<TestGroupCorrector> TestGroupCorrectors { get; set; }
        
    }
    
    public class UserTestGroup
    {
        public bool IsCorrector { get; set; }
        public bool IsSupervisor { get; set; }
        public bool IsSecretary { get; set; }
        public bool IsStudent { get; set; }
    }
    
    public class TestGroupStatistics
    {
        public long Frequency { get; set; }
        public double Median { get; set; }
        public double Mean { get; set; }
        public double Std { get; set; }
        public double Variance { get; set; }
        public double Skewness { get; set; }
        public double Mode { get; set; }
        public double Min { get; set; }
        public double Max { get; set; }

        public double Radical { get; set; }

        public double Quartile0 { get; set; }
        public double Quartile1 { get; set; }
        public double Quartile2 { get; set; }

        public double[] Scores { get; set; } = new double[0];


        public Paper MaxPaper { get; set; }

        public Paper MinPaper { get; set; }

        public int ConsignedFrequency { get; set; }
        public int CorrectedFrequency { get; set; }
        public int Presence { get; set; }
    }
}