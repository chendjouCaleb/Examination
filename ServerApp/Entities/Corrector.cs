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
        public virtual Examination Examination { get; set; }
        public long ExaminationId { get; set; }
        
        /// <summary>
        /// Assigned paper count.
        /// </summary>
        [JsonIgnore] 
        public virtual List<Paper> Papers { get; set; }
        public int PaperCount { get; set; }
        
        /// <summary>
        /// Corrected paper size.
        /// </summary>
        public int CorrectedPaperCount { get; set; }
        
    }
}