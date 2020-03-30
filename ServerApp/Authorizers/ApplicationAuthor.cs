using System;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Exam.Authorizers
{
    public class AuthorizeApplicationAuthor : ActionFilterAttribute
    {
        public string ApplicationItemName { get; set; } = "application";

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            Authorization authorization = context.HttpContext.Items["Authorization"] as Authorization ??
                                          throw new ArgumentNullException(nameof(authorization));

            Application application = context.HttpContext.GetItem("application") as Application ??
                                      throw new ArgumentNullException(nameof(application));


            if (application.UserId != authorization.UserId)
            {
                throw new UnauthorizedException("L'auteur de cette demande est requis pour effectuer l'action.");
            }
        }
    }
}