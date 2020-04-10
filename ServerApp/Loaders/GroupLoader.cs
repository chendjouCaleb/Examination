using System;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Loaders
{
    [AttributeUsage(AttributeTargets.Method)]
    public class LoadGroup : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "group";
        public string ExaminationItemName { get; set; }

        public string ParameterName { get; set; } = "groupId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<Group, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Group, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            Group group = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = group;

            if (!string.IsNullOrWhiteSpace(ExaminationItemName))
            {
                context.HttpContext.Items[ExaminationItemName] = group.Examination;
            }
        }
    }
}