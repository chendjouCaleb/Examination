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
    public class LoadTeacher : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "teacher";
        public string DepartmentItemName { get; set; }
        public string SchoolItemName { get; set; }

        public string ParameterName { get; set; } = "teacherId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<Teacher, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Teacher, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            Teacher teacher = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = teacher;

            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                context.HttpContext.Items[DepartmentItemName] = teacher.Department;
            }
            
            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {
                context.HttpContext.Items[SchoolItemName] = teacher.Department.School;
            }
        }
    }
}