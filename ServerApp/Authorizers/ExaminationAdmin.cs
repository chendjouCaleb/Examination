using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Exam.Authorizers
{
    public class AuthorizeExaminationAdmin: ActionFilterAttribute
    {
        public string ExaminationItemName { get; set; } = "examination";
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            Authorization authorization = 
                context.HttpContext.Items["Authorization"] as Authorization;

            Examination examination = context.HttpContext.GetItem("examination") as Examination;
            Assert.RequireNonNull(authorization, nameof(authorization));
            Assert.RequireNonNull(examination, nameof(examination));

            if (examination.AdminUserId != authorization.UserId)
            {
                throw new UnauthorizedException("L'administrateur de cet examen est requis pour effectuer l'action.");
            }
        }
    }
}