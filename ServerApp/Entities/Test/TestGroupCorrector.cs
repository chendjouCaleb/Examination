using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class TestGroupCorrector : Entity<long>
    {
        [JsonIgnore]
        public virtual Corrector Corrector { get; set; }
        public long CorrectorId { get; set; }
        

        [JsonIgnore]
        public virtual TestGroup TestGroup { get; set; }
        public long TestGroupId { get; set; }

        public int PaperCount { get; set; }

        [JsonIgnore]
        public virtual List<Paper> Papers { get; set; }
    }
}