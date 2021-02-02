using System;
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
    public class LoadTestLevelSpeciality : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "testLevelSpeciality";
        public string DepartmentItemName { get; set; }
        

        public string ParameterName { get; set; } = "testLevelSpecialityId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            ITestLevelSpecialityRepository repository =
                context.HttpContext.RequestServices.GetRequiredService<ITestLevelSpecialityRepository>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            TestLevelSpeciality testLevelSpeciality = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = testLevelSpeciality;

            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                IRepository<Department, long> departmentRepository =
                    context.HttpContext.RequestServices.GetRequiredService<IRepository<Department, long>>();
                context.HttpContext.Items[DepartmentItemName] =
                    departmentRepository.First(d => d.Id == testLevelSpeciality.Test.Course.Level.DepartmentId);
            }
            
        }
    }
}