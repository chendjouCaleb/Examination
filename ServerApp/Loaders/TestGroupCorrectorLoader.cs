﻿using System;
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
    public class LoadTestGroupCorrector : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "testGroupCorrector";
        
        public string TestItemName { get; set; }
        
        public string TestGroupItemName { get; set; }
        
        public string SchoolItemName { get; set; }
        
        public string ExaminationItemName { get; set; }

        public string ParameterName { get; set; } = "testGroupCorrectorId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            ITestGroupCorrectorRepository repository =
                context.HttpContext.RequestServices.GetRequiredService<ITestGroupCorrectorRepository>();
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

            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {
                context.HttpContext.Items[SchoolItemName] = repository.GetSchool(testGroupCorrector);
            }
            
            if (!string.IsNullOrWhiteSpace(ExaminationItemName))
            {
                context.HttpContext.Items[ExaminationItemName] = repository.GetExamination(testGroupCorrector);
            }
        }
    }
}