using System.Collections.Generic;
using Everest.AspNetStartup.Models;
using Newtonsoft.Json;

namespace Exam.Entities.Periods
{
    public class YearTeacher:Entity<long>
    {
        public virtual Teacher Teacher { get; set; }
        public long? TeacherId { get; set; }

        [JsonIgnore]
        public virtual YearDepartment YearDepartment { get; set; }
        public long YearDepartmentId { get; set; }
        
        [JsonIgnore]
        public virtual List<SemesterTeacher> SemesterTeachers { get; set; }
    }
}