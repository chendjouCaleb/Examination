using Everest.AspNetStartup.Models;
using Newtonsoft.Json;

namespace Exam.Entities
{
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