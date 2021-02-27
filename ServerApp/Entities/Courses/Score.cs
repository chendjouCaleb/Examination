using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities.Courses
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
        public virtual Course Course { get; set; }
        public long CourseId { get; set; }
        
    }
    
}