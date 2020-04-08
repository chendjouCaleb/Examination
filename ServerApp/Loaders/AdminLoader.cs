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
    public class LoadAdmin : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "admin";

        public string ParameterName { get; set; } = "adminId";

        public string OrganisationItemName { get; set; }

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<Admin, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Admin, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            Admin admin = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = admin;

            if (!string.IsNullOrWhiteSpace(OrganisationItemName))
            {
                context.HttpContext.Items[OrganisationItemName] = admin.Organisation;
            }
        }
    }
}