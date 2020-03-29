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
    public class LoadSpeciality : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "speciality";
        public string ExaminationItemName { get; set; }

        public string ParameterName { get; set; } = "specialityId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<Speciality, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Speciality, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            Speciality speciality = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = speciality;

            if (!string.IsNullOrWhiteSpace(ExaminationItemName))
            {
                context.HttpContext.Items[ExaminationItemName] = speciality.Examination;
            }
        }
    }
}