using System;
using System.Security.Claims;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Exam.Authorizers
{
    public class IsDepartmentPrincipalAttribute: ActionFilterAttribute
    {
        public string DepartmentItemName { get; set; } = "department";
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            string userId = 
                context.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            Department department = context.HttpContext.GetItem(DepartmentItemName) as Department;
            
            if (department == null)
            {
                throw new ArgumentNullException(nameof(department));
            }

            if (userId == null)
            {
                throw new ArgumentNullException(nameof(userId));
            }

            if (!department.PrincipalUserId.Equals(userId))     
            {
                throw new UnauthorizedException("L'administrateur de département est requis pour effectuer l'action.");
            }
        }
    }
}