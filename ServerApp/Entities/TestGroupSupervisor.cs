using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class TestGroupSupervisor : Entity<long>
    {
        /**
         * Accorde le droit de démarrer ou de mettre fin à une épreuve. 
         */
        public bool IsPrincipal { get; set; }
        public virtual Supervisor Supervisor { get; set; }
        public long SupervisorId { get; set; }
        

        public virtual TestGroup TestGroup { get; set; }
        public long TestGroupId { get; set; }
    }
}