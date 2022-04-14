using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace Exam.Entities.Identity
{
    public class User:IdentityUser
    {
        public DateTime RegistrationDate { get; set; }

        /// <summary>
        /// Tells if the user is blocked and the date date on which he was blocked.
        /// </summary>
        public DateTime? BlockedDate { get; set; }

        public bool Blocked => BlockedDate != null;

        public bool IsPrincipal { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string FullName => $"{FirstName} {LastName}";
        
        public DateTime BirthDate { get; set; }

        public string Gender { get; set; }
        
        [NotMapped]
        public string ImageName { get; set; }

        public bool HasImage { get; set; }

        [NotMapped]
        public Uri ImageUrl { get; set; }

        [NotMapped]
        public Uri Url { get; set; }
        
        [JsonIgnore]
        public virtual IList<Connection> Connections { get; set; }
    }
}