using System;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Loaders
{
    [AttributeUsage(AttributeTargets.Method)]
    public class LoadSemesterLevelSpeciality : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "semesterLevelSpeciality";
        public string LevelItemName { get; set; }
        public string SemesterDepartmentItemName { get; set; }
        public string ParameterName { get; set; } = "semesterLevelSpecialityId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            var repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<SemesterLevelSpeciality, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }

            SemesterLevelSpeciality semesterLevelSpeciality = repository.Set
                .Include(s => s.SemesterLevel)
                .ThenInclude(s => s.YearLevel)
                .ThenInclude(s => s.Level)
                .First(s => s.Id == long.Parse(id));

            context.HttpContext.Items[ItemName] = semesterLevelSpeciality;

            if (!string.IsNullOrWhiteSpace(LevelItemName))
            {
                context.HttpContext.Items[LevelItemName] = semesterLevelSpeciality.SemesterLevel.SemesterDepartment.YearDepartment.Department;
            }
        }
    }
}