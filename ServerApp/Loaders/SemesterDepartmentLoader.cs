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
    public class LoadSemesterDepartment : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "semesterDepartment";
        public string DepartmentItemName { get; set; }
        public string YearDepartmentItemName { get; set; }
        public string ParameterName { get; set; } = "semesterDepartmentId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            var repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<SemesterDepartment, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }

            SemesterDepartment semesterDepartment = repository.Set
                .Include(s => s.YearDepartment)
                .ThenInclude(s => s.Department)
                .First(s => s.Id == long.Parse(id));

            context.HttpContext.Items[ItemName] = semesterDepartment;

            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                context.HttpContext.Items[DepartmentItemName] = semesterDepartment.YearDepartment.Department;
            }
            
            if (!string.IsNullOrWhiteSpace(YearDepartmentItemName))
            {
                context.HttpContext.Items[YearDepartmentItemName] = semesterDepartment.YearDepartment;
            }
            
        }
    }
}