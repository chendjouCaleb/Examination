using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Exam.Entities.Courses;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities.Periods
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class SemesterCourse:Entity<long>
    {
        
        public bool PracticalWork { get; set; }
        
        public bool IsGeneral { get; set; }
        
        public uint Coefficient { get; set; }
        
        public uint Radical { get; set; }

        public bool Required { get; set; } = true;

        public virtual Course Course { get; set; }
        public long? CourseId { get; set; }

        [JsonIgnore]
        public virtual SemesterLevel SemesterLevel { get; set; }
        public long? SemesterLevelId { get; set; }

        
        public virtual List<SemesterCourseLevelSpeciality> SemesterCourseLevelSpecialities { get; set; }
        
        [JsonIgnore]
        public virtual List<CourseHour> CourseHours { get; set; }
        
        [JsonIgnore]
        public virtual List<CourseSession> CourseSessions { get; set; }
        
        [JsonIgnore] public virtual List<Test> Tests { get; set; }
        
        
        
    }
}