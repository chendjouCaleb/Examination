using System;
using System.Linq;
using System.Security.Claims;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Authorizers
{
    public class IsPrincipalAttribute: ActionFilterAttribute
    {
        public string DepartmentItemName { get; set; } = "department";
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            string userId = context.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            
            DbContext dbContext = context.HttpContext.RequestServices.GetRequiredService<DbContext>();

            Department department = context.HttpContext.GetItem(DepartmentItemName) as Department;
            
            if (department == null)
            {
                throw new ArgumentNullException(nameof(department));
            }

            Principal principal =  dbContext.Set<Principal>()
                .First(p => department.Equals(p.Department) && p.UserId == userId);

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