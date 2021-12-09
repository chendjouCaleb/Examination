using System;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Exam.Loaders
{
    [AttributeUsage(AttributeTargets.Method)]
    public class LoadYearTeacher : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "yearTeacher";

        public string ParameterName { get; set; } = "yearTeacherId";

        public string SchoolItemName { get; set; }

        public string DepartmentItemName { get; set; }

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

            YearTeacher yearTeacher = dbContext.Set<YearTeacher>()
                .Where(y => y.Id == long.Parse(id))
                .Include(y => y.YearDepartment.Department)
                .FirstOrDefault();

            context.HttpContext.Items[ItemName] = yearTeacher;

            if (yearTeacher != null)
            {
                context.HttpContext.Items[DepartmentItemName] = yearTeacher.YearDepartment.Department;
            }
        }
    }
}