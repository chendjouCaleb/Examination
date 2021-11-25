using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Exam.Authorizers
{
    public class IsDirectorAttribute: ActionFilterAttribute
    {
        public string SchoolItemName { get; set; } = "school";
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            Authorization authorization = 
                context.HttpContext.Items["Authorization"] as Authorization;

            School school = context.HttpContext.GetItem(SchoolItemName) as School;
            Assert.RequireNonNull(authorization, nameof(authorization));
            Assert.RequireNonNull(school, nameof(school));

            if (school.PrincipalUserId != authorization.UserId)
            {
                throw new UnauthorizedException("L'administrateur principal de cet school est requis pour effectuer l'action.");
            }
        }
    }
}