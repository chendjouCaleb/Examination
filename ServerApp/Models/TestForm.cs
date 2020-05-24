using System;
using Exam.Entities;

namespace Exam.Models
{
    public class TestForm:IExpectedPeriod
    {
        public string Name { get; set; }

        public string Code { get; set; }
        
        public uint Coefficient { get; set; }

        public bool UseAnonymity { get; set; }
        
        public int Radical { get; set; }
        
        public DateTime ExpectedStartDate { get; set; }
        public DateTime ExpectedEndDate { get; set; }
        
    }

    public class TestEditForm
    {
        public string Name { get; set; }

        public string Code { get; set; }

        public string Room { get; set; }

        public uint Coefficient { get; set; }
        
        public bool? UseAnonymity { get; set; }
        
        public bool? IsPublished { get; set; }
    }
}