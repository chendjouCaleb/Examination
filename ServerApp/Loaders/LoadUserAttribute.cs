using System;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Exam.Infrastructure;
using Exam.Persistence;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using User = Exam.Entities.Identity.User;

namespace Exam.Loaders
{
    [AttributeUsage( AttributeTargets.Method)]
    public class LoadUserAttribute: Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "user";

        public string ParameterName { get; set; } = "userId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;
        public void OnResourceExecuted(ResourceExecutedContext context)
        {

        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            var dataContext = context.HttpContext.RequestServices.GetRequiredService<IdentityDataContext>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }

            User user = dataContext.Users.FirstOrDefault(u => u.Id == id);

            context.HttpContext.Items[ItemName] = user;
        }
    }
}