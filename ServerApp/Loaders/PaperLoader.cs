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
    public class LoadPaper : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "paper";
        
        
        public string TestItemName { get; set; }
        
        public string TestGroupItemName { get; set; }

        public string ParameterName { get; set; } = "paperId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<Paper, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Paper, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            Paper paper = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = paper;
            
            if (!string.IsNullOrWhiteSpace(TestGroupItemName))
            {
                context.HttpContext.Items[TestGroupItemName] = paper.TestGroup;
            }
            
            if (!string.IsNullOrWhiteSpace(TestItemName))
            {
                context.HttpContext.Items[TestItemName] = paper.Test;
            }
            
        }
    }
}