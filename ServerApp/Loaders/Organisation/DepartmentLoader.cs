﻿using System;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Loaders
{
    [AttributeUsage(AttributeTargets.Method)]
    public class LoadDepartment : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "department";
        public string SchoolItemName { get; set; }

        public string ParameterName { get; set; } = "departmentId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            DbContext dbContext = context.HttpContext.RequestServices.GetRequiredService<DbContext>();
            
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            Department department = dbContext.Set<Department>().Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = department;

            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {
                context.HttpContext.Items[SchoolItemName] = department.School;
            }
        }
    }
}