using System;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Loaders
{
    [AttributeUsage(AttributeTargets.Method)]
    public class LoadSemesterLevel : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "semesterLevel";
        public string DepartmentItemName { get; set; }
        public string SemesterDepartmentItemName { get; set; }
        public string ParameterName { get; set; } = "semesterLevelId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            var repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<SemesterLevel, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }

            SemesterLevel semesterLevel = repository.Set
                .Include(s => s.SemesterDepartment)
                .ThenInclude(s => s.YearDepartment)
                .ThenInclude(s => s.Department)
                .First(s => s.Id == long.Parse(id));

            context.HttpContext.Items[ItemName] = semesterLevel;

            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                context.HttpContext.Items[DepartmentItemName] = semesterLevel.SemesterDepartment.YearDepartment.Department;
            }
            
            if (!string.IsNullOrWhiteSpace(SemesterDepartmentItemName))
            {
                context.HttpContext.Items[DepartmentItemName] = semesterLevel.SemesterDepartment;
            }
            
        }
    }
}