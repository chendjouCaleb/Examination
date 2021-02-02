using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    
    /// <summary>
    /// Personne chargée d'effectuer les corrections des copies des étudiants.
    /// /// Une copie pourra être corrigée par plusieurs correcteurs.
    /// </summary>
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Corrector:Entity<long>
    {
        public string UserId { get; set; }
        
        [JsonIgnore]
        public virtual Member Member { get; set; }
        public long MemberId { get; set; }

        [JsonIgnore]
        public virtual Department Department { get; set; }
        public long DepartmentId { get; set; }
        
        /// <summary>
        /// Assigned testGroupCorrector count.
        /// </summary>
         [JsonIgnore] 
         public virtual List<TestGroupCorrector> TestGroupCorrectors { get; set; }
         public int TestGroupCorrectorCount { get; set; }
        
        /// <summary>
        /// Corrected testGroupCorrector size.
        /// </summary>
        public int PaperCount { get; set; }
        
        
        
    }
}