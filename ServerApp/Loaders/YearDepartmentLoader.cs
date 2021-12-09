using System;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Loaders
{
    [AttributeUsage(AttributeTargets.Method)]
    public class LoadYearDepartment : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "yearDepartment";
        public string DepartmentItemName { get; set; }
        public string YearDepartmentItemName { get; set; }
        public string YearItemName { get; set; }
        public string ParameterName { get; set; } = "yearDepartmentId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            var repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<YearDepartment, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }

            YearDepartment yearDepartment = repository.Set
                .Include(s => s.Department)
                .First(s => s.Id == long.Parse(id));

            context.HttpContext.Items[ItemName] = yearDepartment;

            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                context.HttpContext.Items[DepartmentItemName] = yearDepartment.Department;
            }
            
            if (!string.IsNullOrWhiteSpace(YearItemName))
            {
                context.HttpContext.Items[YearItemName] = yearDepartment.Year;
            }
            
        }
    }
}