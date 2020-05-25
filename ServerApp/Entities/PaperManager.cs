using System.Collections.Generic;
using System.Text.Json.Serialization;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class PaperManager:Entity<long>
    {
        public string RegisterUserId { get; set; }

        public string UserId { get; set; }
        
        
    }
}