using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    /// <summary>
    /// Represente une décomposition de la note d'une épreuve.
    /// Il peut arriver que la notation de l'épreuve néccessite une notation
    /// détaillée sur les différentes performances de l'étudiant.
    /// C'est le cas en rédaction ou en dissertation.
    /// </summary>
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Score:Entity<long>
    {
        public string Name { get; set; }
        
        public double Radical { get; set; }

        [JsonIgnore]
        public virtual Test Test { get; set; }
        public long? TestId { get; set; }
        
        [JsonIgnore] public virtual List<ScorePaper> ScorePapers { get; set; }
    }




    public class ScorePaper : Entity<long>
    {
        [JsonIgnore]
        public virtual Score Score { get; set; }
        public long ScoreId { get; set; }
        
        [JsonIgnore]
        public virtual Paper Paper { get; set; }
        public long PaperId { get; set; }

        public double Value { get; set; }
    }
}