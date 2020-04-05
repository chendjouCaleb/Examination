using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Supervisor:Entity<long>
    {
        public string UserId { get; set; }
        
        [JsonIgnore]
        public virtual Examination Examination { get; set; }
        public long ExaminationId { get; set; }
    }

    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class TestSupervisor : Entity<long>
    {
        public bool IsPrincipal { get; set; }

        public virtual Supervisor Supervisor { get; set; }
        public long SupervisorId { get; set; }
        

        public virtual Group Group { get; set; }
        public long GroupId { get; set; }
    }
}