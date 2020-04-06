using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Exceptions;
using Exam.Infrastructure;

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

        public static void SetStartDate(this IPeriod period, DateTime value)
        {
            if (period.EndDate != null && value > period.EndDate)
            {
                throw new InvalidValueException("{period.constraints.beginDateBeforeEndDate}");
            }

            period.StartDate = value;
        }
        
        
        public static void SetEndDate(this IPeriod period, DateTime value)
        {
            if (period.StartDate != null && value < period.StartDate)
            {
                throw new InvalidValueException("{period.constraint.endDateAfterBeginDate}");
            }

            period.StartDate = value;
        }
    }


    public static class ExtendedPeriodExtensions
    {
        public static void SetExpectedStartDate(this IExtendedPeriod period, DateTime value)
        {
            if (period.ExpectedEndDate != null && value > period.ExpectedEndDate)
            {
                throw new InvalidValueException("{period.constraints.beginDateBeforeEndDate}");
            }

            period.ExpectedStartDate = value;
        }
        
        
        public static void SetExpectedEndDate(this IExtendedPeriod period, DateTime value)
        {
            if (period.ExpectedStartDate != null && value < period.ExpectedStartDate)
            {
                throw new InvalidValueException("{period.constraint.endDateAfterBeginDate}");
            }

            period.ExpectedStartDate = value;
        }
        
        
        public static bool ExpectedOverlap(this IExtendedPeriod p , IExtendedPeriod period ) {
            if(period == null){
                return false;
            }
            

            if(period.ExpectedStartDate.Equals(p.ExpectedStartDate) && period.ExpectedEndDate.Equals(p.ExpectedEndDate)){
                return true;
            }

            return p.ExpectedStartDate.IsBefore(period.ExpectedEndDate) && p.ExpectedStartDate.IsAfter(period.ExpectedStartDate);
        }

        public static IExtendedPeriod ExpectedOverlap(this IExtendedPeriod p, IEnumerable<IExtendedPeriod> periods)
        {
            if (periods == null)
            {
                throw new ArgumentNullException(nameof(periods));
            }

            foreach (var period in periods)
            {
                if (p.ExpectedOverlap(period))
                {
                    return period;
                }
            }

            return null;
        }
    }
}

