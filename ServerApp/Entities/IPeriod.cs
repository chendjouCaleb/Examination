using System;

namespace Exam.Entities
{
    public interface IPeriod
    {
        DateTime? StartDate { get; set; }
        DateTime? EndDate { get; set; }
        
    }

    public class Period : IPeriod
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }

    public interface IExtendedPeriod : IPeriod
    {
        DateTime ExpectedStartDate { get; set; }
        DateTime ExpectedEndDate { get; set; }
    }

    public static class PeriodExtensions
    {
        public static string GetState(this IPeriod period)
        {
            if (period.EndDate != null)
            {
                return PeriodState.FINISHED;
            }

            if (period.StartDate != null)
            {
                return PeriodState.PROGRESS;
            }

            return PeriodState.PENDING;
        }
    }
}

