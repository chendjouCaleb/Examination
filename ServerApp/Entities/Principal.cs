using System.Text.Json.Serialization;
using Everest.AspNetStartup.Models;

namespace Exam.Entities
{
    /// <summary>
    /// Personne chargée de l'organisation et de l'administration d'un examen.
    /// 
    /// </summary>
    public class Principal : Entity<long>
    {
        public string RegisterUserId { get; set; }
        public string UserId { get; set; }

        /// <summary>
        /// Description du role du 
        /// </summary>
        public string Role { get; set; }

        [JsonIgnore]
        public virtual Examination Examination { get; set; }
        public long ExaminationId { get; set; }
    }
}