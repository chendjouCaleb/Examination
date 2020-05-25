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
    public class LoadTestGroupCorrector : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "testGroupCorrector";
        public string ExaminationItemName { get; set; }
        
        public string TestItemName { get; set; }
        
        public string TestGroupItemName { get; set; }

        public string ParameterName { get; set; } = "testGroupCorrectorId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<TestGroupCorrector, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<TestGroupCorrector, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            TestGroupCorrector testGroupCorrector = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = testGroupCorrector;
            
            if (!string.IsNullOrWhiteSpace(TestGroupItemName))
            {
                context.HttpContext.Items[TestGroupItemName] = testGroupCorrector.TestGroup;
            }
            
            if (!string.IsNullOrWhiteSpace(TestItemName))
            {
                context.HttpContext.Items[TestItemName] = testGroupCorrector.TestGroup.Test;
            }

            if (!string.IsNullOrWhiteSpace(ExaminationItemName))
            {
                context.HttpContext.Items[ExaminationItemName] = testGroupCorrector.TestGroup.Test.Examination;
            }
        }
    }
}