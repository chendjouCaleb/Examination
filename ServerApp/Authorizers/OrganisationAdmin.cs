using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Authorizers
{
    public class AuthorizeOrganisationAdmin: ActionFilterAttribute
    {
        public string OrganisationItemName { get; set; } = "organisation";

        public string Message { get; set; } =
            "L'administrateur de cet organisation est requis pour effectuer l'action.";
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            IRepository<Admin, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Admin, long>>();
            
            Authorization authorization = 
                context.HttpContext.Items["Authorization"] as Authorization;

            Organisation organisation = context.HttpContext.GetItem(OrganisationItemName) as Organisation;
            Assert.RequireNonNull(authorization, nameof(authorization));
            Assert.RequireNonNull(organisation, nameof(organisation));
            string userId = authorization.UserId;

            
            if (!(organisation.AdminUserId == userId && repository.Exists(a => a.UserId==userId && organisation.Equals(a.Organisation))))
            {
                throw new UnauthorizedException(Message);
            }
        }
    }
}