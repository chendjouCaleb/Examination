using System;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Loaders.Courses
{
    [AttributeUsage(AttributeTargets.Method)]
    public class LoadSemesterCourse : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "semesterCourse";
        public string DepartmentItemName { get; set; }
        public string SemesterItemName { get; set; }
        public string SchoolItemName { get; set; }

        public string ParameterName { get; set; } = "semesterCourseId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<SemesterCourse, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<SemesterCourse, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }

            SemesterCourse semesterCourse = repository.Set
                .Include(s => s.SemesterLevel)
                .ThenInclude(s => s.YearLevel)
                .ThenInclude(s => s.YearDepartment)
                .ThenInclude(s => s.Department)
                .ThenInclude(s => s.School)
                .First(s => s.Id == long.Parse(id));

            context.HttpContext.Items[ItemName] = semesterCourse;

            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                context.HttpContext.Items[DepartmentItemName] =
                    semesterCourse.SemesterLevel.YearLevel.Level.DepartmentId;
            }
            
            if (!string.IsNullOrWhiteSpace(SemesterItemName))
            {
                context.HttpContext.Items[DepartmentItemName] =
                    semesterCourse.SemesterLevel;
            }
            
            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {

                context.HttpContext.Items[SchoolItemName] =
                    semesterCourse.SemesterLevel.YearLevel.Level.Department.SchoolId;
            }
        }
    }
}