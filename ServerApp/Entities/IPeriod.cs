using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Exceptions;
using Exam.Infrastructure;

namespace Exam.Entities
{
    public interface IPeriod
    {
        bool IsClosed { get; }
        DateTime? StartDate { get; set; }
        DateTime? EndDate { get; set; }
    }

    public class Period : IPeriod
    {
        public bool IsClosed { get; }
        
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }

    public interface IExpectedPeriod
    {
        DateTime ExpectedStartDate { get; set; }
        DateTime ExpectedEndDate { get; set; }
    }

    public class ExpectedPeriod : IExpectedPeriod
    {
        public DateTime ExpectedStartDate { get; set; }
        public DateTime ExpectedEndDate { get; set; }
    }

    public interface IExtendedPeriod : IPeriod, IExpectedPeriod
    {
    }

    public static class PeriodExtensions
    {
        public static string GetState(this IPeriod period)
        {
            if (period.IsClosed)
            {
                return PeriodState.CLOSED;
            }
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


        public static bool ExpectedOverlap(this IExpectedPeriod p, IExpectedPeriod period)
        {
            if (period == null)
            {
                return false;
            }


            if (period.ExpectedStartDate.Equals(p.ExpectedStartDate) &&
                period.ExpectedEndDate.Equals(p.ExpectedEndDate))
            {
                return true;
            }

            return p.ExpectedStartDate.IsBeforeOrEqual(period.ExpectedEndDate) &&
                   p.ExpectedStartDate.IsAfterOrEqual(period.ExpectedStartDate);
        }
        
        
        
        public static bool ExpectedOverlap(this IPeriod p, IExpectedPeriod period)
        {
            if (period == null)
            {
                return false;
            }

            if (p.StartDate == null || p.EndDate == null)
            {
                return false;
            }


            if (period.ExpectedStartDate.Equals(p.StartDate) &&
                period.ExpectedEndDate.Equals(p.EndDate))
            {
                return true;
            }

            return p.StartDate.Value.IsBeforeOrEqual(period.ExpectedEndDate) &&
                   p.StartDate.Value.IsAfterOrEqual(period.ExpectedStartDate);
        }

        public static T ExpectedOverlap<T>(this IExpectedPeriod p, IEnumerable<T> periods) where T : IExpectedPeriod, IExtendedPeriod
        {
            if (periods == null)
            {
                return default;
            }

            foreach (var period in periods)
            {
                if (p.ExpectedOverlap(period))
                {
                    return period;
                }
            }

            return default;
        }
        
        
        public static T ExpectedOverlap<T>(this IPeriod p, IEnumerable<T> periods) where T : IExpectedPeriod, IExtendedPeriod
        {
            if (periods == null)
            {
                return default;
            }

            foreach (var period in periods)
            {
                if (p.ExpectedOverlap(period))
                {
                    return period;
                }
            }

            return default;
        }
    }
}