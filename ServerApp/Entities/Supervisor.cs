using Everest.AspNetStartup.Models;

namespace Examination.Entities
{
    public class Supervisor:Entity<long>
    {
        public string UserId { get; set; }

        public bool IsPrincipal { get; set; }
    }
}