using System;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Exam.Entities;
using Exam.Infrastructure;

namespace Exam.Loaders
{
    [AttributeUsage(AttributeTargets.Method)]
    public class LoadPrincipal : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "principal";

        public string ParameterName { get; set; } = "principalId";

        public string ExaminationItemName { get; set; }

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<Principal, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Principal, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            Principal principal = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = principal;

            if (!string.IsNullOrWhiteSpace(ExaminationItemName))
            {
                context.HttpContext.Items[ExaminationItemName] = principal.Examination;
            }
        }
    }
}