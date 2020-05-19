
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    /// <summary>
    /// Personne chargée des inscriptions d'étudiants pour un examen.
    /// 
    /// </summary>
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Principal : Entity<long>
    {
        public string RegisterUserId { get; set; }
        public string UserId { get; set; }

        /// <summary>
        /// Description du role du <see cref="Principal"/>.
        ///
        /// Cette description n'est rien d'autre qu'un indication et
        /// n'est pas utilisé par le système pour effectuer des restriction.
        /// </summary>
        public string Role { get; set; }

        [JsonIgnore]
        public virtual Examination Examination { get; set; }
        public long ExaminationId { get; set; }
    }
}