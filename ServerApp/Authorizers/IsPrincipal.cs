using System;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Authorizers
{
    public class IsPrincipalAttribute: ActionFilterAttribute
    {
        public string DepartmentItemName { get; set; } = "department";
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            Authorization authorization = 
                context.HttpContext.Items["Authorization"] as Authorization;
            
            IRepository<Principal, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Principal, long>>();

            Department department = context.HttpContext.GetItem(DepartmentItemName) as Department;
            
            if (department == null)
            {
                throw new ArgumentNullException(nameof(department));
            }

            if (authorization == null)
            {
                throw new ArgumentNullException(nameof(authorization));
            }

            Principal principal =
                repository.First(p => department.Equals(p.Department) && p.UserId == authorization.UserId);

            if (principal == null) 
            {
                throw new UnauthorizedException("Un régistreur département est requis pour effectuer l'action.");
            }

            if (context.ActionArguments.ContainsKey("principal"))
            {
                context.ActionArguments["principal"] = principal;
            }
        }
    }
}