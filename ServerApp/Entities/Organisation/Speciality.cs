using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Exam.Entities.Periods;
using Exam.Models.Statistics;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Speciality:Entity<long>
    {
        public string Name { get; set; }
        public string Description { get; set; }

        [JsonIgnore]
        public virtual Department Department { get; set; }
        public long DepartmentId { get; set; }

        [JsonIgnore]
        public virtual List<YearSpeciality> YearSpecialities { get; set; }
        
        [JsonIgnore]
        public virtual List<LevelSpeciality> LevelSpecialities { get; set; }

        [JsonIgnore]
        public virtual List<ExaminationSpeciality> ExaminationSpecialities { get; set; }
        
        
        [NotMapped] 
        public SpecialityStatistics Statistics { get; set; }
    }
}