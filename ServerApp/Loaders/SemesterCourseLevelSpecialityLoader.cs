using System;
using System.Linq;
using System.Linq.Dynamic.Core;
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
    public class LoadSemesterCourseLevelSpeciality : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "semesterCourseLevelSpeciality";

        public string SemesterCourseItemName { get; set; }
        public string DepartmentItemName { get; set; }
        public string ParameterName { get; set; } = "semesterCourseLevelSpecialityId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            var dbContext = context.HttpContext.RequestServices.GetRequiredService<DbContext>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }

            SemesterCourseLevelSpeciality item = dbContext.Set<SemesterCourseLevelSpeciality>()
                .Include(s => s.SemesterCourse)
                .First(s => s.Id == long.Parse(id));

            context.HttpContext.Items[ItemName] = item;

            if (!string.IsNullOrWhiteSpace(SemesterCourseItemName))
            {
                context.HttpContext.Items[SemesterCourseItemName] = item.SemesterCourse;
            }

            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                context.HttpContext.Items[DepartmentItemName] = dbContext
                    .Set<Department>()
                    .FirstOrDefault(d =>
                        d.Equals(item.SemesterCourse.SemesterLevel.SemesterDepartment.YearDepartment.Department));
            }
        }
    }
}