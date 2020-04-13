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
    public class LoadTestGroup : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "testGroup";
        public string ExaminationItemName { get; set; }
        
        public string TestItemName { get; set; }

        public string ParameterName { get; set; } = "testGroupId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<TestGroup, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<TestGroup, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            TestGroup testGroup = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = testGroup;
            
            if (!string.IsNullOrWhiteSpace(TestItemName))
            {
                context.HttpContext.Items[ExaminationItemName] = testGroup.Test;
            }

            if (!string.IsNullOrWhiteSpace(ExaminationItemName))
            {
                context.HttpContext.Items[ExaminationItemName] = testGroup.Test.Examination;
            }
        }
    }
}