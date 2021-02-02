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
    public class LoadCourseLevelSpeciality : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "courseLevelSpeciality";
        public string DepartmentItemName { get; set; }
        

        public string ParameterName { get; set; } = "courseLevelSpecialityId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<CourseLevelSpeciality, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<CourseLevelSpeciality, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            CourseLevelSpeciality courseLevelSpeciality = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = courseLevelSpeciality;

            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                IRepository<Department, long> departmentRepository =
                    context.HttpContext.RequestServices.GetRequiredService<IRepository<Department, long>>();
                context.HttpContext.Items[DepartmentItemName] =
                    departmentRepository.First(d => d.Id == courseLevelSpeciality.Course.Level.DepartmentId);
            }
            
        }
    }
}