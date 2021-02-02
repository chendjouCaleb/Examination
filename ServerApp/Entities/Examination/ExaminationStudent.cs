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
    public class ExaminationStudent : Entity<long>
    {
        public virtual Student Student { get; set; }
        public long StudentId { get; set; }


        public virtual ExaminationLevel ExaminationLevel { get; set; }
        public long? ExaminationLevelId { get; set; }

        [JsonIgnore] public virtual ExaminationLevelSpeciality ExaminationLevelSpeciality { get; set; }
        public long? ExaminationLevelSpecialityId { get; set; }


        [JsonIgnore] public virtual List<Paper> Papers { get; set; }


        [NotMapped] public ExaminationStudentStatistics Statistics;
    }

     
}