using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Exam.Models.Statistics;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Organisation:Entity<long>
    {
        public string UserId { get; set; }
        public string AdminUserId { get; set; }

        public string Identifier { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }

        public string ImageName { get; set; }
        public Uri ImageUrl { get; set; }
        
        [JsonIgnore]
        public virtual List<Admin> Admins { get; set; }
        public uint AdminCount { get; set; }

        [JsonIgnore]
        public virtual List<Examination> Examinations { get; set; }
        public uint ExaminationCount { get; set; }
        

        [JsonIgnore]
        public virtual List<Room> Rooms { get; set; }
        public uint RoomCount { get; set; }
        
        [NotMapped] public OrganisationStatistics Statistics { get; set; }
    }
}