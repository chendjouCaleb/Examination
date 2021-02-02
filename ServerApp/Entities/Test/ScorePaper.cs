using System.ComponentModel.DataAnnotations.Schema;
using Everest.AspNetStartup.Models;
using Newtonsoft.Json;

namespace Exam.Entities
{
    public class ScorePaper : Entity<long>
    {
        [JsonIgnore]
        public virtual TestScore TestScore { get; set; }
        public long TestScoreId { get; set; }
        
        [JsonIgnore]
        public virtual Paper Paper { get; set; }
        public long? PaperId { get; set; }

        public double Value { get; set; }

        [NotMapped] public string ScoreName => TestScore.Name;
        [NotMapped] public double Radical => TestScore.Radical;
    }
}