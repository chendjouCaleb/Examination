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
    public class LoadTest : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "test";
        public string ExaminationItemName { get; set; }

        public string ParameterName { get; set; } = "testId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<Test, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Test, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            Test test = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = test;

            if (string.IsNullOrWhiteSpace(ExaminationItemName))
            {
                context.HttpContext.Items[ExaminationItemName] = test.Examination;
            }
        }
    }
}