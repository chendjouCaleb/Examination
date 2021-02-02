using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class ExaminationSpeciality : Entity<long>
    {
        [JsonIgnore]
        public virtual Speciality Speciality { get; set; }
        public long? SpecialityId { get; set; }

        [JsonIgnore]
        public virtual ExaminationDepartment ExaminationDepartment { get; set; }
        public long? ExaminationDepartmentId { get; set; }
        
        [JsonIgnore]
        public virtual List<ExaminationLevelSpeciality> ExaminationLevelSpecialities { get; set; }
        
    }
}