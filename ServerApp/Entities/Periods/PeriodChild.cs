using Everest.AspNetStartup.Models;

namespace Exam.Entities.Periods
{
    public abstract class PeriodChild:Entity<long>
    {
        public bool Opened { get; set; }
        public bool Closed { get; set; }
        public bool Pending { get; set; } = true;
        
        public void Start()
        {
            Opened = true;
            Pending = false;
            Closed = false;
        }

        public void Close()
        {
            Opened = false;
            Pending = false;
            Closed = true;
        }
    }
}