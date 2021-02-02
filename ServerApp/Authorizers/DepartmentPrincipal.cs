using System;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Exam.Authorizers
{
    public class AuthorizeDepartmentPrincipalAttribute: ActionFilterAttribute
    {
        public string DepartmentItemName { get; set; } = "department";
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            Authorization authorization = 
                context.HttpContext.Items["Authorization"] as Authorization;

            Department department = context.HttpContext.GetItem(DepartmentItemName) as Department;
            
            if (department == null)
            {
                throw new ArgumentNullException(nameof(department));
            }

            if (authorization == null)
            {
                throw new ArgumentNullException(nameof(authorization));
            }

            if (!department.PrincipalUserId.Equals(authorization.UserId)) 
            {
                throw new UnauthorizedException("L'administrateur de département est requis pour effectuer l'action.");
            }
        }
    }
}