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
    public class LoadOrganisation : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "organisation";

        public string ParameterName { get; set; } = "organisationId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<Organisation, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Organisation, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            Organisation organisation = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = organisation;
        }
    }
}