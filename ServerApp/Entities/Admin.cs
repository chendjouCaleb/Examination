using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Admin : Entity<long>
    {
        public string RegisterUserId { get; set; }
        public string UserId { get; set; }

        public string Role { get; set; }

        [JsonIgnore] 
        public virtual Organisation Organisation { get; set; }
        public long OrganisationId { get; set; }
    }
}