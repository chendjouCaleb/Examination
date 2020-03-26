using System;

namespace Exam.Entities
{
    public interface IPeriod
    {
        DateTime ExpectedStartDate { get; set; }
        DateTime ExpectedEndDate { get; set; }
        
        DateTime? RealStartDate { get; set; }
        DateTime? RealEndDate { get; set; }
        
    }

    public static class PeriodExtensions
    {
        public static string GetState(this IPeriod period)
        {
            if (period.RealEndDate != null)
            {
                return PeriodState.FINISHED;
            }

            if (period.RealStartDate != null)
            {
                return PeriodState.PROGRESS;
            }

            return PeriodState.PENDING;
        }
    }
}

