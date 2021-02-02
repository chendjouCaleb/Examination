using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class ExaminationDepartment : Entity<long>
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        [JsonIgnore] public virtual Examination Examination { get; set; }
        public long? ExaminationId { get; set; }


        [JsonIgnore] public virtual Department Department { get; set; }
        public long? DepartmentId { get; set; }


        [JsonIgnore]
        public virtual List<ExaminationLevel> ExaminationLevels { get; set; }

        [JsonIgnore]
        public virtual List<ExaminationSpeciality> ExaminationSpecialities { get; set; }
    }
}