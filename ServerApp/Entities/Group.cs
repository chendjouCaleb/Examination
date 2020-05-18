using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Group:Entity<long>
    {
        public string RegisterUserId { get; set; }

        public string Name { get; set; }

        public int Index { get; set; }

        [NotMapped] public uint Capacity => Room.Capacity;

        [JsonIgnore]
        public virtual List<Student> Students { get; set; }
        
        [JsonIgnore]
        public virtual Examination Examination { get; set; }
        public long? ExaminationId{ get; set; } 
        
        [JsonIgnore]
        public virtual Speciality Speciality { get; set; }
        public long? SpecialityId{ get; set; } 

        [JsonIgnore]
        public virtual Room Room { get; set; }
        public long RoomId { get; set; }
    }
}