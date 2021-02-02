using System;
using Everest.AspNetStartup.Infrastructure;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Persistence.Repositories;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Loaders
{
    [AttributeUsage(AttributeTargets.Method)]
    public class LoadTest : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "test";

        public string SchoolItemName { get; set; }

        public string ExaminationItemName { get; set; }
        public string DepartmentItemName { get; set; }

        public string ParameterName { get; set; } = "testId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            ITestRepository repository = context.HttpContext.RequestServices.GetRequiredService<ITestRepository>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }

            Test test = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = test;
            
            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {
                context.HttpContext.Items[SchoolItemName] = repository.GetSchool(test);
            }
            
            if (!string.IsNullOrWhiteSpace(ExaminationItemName))
            {
                context.HttpContext.Items[ExaminationItemName] = repository.GetExamination(test);
            }

            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                context.HttpContext.Items[DepartmentItemName] = repository.GetDepartment(test);
            }
        }
    }
}