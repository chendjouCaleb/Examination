using System;
using Everest.AspNetStartup.Models;

namespace Exam.Entities.Identity
{
    public class UserCode:Entity<long>
    {
        public string EmailOrPhone { get; set; }
        public string Code { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}