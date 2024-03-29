﻿using System;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Loaders
{
    [AttributeUsage(AttributeTargets.Method)]
    public class LoadStudent : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "student";
        
        public string LevelItemName { get; set; }
        public string DepartmentItemName { get; set; }
        public string SchoolItemName { get; set; }

        public string ParameterName { get; set; } = "studentId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<Student, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Student, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            Student student = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = student;

            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                context.HttpContext.Items[DepartmentItemName] = student.Level.Department;
            }
            
            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {
                context.HttpContext.Items[SchoolItemName] = student.Level.Department.School;
            }
            
            if (!string.IsNullOrWhiteSpace(LevelItemName))
            {
                context.HttpContext.Items[LevelItemName] = student.Level.Department.School;
            }
        }
    }
}