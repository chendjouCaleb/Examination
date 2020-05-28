namespace Exam.Models
{
    public class ScoreForm
    {
        public string Name { get; set; }
        
        public double Radical { get; set; }
    }

    public class ScoreEditForm
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
    
    public class ScorePaperForm 
    {
        public long ScoreId { get; set; }
        public double Value { get; set; }
    }
}