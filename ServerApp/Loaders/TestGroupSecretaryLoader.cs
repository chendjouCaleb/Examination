using System;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Persistence.Repositories;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Loaders
{
    [AttributeUsage(AttributeTargets.Method)]
    public class LoadTestGroupSecretary : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "testGroupSecretary";
        
        public string TestItemName { get; set; }
        
        public string TestGroupItemName { get; set; }
        
        public string SchoolItemName { get; set; }
        
        public string ExaminationItemName { get; set; }

        public string ParameterName { get; set; } = "testGroupSecretaryId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            ITestGroupSecretaryRepository repository =
                context.HttpContext.RequestServices.GetRequiredService<ITestGroupSecretaryRepository>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            TestGroupSecretary testGroupSecretary = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = testGroupSecretary;
            
            if (!string.IsNullOrWhiteSpace(TestGroupItemName))
            {
                context.HttpContext.Items[TestGroupItemName] = testGroupSecretary.TestGroup;
            }
            
            if (!string.IsNullOrWhiteSpace(TestItemName))
            {
                context.HttpContext.Items[TestItemName] = testGroupSecretary.TestGroup.Test;
            }
            
            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {
                context.HttpContext.Items[SchoolItemName] = repository.GetSchool(testGroupSecretary);
            }
            
            if (!string.IsNullOrWhiteSpace(ExaminationItemName))
            {
                context.HttpContext.Items[ExaminationItemName] = repository.GetExamination(testGroupSecretary);
            }
            
        }
    }
}