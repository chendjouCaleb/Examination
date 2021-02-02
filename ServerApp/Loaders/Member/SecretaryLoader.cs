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
    public class LoadSecretary : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "secretary";
        public string DepartmentItemName { get; set; }
        public string SchoolItemName { get; set; }

        public string ParameterName { get; set; } = "secretaryId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<Secretary, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Secretary, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            Secretary secretary = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = secretary;

            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                context.HttpContext.Items[DepartmentItemName] = secretary.Department;
            }
            
            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {
                context.HttpContext.Items[SchoolItemName] = secretary.Department.School;
            }
        }
    }
}