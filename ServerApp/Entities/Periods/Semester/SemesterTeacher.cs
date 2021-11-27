using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities.Periods
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class SemesterTeacher:Entity<long>
    {
        public virtual YearTeacher YearTeacher { get; set; }
        public long? YearTeacherId { get; set; }

        public virtual SemesterDepartment SemesterDepartment { get; set; }
        public long SemesterDepartmentId { get; set; }

        [JsonIgnore]
        public virtual List<SemesterCourseTeacher> SemesterCourseTeachers { get; set; }
    }
}