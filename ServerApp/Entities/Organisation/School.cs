using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Exam.Models.Statistics;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class School : Entity<long>
    {
        public string RegisterUserId { get; set; }
        public string PrincipalUserId { get; set; }

        [JsonIgnore] public virtual Member Principal { get; set; }
        public long? PrincipalId { get; set; }

        public string Identifier { get; set; }
        public string Name { get; set; }

        public string Acronym { get; set; }
        public string Address { get; set; }

        public bool HasImage { get; set; }

        [NotMapped]
        public bool IsPlanner { get; set; }

        [NotMapped]
        public bool IsPrincipalUser { get; set; }

        [NotMapped] public Uri ImageUrl { get; set; }

        public bool HasCoverImage { get; set; }

        [NotMapped] public Uri CoverImageUrl { get; set; }

        [JsonIgnore] public virtual List<Department> Departments { get; set; }

        [JsonIgnore] public virtual List<Member> Members { get; set; }

        [JsonIgnore] public virtual List<Examination> Examinations { get; set; }

        [JsonIgnore] public virtual List<Room> Rooms { get; set; }

        [NotMapped] public SchoolStatistics Statistics { get; set; }
    }
}