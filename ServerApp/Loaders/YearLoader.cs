using System;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Infrastructure;

namespace Exam.Loaders
{
    [AttributeUsage(AttributeTargets.Method)]
    public class LoadYear : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "year";

        public string ParameterName { get; set; } = "yearId";

        public string SchoolItemName { get; set; }

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<Year, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Year, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            Year year = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = year;

            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {
                context.HttpContext.Items[SchoolItemName] = year.School;
            }
        }
    }
}