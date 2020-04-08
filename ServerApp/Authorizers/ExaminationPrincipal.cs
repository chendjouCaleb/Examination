using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Exam.Authorizers
{
    public class AuthorizePrincipal: ActionFilterAttribute
    {
        public string ExaminationItemName { get; set; } = "examination";
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            Authorization authorization = 
                context.HttpContext.Items["Authorization"] as Authorization;

            Examination examination = context.HttpContext.GetItem(ExaminationItemName) as Examination;
            Assert.RequireNonNull(authorization, nameof(authorization));
            Assert.RequireNonNull(examination, nameof(examination));

            if (!examination.Principals.Exists(p => p.UserId == authorization.UserId))
            {
                throw new UnauthorizedException("LUn gestionnaire de cet examen est requis pour effectuer l'action.");
            }
        }
    }
}