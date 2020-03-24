using Everest.AspNetStartup.Models;

namespace Examination.Entities
{
    public class Review:Entity<long>
    {
        public string UserId { get; set; }
        public string Score { get; set; }
        public string Comment { get; set; }
        
    }


    public class ExaminationReview : Review
    {
        public virtual Examination Examination { get; set; }
        public long ExaminationId { get; set; }
    }
    
    public class PaperReview : Review
    {
        public virtual Paper Paper { get; set; }
        public long PaperId { get; set; }
    }
    
    public class TestReview : Review
    {
        public virtual Test Test { get; set; }
        public long TestId { get; set; }
    }
}