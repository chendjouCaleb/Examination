using System.Collections.Generic;
using System.Text.Json.Serialization;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class TestGroupSecretary:Entity<long>
    {
        public virtual Secretary Secretary { get; set; }
        public long? SecretaryId { get; set; }
        

        public virtual TestGroup TestGroup { get; set; }
        public long TestGroupId { get; set; }

        [JsonIgnore]
        public virtual List<Paper> Papers { get; set; }

        public int PaperCount { get; set; }
    }
}