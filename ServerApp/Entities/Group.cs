using System.Collections.Generic;
using Everest.AspNetStartup.Models;
using Newtonsoft.Json;

namespace Exam.Entities
{
    public class Group:Entity<long>
    {
        public string RegisterUserId { get; set; }

        public virtual List<Student> Students { get; set; }
        
        [JsonIgnore]
        public virtual Examination Examination { get; set; }
        public long ExaminationId;
        
        [JsonIgnore]
        public virtual Speciality Speciality { get; set; }
        public long? SpecialityId;

        public virtual Room Room { get; set; }
        public long? RoomId { get; set; }
    }
}