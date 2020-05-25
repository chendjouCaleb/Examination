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
    public class LoadTestGroupSupervisor : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "testGroupSupervisor";
        public string ExaminationItemName { get; set; }
        
        public string TestItemName { get; set; }
        
        public string TestGroupItemName { get; set; }

        public string ParameterName { get; set; } = "testGroupSupervisorId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<TestGroupSupervisor, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<TestGroupSupervisor, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            TestGroupSupervisor testGroupSupervisor = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = testGroupSupervisor;
            
            if (!string.IsNullOrWhiteSpace(TestGroupItemName))
            {
                context.HttpContext.Items[TestGroupItemName] = testGroupSupervisor.TestGroup;
            }
            
            if (!string.IsNullOrWhiteSpace(TestItemName))
            {
                context.HttpContext.Items[TestItemName] = testGroupSupervisor.TestGroup.Test;
            }

            if (!string.IsNullOrWhiteSpace(ExaminationItemName))
            {
                context.HttpContext.Items[ExaminationItemName] = testGroupSupervisor.TestGroup.Test.Examination;
            }
        }
    }
}