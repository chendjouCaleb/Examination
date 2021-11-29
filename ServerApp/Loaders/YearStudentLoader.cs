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
    public class LoadYearStudent : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "yearStudent";

        public string ParameterName { get; set; } = "yearStudentId";

        public string SchoolItemName { get; set; }

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<YearStudent, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<YearStudent, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            YearStudent yearStudent = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = yearStudent;
        }
    }
}