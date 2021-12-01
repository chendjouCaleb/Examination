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
    public class LoadSemesterCourseTeacher : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "semesterCourseTeacher";
        public string SemesterLevelItemName { get; set; }
        public string DepartmentItemName { get; set; }
        public string SemesterTeacherItemName { get; set; }
        public string ParameterName { get; set; } = "semesterCourseTeacherId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            var repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<SemesterCourseTeacher, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }

            SemesterCourseTeacher semesterCourseTeacher = repository.Set
                .Include(s => s.SemesterCourse)
                .ThenInclude(s => s.SemesterLevel)
                .ThenInclude(s => s.SemesterDepartment)
                .ThenInclude(s => s.YearDepartment)
                .ThenInclude(s => s.Department)
                .First(s => s.Id == long.Parse(id));

            context.HttpContext.Items[ItemName] = semesterCourseTeacher;

            if (!string.IsNullOrWhiteSpace(SemesterLevelItemName))
            {
                context.HttpContext.Items[SemesterLevelItemName] = semesterCourseTeacher.SemesterCourse.SemesterLevel;
            }
            
            if (!string.IsNullOrWhiteSpace(SemesterLevelItemName))
            {
                context.HttpContext.Items[SemesterLevelItemName] = semesterCourseTeacher.SemesterCourse.SemesterLevel;
            }
            
            if (!string.IsNullOrWhiteSpace(SemesterTeacherItemName))
            {
                context.HttpContext.Items[SemesterTeacherItemName] = semesterCourseTeacher.SemesterTeacher;
            }
            
        }
    }
}