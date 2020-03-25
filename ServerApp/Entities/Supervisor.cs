using Everest.AspNetStartup.Models;
using Newtonsoft.Json;

namespace Examination.Entities
{
    public class Supervisor:Entity<long>
    {
        public string UserId { get; set; }
        
        [JsonIgnore]
        public virtual Examination Examination { get; set; }
        public long ExaminationId { get; set; }
    }

    public class TestSupervisor : Entity<long>
    {
        public bool IsPrincipal { get; set; }

        public virtual Supervisor Supervisor { get; set; }
        public long SupervisorId { get; set; }
        
        public virtual Test Test { get; set; }
        public long? TestId { get; set; }

        public Group Group { get; set; }
        public long? GroupId { get; set; }
    }
}