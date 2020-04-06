﻿using System.Collections.Generic;
using Everest.AspNetStartup.Models;

namespace Exam.Entities
{
    public class Room : Entity<long>
    {
        public string Name { get; set; }
        public uint Capacity { get; set; }
        public string Address { get; set; }
        
        public virtual Organisation Organisation { get; set; }
        public long OrganisationId { get; set; }

        public virtual List<Group> Groups { get; set; }
        public uint GroupCount { get; set; }
    }
}