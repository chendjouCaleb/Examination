﻿using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities.Periods
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class SemesterStudent:Entity<long>
    {
        public virtual YearStudent YearStudent { get; set; }
        public long YearStudentId  { get; set; }

        [JsonIgnore]
        public virtual SemesterLevel SemesterLevel { get; set; }
        public long? SemesterLevelId { get; set; }

        [JsonIgnore]
        public virtual SemesterLevelSpeciality SemesterLevelSpeciality { get; set; }
        public long? SemesterLevelSpecialityId { get; set; }
    }
}