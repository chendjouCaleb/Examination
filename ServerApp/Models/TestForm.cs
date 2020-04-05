using System;

namespace Exam.Models
{
    public class TestForm
    {
        public string Name { get; set; }

        public string Code { get; set; }

        public string Room { get; set; }

        public uint Coefficient { get; set; }

        public bool UseAnonymity { get; set; }
        
        public DateTime ExpectedStartDate { get; set; }
        public DateTime ExpectedEndDate { get; set; }

        public string UseGroup { get; set; }
        
        public long[] correctorIds { get; set; }
    }

    public class TestEditForm
    {
        public string Name { get; set; }

        public string Code { get; set; }

        public string Room { get; set; }

        public uint Coefficient { get; set; }
    }
}