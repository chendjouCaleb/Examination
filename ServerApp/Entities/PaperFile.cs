using System;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class PaperFile:Entity<long>
    {
        public string Name { get; set; }
        public bool Corrected { get; set; }
        public int Index { get; set; }
        public Uri Url { get; set; }

        public virtual Paper Paper { get; set; }
        public long PaperId { get; set; }
        
    }
}