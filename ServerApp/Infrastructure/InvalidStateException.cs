using System;

namespace Exam.Infrastructure
{
    public class InvalidStateException:ApplicationException
    {
        public InvalidStateException(string message):base(message)
        {  }
    }
}