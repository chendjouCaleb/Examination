using System.ComponentModel.DataAnnotations;

namespace Exam.Models
{
    public class ScoreForm
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        public double Radical { get; set; }
    }
    
    public class TestScoreForm
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        public double Radical { get; set; }
    }
    
    public class ScorePaperForm 
    {
        [Required]
        public long TestScoreId { get; set; }
        
        [Required]
        public double Value { get; set; }
    }
}