using System;

namespace Exam.Infrastructure
{
    public static class DateTimeAssert
    {
        public static bool EqualsAtSecond(DateTime time1, DateTime time2)
        {
            return time1.Year == time2.Year
                   && time1.Month == time2.Month
                   && time1.Day == time2.Day
                   && time1.Hour == time2.Hour
                   && time1.Minute == time2.Minute
                   && time1.Second == time2.Second;
        }
        
        public static bool EqualsAtMinute(DateTime time1, DateTime time2)
        {
            return time1.Year == time2.Year
                   && time1.Month == time2.Month
                   && time1.Day == time2.Day
                   && time1.Hour == time2.Hour
                   && time1.Minute == time2.Minute;
        }
    }
}