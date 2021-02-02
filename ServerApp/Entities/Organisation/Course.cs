using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Course : Entity<long>
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public string Code { get; set; }

        /// <summary>
        /// Tell if the course is used by a level or a speciality.
        /// </summary>
        public bool IsGeneral { get; set; }


        [JsonIgnore] public virtual Level Level { get; set; }
        public long? LevelId { get; set; }

        /// <summary>
        /// La note maximale pouvant être obtenue.
        /// </summary>
        public uint Radical { get; set; }

        public bool MultipleScore { get; set; }
        
        public uint Coefficient { get; set; }

        [JsonIgnore] public virtual List<CourseLevelSpeciality> CourseLevelSpecialities { get; set; }


        [JsonIgnore] public virtual List<Score> Scores { get; set; }

        [JsonIgnore] public virtual List<Test> Tests { get; set; }
    }
}