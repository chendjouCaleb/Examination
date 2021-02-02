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
    public class LoadTestScore : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "testScore";
        public string TestItemName { get; set; }

        public string DepartmentItemName { get; set; }

        public string ParameterName { get; set; } = "testScoreId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<TestScore, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<TestScore, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }

            TestScore testScore = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = testScore;

            if (!string.IsNullOrWhiteSpace(TestItemName))
            {
                context.HttpContext.Items[TestItemName] = testScore.Test;
            }

            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                IRepository<Department, long> departmentRepository =
                    context.HttpContext.RequestServices.GetRequiredService<IRepository<Department, long>>();
                context.HttpContext.Items[DepartmentItemName] =
                    departmentRepository.First(d => d.Id == testScore.Test.Course.Level.DepartmentId);
            }
        }
    }
}