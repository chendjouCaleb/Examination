using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Paper:Entity<long>
    {
        public decimal Score { get; set; }
        
        public string RegisterUserId { get; set; }

        
        [NotMapped] public bool IsPresent => ArrivalDate != null;
        public DateTime? ArrivalDate { get; set; }

        public string ReportUserId { get; set; }
        public string Comment { get; set; }
        public DateTime? EndDate { get; set; }
        
        [JsonIgnore]
        public string Anonymity { get; set; }
        
        
        public virtual TestGroup TestGroup { get; set; }
        public long TestGroupId { get; set; }
        
        public virtual Student Student { get; set; }
        public long StudentId { get; set; }
        
        [JsonIgnore]
        public virtual TestGroupSupervisor TestGroupSupervisor { get; set; }
        public long? TestGroupSupervisorId { get; set; }
        
        [JsonIgnore]
        public virtual TestGroupCorrector TestGroupCorrector{ get; set; }
        public long? TestGroupCorrectorId { get; set; }
        
        [JsonIgnore]
        public virtual TestGroupSecretary TestGroupSecretary{ get; set; }
        public long? TestGroupSecretaryId { get; set; }
        
        public virtual List<Contest> Contests { get; set; }
        public int  ContestCount { get; set; }
        
        [JsonIgnore] public virtual List<ScorePaper> ScorePapers { get; set; }

        [JsonIgnore]
        public virtual List<PaperReview> Reviews { get; set; }
        public int ReviewCount { get; set; }
        
        [JsonIgnore]
        public virtual List<PaperFile> PaperFiles { get; set; }
        public int PaperFileCount { get; set; }
    }
}