using System;

namespace Exam.Infrastructure
{
    public class OverlapPeriodException<T, I>:ApplicationException
    {
        public T Entity1 { get; }
        public I Entity2 { get; }

        public OverlapPeriodException(T entity1, I entity2, string message = "{entity.constraints.periodOverlap}") : base(message)
        {
             Entity1 = entity1;
             Entity2 = entity2;
        }
        
    }
}