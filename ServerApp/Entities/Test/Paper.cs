using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Paper : Entity<long>
    {
        public double? Score { get; set; }

        public int? GroupIndex { get; set; }

        [JsonIgnore] public string Anonymity { get; set; }

        public virtual List<ScorePaper> ScorePapers { get; set; }

        [NotMapped] public bool IsCorrected => Score != null;

        [NotMapped]
        public double FinalScore
        {
            get
            {
                if (ScorePapers != null && ScorePapers.Count > 0)
                {
                    return ScorePapers.Sum(sp => sp.Value);
                }

                return Score ?? 0;
            }
        }

        public bool IsPresent => StartDate != null;

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }


        [JsonIgnore] public virtual Test Test { get; set; }
        public long TestId { get; set; }

        [JsonIgnore] public virtual TestLevelSpeciality TestLevelSpeciality { get; set; }
        public long? TestLevelSpecialityId { get; set; }

        [JsonIgnore] public virtual TestGroup TestGroup { get; set; }
        public long? TestGroupId { get; set; }

        public virtual ExaminationStudent ExaminationStudent { get; set; }
        public long? ExaminationStudentId { get; set; }

        [JsonIgnore] public virtual TestGroupSupervisor TestGroupSupervisor { get; set; }
        public long? TestGroupSupervisorId { get; set; }

        public string SupervisorComment { get; set; }
        public string SupervisorUserId { get; set; }

        public string CollectorUserId { get; set; }


        [JsonIgnore] public virtual TestGroupCorrector TestGroupCorrector { get; set; }

        public long? TestGroupCorrectorId { get; set; }
        public string CorrectorUserId { get; set; }
        public string CorrectorComment { get; set; }

        [JsonIgnore] public virtual TestGroupSecretary TestGroupSecretary { get; set; }

        public long? TestGroupSecretaryId { get; set; }
        public string SecretaryUserId { get; set; }
        public string SecretaryComment { get; set; }

        public virtual List<Contest> Contests { get; set; }
        public int ContestCount { get; set; }


        [JsonIgnore] public virtual List<PaperFile> PaperFiles { get; set; }

        public int PaperFileCount { get; set; }
    }
}