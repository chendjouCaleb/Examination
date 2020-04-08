using System.Text.Json.Serialization;
using Everest.AspNetStartup.Models;

namespace Exam.Entities
{
    public class Principal : Entity<long>
    {
        public string RegisterUserId { get; set; }
        public string UserId { get; set; }

        public string Role { get; set; }

        [JsonIgnore]
        public virtual Examination Examination { get; set; }
        public long ExaminationId { get; set; }
    }
}