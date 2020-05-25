using System.Collections.Generic;
using System.Text.Json.Serialization;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class TestGroupCorrector : Entity<long>
    {
        public virtual Corrector Corrector { get; set; }
        public long CorrectorId { get; set; }
        

        public virtual TestGroup TestGroup { get; set; }
        public long TestGroupId { get; set; }

        public int PaperCount { get; set; }

        [JsonIgnore]
        public virtual List<Paper> Papers { get; set; }
    }
}