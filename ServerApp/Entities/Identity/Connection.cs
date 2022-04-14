using System;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Entities.Identity
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Connection : Entity<long>
    {
        public string Browser { get; set; }

        public string RemoteAddress { get; set; }

        public string OperatingSystem { get; set; }
        
        public bool IsPersistent { get; set; }

        public string Type { get; set; }

        public bool Online { get; set; }
        
        public string Position { get; set; }
        public DateTime? BeginDate { get; set; }
        public DateTime? EndDate { get; set; }

        public bool IsClosed { get => EndDate != null; }

        
        public virtual User User { get; set; }
        public string UserId { get; set; }
    }
}