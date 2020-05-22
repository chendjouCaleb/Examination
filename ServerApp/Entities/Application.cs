﻿using System;
using System.ComponentModel.DataAnnotations.Schema;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Application:Entity<long>
    {
        public string RegistrationId { get; set; }
        public string UserId { get; set; }
        public string FullName { get; set; }
        public DateTime BirthDate { get; set; }
        
        public Char Gender { get; set; }

        public string ProcessUserId { get; set; }
        
        [NotMapped]
        public bool Processed => ProcessDate != null;
        public DateTime? ProcessDate { get; set; }

        [NotMapped]
        public bool Accepted => Processed && Student != null;

        [NotMapped]
        public bool Rejected => Processed && Student == null;

        public string State
        {
            get
            {
                if (Accepted)
                {
                    return "ACCEPTED";
                }

                if (Rejected)
                {
                    return "REJECTED";
                }

                return "WAITING";
            }
        }

        [JsonIgnore]
        public virtual Student Student { get; set; }
        public long? StudentId { get; set; }

        [JsonIgnore]
        public virtual Speciality Speciality { get; set; }
        public long? SpecialityId { get; set; }
        
        [JsonIgnore]
        public virtual Examination Examination { get; set; }
        public long ExaminationId { get; set; }
    }
}