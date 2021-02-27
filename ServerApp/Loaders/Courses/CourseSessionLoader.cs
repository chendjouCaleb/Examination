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
    public class LoadCourseSession : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "courseSession";
        
        public string CourseItemName { get; set; }
        
        public string CourseHourItemName { get; set; }
        
        public string CourseTeacherItemName { get; set; }
        public string SchoolItemName { get; set; }
        public string DepartmentItemName { get; set; }

        public string ParameterName { get; set; } = "courseSessionId";

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
            CourseSession courseSession = dbContext.Set<CourseSession>().Find((long.Parse(id)));

            context.HttpContext.Items[ItemName] = courseSession;
            
            if (!string.IsNullOrWhiteSpace(CourseTeacherItemName))
            {
                context.HttpContext.Items[CourseTeacherItemName] = courseSession.CourseTeacher;
            }
            
            if (!string.IsNullOrWhiteSpace(CourseHourItemName))
            {
                context.HttpContext.Items[CourseHourItemName] = courseSession.CourseHour;
            }
            
            if (!string.IsNullOrWhiteSpace(CourseItemName))
            {
                context.HttpContext.Items[CourseItemName] = courseSession.Course;
            }

            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {
                context.HttpContext.Items[SchoolItemName] = dbContext.Set<School>()
                    .First(s => s.Id == courseSession.Course.Level.Department.SchoolId);
            }
            
            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                context.HttpContext.Items[DepartmentItemName] = dbContext.Set<Department>()
                    .First(s => s.Id == courseSession.Course.Level.DepartmentId);
            }
            
        }
    }
}