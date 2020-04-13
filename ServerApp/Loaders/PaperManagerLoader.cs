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
    public class LoadPaperManager : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "paperManager";
        public string ExaminationItemName { get; set; }
        
        public string TestItemName { get; set; }
        
        public string TestGroupItemName { get; set; }

        public string ParameterName { get; set; } = "paperManagerId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<PaperManager, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<PaperManager, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            PaperManager paperManager = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = paperManager;
            
            if (!string.IsNullOrWhiteSpace(TestGroupItemName))
            {
                context.HttpContext.Items[TestGroupItemName] = paperManager.TestGroup;
            }
            
            if (!string.IsNullOrWhiteSpace(TestItemName))
            {
                context.HttpContext.Items[TestItemName] = paperManager.TestGroup.Test;
            }

            if (!string.IsNullOrWhiteSpace(ExaminationItemName))
            {
                context.HttpContext.Items[ExaminationItemName] = paperManager.TestGroup.Test.Examination;
            }
        }
    }
}