using System;
using System.Security.Claims;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Entities.Identity;
using Exam.Persistence;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Authorizers
{
    public class IsUserAttribute: ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if(context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            string userId = context.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            var dataContext = context.HttpContext.RequestServices.GetRequiredService<IdentityDataContext>();
            User authUser = dataContext.Users.Find(userId);
            User user = context.HttpContext.Items["user"] as User;

            if (user == null)
            {
                throw new InvalidOperationException("User resource absent!");
            }


            if (user.Id != authUser?.Id)
            {
                throw new UnauthorizedException("{user.requireOwner}");
            }
        }
    }
}