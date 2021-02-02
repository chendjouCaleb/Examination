using System;

namespace Exam.Exceptions
{
    /// <summary>
    /// Exceptions when a unique value condition is violated.
    /// </summary>
    public class UniqueValueException :ApplicationException
    {
        public UniqueValueException(string message):base(message)
        {  }
    }
}