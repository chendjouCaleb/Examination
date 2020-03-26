using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Entities
{
    public class Review:Entity<long>
    {
        public string UserId { get; set; }
        public string Score { get; set; }
        public string Comment { get; set; }
        
    }


    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class ExaminationReview : Review
    {
        public virtual Examination Examination { get; set; }
        public long ExaminationId { get; set; }
    }
    
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class PaperReview : Review
    {
        public virtual Paper Paper { get; set; }
        public long PaperId { get; set; }
    }
    
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class TestReview : Review
    {
        public virtual Test Test { get; set; }
        public long TestId { get; set; }
    }
}