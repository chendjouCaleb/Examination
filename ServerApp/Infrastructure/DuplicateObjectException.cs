using System;

namespace Exam.Infrastructure
{
    public class DuplicateObjectException:ApplicationException
    {
        public DuplicateObjectException(string message):base(message)
        {  }
    }
}