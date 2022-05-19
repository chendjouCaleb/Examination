using Exam.Entities.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Identity
{
    [ModelBinder(BinderType = typeof(LoggedUserModelBinder))]
    public class LoggedUser
    {
        public string UserId { get; set; }

        public User User { get; set; }
    }
}