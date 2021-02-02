using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class TestGroupSupervisor : Entity<long>
    {
        /**
         * Accorde le droit de démarrer ou de mettre fin à une épreuve. 
         */
        public bool IsPrincipal { get; set; }
        
        [JsonIgnore]
        public virtual Supervisor Supervisor { get; set; }
        public long? SupervisorId { get; set; }
        

        [JsonIgnore]
        public virtual TestGroup TestGroup { get; set; }
        public long TestGroupId { get; set; }
        
        public uint PaperCount { get; set; }
    }
}