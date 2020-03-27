﻿using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Student:Entity<long>
    {
        public string RegistrationId { get; set; }
        public string UserId { get; set; }

        public string FullName { get; set; }

        public int Position { get; set; }
        
        [JsonIgnore]
        public virtual Examination Examination { get; set; }
        public long ExaminationId;
        
        [JsonIgnore]
        public virtual Speciality Speciality { get; set; }
        public long? SpecialityId;

        [JsonIgnore]
        public virtual List<Paper> Papers { get; set; }
        public int PaperCount { get; set; }
        
        
    }
}