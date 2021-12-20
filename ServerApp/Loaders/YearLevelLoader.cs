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
    public class LoadYearLevel : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "yearLevel";
        public string DepartmentItemName { get; set; }
        public string YearDepartmentItemName { get; set; }
        public string ParameterName { get; set; } = "yearLevelId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            DbContext dbContext = context.HttpContext.RequestServices.GetRequiredService<DbContext>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }

            YearLevel yearLevel = dbContext.Set<YearLevel>()
                .Include(s => s.YearDepartment)
                .ThenInclude(s => s.Department)
                .First(s => s.Id == long.Parse(id));

            context.HttpContext.Items[ItemName] = yearLevel;

            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                context.HttpContext.Items[DepartmentItemName] = yearLevel.YearDepartment.Department;
            }
            
            if (!string.IsNullOrWhiteSpace(YearDepartmentItemName))
            {
                context.HttpContext.Items[YearDepartmentItemName] = yearLevel.YearDepartment;
            }
            
        }
    }
}