using System;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Loaders.Courses
{
    [AttributeUsage(AttributeTargets.Method)]
    public class LoadCourseHour : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "courseHour";
        
        public string CourseItemName { get; set; }
        
        public string CourseTeacherItemName { get; set; }
        public string SchoolItemName { get; set; }
        public string DepartmentItemName { get; set; }

        public string ParameterName { get; set; } = "courseHourId";

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
            CourseHour courseHour = dbContext.Set<CourseHour>().Find((long.Parse(id)));

            context.HttpContext.Items[ItemName] = courseHour;
            
            if (!string.IsNullOrWhiteSpace(CourseTeacherItemName))
            {
                context.HttpContext.Items[CourseTeacherItemName] = courseHour.SemesterCourseTeacher;
            }
            
            if (!string.IsNullOrWhiteSpace(CourseItemName))
            {
                context.HttpContext.Items[CourseItemName] = courseHour.SemesterCourse;
            }

            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {
                context.HttpContext.Items[SchoolItemName] = dbContext.Set<School>()
                    .First(s => s.Id == courseHour.SemesterCourse.SemesterLevel.SemesterDepartment.Semester.Year.SchoolId);
            }
            
            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                context.HttpContext.Items[DepartmentItemName] = dbContext.Set<Department>()
                    .First(s => s.Id == courseHour.SemesterCourse.SemesterLevel.SemesterDepartment.YearDepartment.DepartmentId);
            }
            
        }
    }
}