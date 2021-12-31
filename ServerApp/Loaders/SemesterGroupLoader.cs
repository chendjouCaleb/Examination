using System;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Loaders
{
    [AttributeUsage(AttributeTargets.Method)]
    public class LoadSemesterGroup : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "semesterGroup";
        public string DepartmentItemName { get; set; }
        public string SemesterLevelItemName { get; set; }
        public string SchoolItemName { get; set; }
        public string ParameterName { get; set; } = "semesterGroupId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            var _dbContext = context.HttpContext.RequestServices.GetRequiredService<DbContext>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }

            SemesterGroup semesterGroup = _dbContext.Set<SemesterGroup>().First(s => s.Id == long.Parse(id));

            context.HttpContext.Items[ItemName] = semesterGroup;

            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                context.HttpContext.Items[DepartmentItemName] = _dbContext.Set<Department>()
                    .First(d => d.Equals(semesterGroup.SemesterLevel.YearLevel.Level.Department));
            }
            
            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {
                context.HttpContext.Items[SchoolItemName] = _dbContext.Set<School>()
                    .First(d => d.Equals(semesterGroup.SemesterLevel.YearLevel.Level.Department.School));
            }
            
            if (!string.IsNullOrWhiteSpace(SemesterLevelItemName))
            {
                context.HttpContext.Items[SemesterLevelItemName] = _dbContext.Set<SemesterLevel>()
                    .First(d => d.Equals(semesterGroup.SemesterLevel));
            }
            
        }
    }
}