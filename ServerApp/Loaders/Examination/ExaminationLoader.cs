using System;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Exam.Loaders
{
    [AttributeUsage(AttributeTargets.Method)]
    public class LoadExamination : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "examination";

        public string ParameterName { get; set; } = "examinationId";

        public string SchoolItemName { get; set; }

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            DbContext dbContext = context.HttpContext.RequestServices.GetRequiredService<DbContext>();
            var repository = dbContext.Set<Examination>();
                
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            Examination examination = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = examination;

            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {
                context.HttpContext.Items[SchoolItemName] = dbContext.Set<School>()
                    .First(s => s.Equals(examination.Semester.Year.School));
            }
        }
    }
}