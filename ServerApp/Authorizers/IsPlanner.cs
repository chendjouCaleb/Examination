using System;
using System.Security.Claims;
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
    public class IsPlannerAttribute: ActionFilterAttribute
    {
        public string SchoolItemName { get; set; } = "school";
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            string userId = context.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            
            IRepository<Planner, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Planner, long>>();

            School school = context.HttpContext.GetItem(SchoolItemName) as School;
            
            if (school == null)
            {
                throw new ArgumentNullException(nameof(school));
            }
            
            Planner planner =
                repository.First(p => school.Equals(p.School) && p.UserId == userId);

            if (planner == null) 
            {
                throw new UnauthorizedException("Un planificateur est requis pour effectuer l'action.");
            }

            if (context.ActionArguments.ContainsKey("planner"))
            {
                context.ActionArguments["planner"] = planner;
            }
        }
    }
}