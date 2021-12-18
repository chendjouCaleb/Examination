using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Exam.Entities.Courses;
using Exam.Entities.Periods;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class TestLevelSpeciality : Entity<long>
    {
        [JsonIgnore] 
        public virtual Test Test { get; set; }
        public long? TestId { get; set; }

        [JsonIgnore] 
        public virtual SemesterCourseLevelSpeciality SemesterCourseLevelSpeciality { get; set; }
        public long? SemesterCourseLevelSpecialityId { get; set; }

        [JsonIgnore] 
        public virtual ExaminationLevelSpeciality ExaminationLevelSpeciality { get; set; }
        public long? ExaminationLevelSpecialityId { get; set; }


        [JsonIgnore] public virtual List<Paper> Papers { get; set; }
    }
}