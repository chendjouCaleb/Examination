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
    public class LoadApplication : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "application";
        public string LevelItemName { get; set; }
        public string DepartmentItemName { get; set; }

        public string ParameterName { get; set; } = "applicationId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<Application, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Application, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            Application application = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = application;

            if (!string.IsNullOrWhiteSpace(LevelItemName))
            {
                context.HttpContext.Items[LevelItemName] = application.Level;
            }
            
            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                context.HttpContext.Items[DepartmentItemName] = application.Level.Department;
            }
        }
    }
}