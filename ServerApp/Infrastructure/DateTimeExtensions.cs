using System;

namespace Exam.Infrastructure
{
    public static class DateTimeExtensions
    {
        public static bool IsBefore(this DateTime time, DateTime other)
        {
            return DateTime.Compare(time, other) < 0;
        }
        
        public static bool IsAfter(this DateTime time, DateTime other)
        {
            return time > other;
        }
    }
}