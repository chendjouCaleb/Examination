using System;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Exam.Entities.Periods;
using Exam.Infrastructure;

namespace Exam.Loaders
{
    [AttributeUsage(AttributeTargets.Method)]
    public class LoadSemester : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "semester";

        public string ParameterName { get; set; } = "semesterId";

        public string SchoolItemName { get; set; }

        public string YearItemName { get; set; }

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<Semester, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Semester, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            Semester semester = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = semester;

            if (!string.IsNullOrWhiteSpace(YearItemName))
            {
                context.HttpContext.Items[YearItemName] = semester.Year;
            }
            
            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {
                context.HttpContext.Items[SchoolItemName] = semester.Year.School;
            }
        }
    }
}