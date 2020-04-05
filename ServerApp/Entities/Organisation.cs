using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Everest.AspNetStartup.Models;

namespace Exam.Entities
{
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
        public virtual List<Examination> Examinations { get; set; }
        public uint ExaminationCount { get; set; }

        public virtual List<Room> Rooms { get; set; }
        public uint RoomCount { get; set; }
    }
}