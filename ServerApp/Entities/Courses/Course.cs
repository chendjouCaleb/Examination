using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities.Courses
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Course : Entity<long>
    {
        public string Name { get; set; }
        public string Description { get; set; }


        /// <summary>
        /// Formatted string to represent all chapters.
        /// Chapter title begin with a #
        /// Chapter description begin with a ##
        /// </summary>
        public string ChapterText { get; set; }
        
        public bool PracticalWork { get; set; }

        public string Code { get; set; }

        /// <summary>
        /// Tells if the course is used by a level or a speciality.
        /// </summary>
        public bool IsGeneral { get; set; }


        [JsonIgnore] public virtual Level Level { get; set; }
        public long? LevelId { get; set; }

        /// <summary>
        /// The max score that can be obtained by a student.
        /// </summary>
        public uint Radical { get; set; }

        /// <summary>
        /// Tells if the course have a detailed scores.
        /// </summary>
        public bool MultipleScore { get; set; }
        
        public uint Coefficient { get; set; }

        [JsonIgnore] public virtual List<CourseLevelSpeciality> CourseLevelSpecialities { get; set; }


        [JsonIgnore] public virtual List<Score> Scores { get; set; }

        [JsonIgnore] public virtual List<Test> Tests { get; set; }
        
        [JsonIgnore] public virtual List<CourseTeacher> CourseTeachers { get; set; }
        
        
    }
}