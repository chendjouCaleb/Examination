using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class ExaminationLevelSpeciality:Entity<long>
    {
        [JsonIgnore]
        public virtual LevelSpeciality LevelSpeciality { get; set; }
        public long LevelSpecialityId { get; set; }
        
        [JsonIgnore]
        public virtual ExaminationLevel ExaminationLevel { get; set; }
        public long? ExaminationLevelId { get; set; }

        [JsonIgnore]
        public virtual ExaminationSpeciality ExaminationSpeciality { get; set; }
        public long? ExaminationSpecialityId { get; set; }
        
        [JsonIgnore]
        public virtual List<ExaminationStudent> ExaminationStudents { get; set; }
        
        [JsonIgnore]
        public virtual List<TestLevelSpeciality> TestLevelSpecialities { get; set; }
    }
}