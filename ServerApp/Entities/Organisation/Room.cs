using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Exam.Entities.Courses;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Room : Entity<long>
    {
        public string Name { get; set; }
        public uint Capacity { get; set; }
        public string Address { get; set; }
        
        public string RegisterUserId { get; set; }
        
        public bool HasImage { get; set; }
        public string ImageName { get; set; }
        
        [NotMapped]
        public string ImageUrl { get; set; }
        
        [JsonIgnore]
        public virtual School School { get; set; }
        public long SchoolId { get; set; }
        
        [JsonIgnore]
        public virtual Department Department { get; set; }
        public long? DepartmentId { get; set; }

        [JsonIgnore]
        public virtual Level Level  { get; set; }
        public long? LevelId { get; set; }
        
        [JsonIgnore] public virtual List<CourseHour> CourseHours { get; set; }
        [JsonIgnore] public virtual List<CourseSession> CourseSessions { get; set; }
        
        
    }
}