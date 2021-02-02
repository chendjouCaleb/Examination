﻿using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class CourseLevelSpeciality:Entity<long>
    {
        [JsonIgnore]
        public virtual Course Course { get; set; }
        public long? CourseId { get; set; }

        
        [JsonIgnore]
        public virtual LevelSpeciality LevelSpeciality { get; set; }
        public long LevelSpecialityId { get; set; }


        [JsonIgnore]
        public virtual List<TestLevelSpeciality> TestLevelSpecialities { get; set; }
    }
}