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
    public class LoadCourseTeacher : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "courseTeacher";
        
        public string CourseItemName { get; set; }
        
        public string TeacherItemName { get; set; }
        public string SchoolItemName { get; set; }
        public string DepartmentItemName { get; set; }

        public string ParameterName { get; set; } = "courseTeacherId";

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
            CourseTeacher courseTeacher = dbContext.Set<CourseTeacher>().Find((long.Parse(id)));

            context.HttpContext.Items[ItemName] = courseTeacher;
            
            if (!string.IsNullOrWhiteSpace(TeacherItemName))
            {
                context.HttpContext.Items[TeacherItemName] = courseTeacher.Teacher;
            }

            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {
                context.HttpContext.Items[SchoolItemName] = dbContext.Set<School>()
                    .First(s => s.Id == courseTeacher.Teacher.Department.SchoolId);
            }
            
            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                context.HttpContext.Items[DepartmentItemName] = dbContext.Set<Department>()
                    .First(s => s.Id == courseTeacher.Teacher.DepartmentId);
            }
            
        }
    }
}