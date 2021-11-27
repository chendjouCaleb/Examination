using Everest.AspNetStartup.Models;

namespace Exam.Entities.Periods
{
    public class YearTeacher:Entity<long>
    {
        public virtual Teacher Teacher { get; set; }
        public long? TeacherId { get; set; }

        public virtual YearDepartment YearDepartment { get; set; }
        public long YearDepartmentId { get; set; }
    }
}