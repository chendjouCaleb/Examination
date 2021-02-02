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
    public class LoadCorrector : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "corrector";
        public string DepartmentItemName { get; set; }
        public string SchoolItemName { get; set; }
        public string ParameterName { get; set; } = "correctorId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<Corrector, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Corrector, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            Corrector corrector = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = corrector;

            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                context.HttpContext.Items[DepartmentItemName] = corrector.Department;
            }
            
            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {
                context.HttpContext.Items[SchoolItemName] = corrector.Department.School;
            }
        }
    }
}