using System;

namespace Exam.Infrastructure
{
    public static class Assert
    {
        public static void RequireNonNull(object arg, string paramName)
        {
            if (arg == null)
                throw new ArgumentNullException(paramName);
        }
        
        
    }
}