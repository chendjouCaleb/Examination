using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class TestLevelSpeciality : Entity<long>
    {
        [JsonIgnore] public virtual Test Test { get; set; }
        public long? TestId { get; set; }

        [JsonIgnore] public virtual CourseLevelSpeciality CourseLevelSpeciality { get; set; }
        public long? CourseLevelSpecialityId { get; set; }

        [JsonIgnore] public virtual ExaminationLevelSpeciality ExaminationLevelSpeciality { get; set; }
        public long? ExaminationLevelSpecialityId { get; set; }


        [JsonIgnore] public virtual List<Paper> Papers { get; set; }
    }
}