using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Exam.Authorizers
{
    public class AuthorizeOrganisationAdmin: ActionFilterAttribute
    {
        public string OrganisationItemName { get; set; } = "organisation";
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            Authorization authorization = 
                context.HttpContext.Items["Authorization"] as Authorization;

            Organisation organisation = context.HttpContext.GetItem("organisation") as Organisation;
            Assert.RequireNonNull(authorization, nameof(authorization));
            Assert.RequireNonNull(organisation, nameof(organisation));

            if (organisation.AdminUserId != authorization.UserId)
            {
                throw new UnauthorizedException("L'administrateur de cet organisation est requis pour effectuer l'action.");
            }
        }
    }
}