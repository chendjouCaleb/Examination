using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Exam.Entities.Courses;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities.Periods
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class SemesterCourseLevelSpeciality:Entity<long>
    {
        [JsonIgnore]
        public virtual SemesterCourse SemesterCourse { get; set; }
        public long? SemesterCourseId { get; set; }


        [JsonIgnore]
        public virtual SemesterLevelSpeciality SemesterLevelSpeciality { get; set; }
        public long SemesterLevelSpecialityId { get; set; }

        [JsonIgnore]
        public virtual CourseLevelSpeciality CourseLevelSpeciality { get; set; }
        public long? CourseLevelSpecialityId { get; set; }
    }
}