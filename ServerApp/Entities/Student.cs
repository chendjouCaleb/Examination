﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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
        public string FullName { get; set; }
        public DateTime BirthDate { get; set; }

        public char Gender { get; set; }

        public int Index { get; set; }
        public int GroupIndex { get; set; }
        
        public string UserId { get; set; }

        public string RegisterUserId { get; set; }

        [JsonIgnore] 
        public virtual Application Application { get; set; }
        
        [JsonIgnore]
        public virtual Group Group { get; set; }
        public long? GroupId{ get; set; } 
        
        [JsonIgnore]
        public virtual Examination Examination { get; set; }
        public long ExaminationId{ get; set; }
        
        [JsonIgnore]
        public virtual Speciality Speciality { get; set; }
        public long? SpecialityId{ get; set; }

        [JsonIgnore]
        public virtual List<Paper> Papers { get; set; }
        public int PaperCount { get; set; }
        
        
    }
}