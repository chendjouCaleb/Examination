
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
        
        
        [JsonIgnore]
        public virtual  Member Member { get; set; }
        public long MemberId { get; set; }

        [JsonIgnore]
        public virtual Department Department { get; set; }
        public long DepartmentId { get; set; }
    }
}