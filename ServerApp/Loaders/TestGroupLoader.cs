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
    public class LoadTestGroup : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "testGroup";
        
        public string TestItemName { get; set; }
        
        public string SchoolItemName { get; set; }

        public string ParameterName { get; set; } = "testGroupId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            ITestGroupRepository repository = context.HttpContext.RequestServices.GetRequiredService<ITestGroupRepository>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            TestGroup testGroup = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = testGroup;
            
            if (!string.IsNullOrWhiteSpace(TestItemName))
            {
                context.HttpContext.Items[TestItemName] = testGroup.Test;
            }

            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {
                context.HttpContext.Items[SchoolItemName] = repository.GetSchool(testGroup);
            }
            
        }
    }
}