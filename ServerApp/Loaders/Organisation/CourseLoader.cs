using System;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Loaders
{
    [AttributeUsage(AttributeTargets.Method)]
    public class LoadCourse : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "course";
        public string DepartmentItemName { get; set; }
        public string SchoolItemName { get; set; }

        public string ParameterName { get; set; } = "courseId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<Course, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Course, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            Course course = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = course;

            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                IRepository<Department, long> departmentRepository =
                    context.HttpContext.RequestServices.GetRequiredService<IRepository<Department, long>>();
                context.HttpContext.Items[DepartmentItemName] =
                    departmentRepository.First(d => d.Id == course.Level.DepartmentId);
            }
            
            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {
                IRepository<School, long> schoolRepository =
                    context.HttpContext.RequestServices.GetRequiredService<IRepository<School, long>>();
                context.HttpContext.Items[SchoolItemName] =
                    schoolRepository.First(d => d.Id == course.Level.Department.SchoolId);
            }
        }
    }
}