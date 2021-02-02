using System;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Exam.Entities;
using Exam.Infrastructure;

namespace Exam.Loaders
{
    [AttributeUsage(AttributeTargets.Method)]
    public class LoadExaminationLevelSpeciality : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "examinationLevelSpeciality";

        public string ParameterName { get; set; } = "examinationLevelSpecialityId";

        public string SchoolItemName { get; set; }

        public string ExaminationItemName { get; set; }

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<ExaminationLevelSpeciality, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<ExaminationLevelSpeciality, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }

            ExaminationLevelSpeciality examinationLevelSpeciality = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = examinationLevelSpeciality;

            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {
                IRepository<School, long> schoolRepository =
                    context.HttpContext.RequestServices.GetRequiredService<IRepository<School, long>>();

                context.HttpContext.Items[SchoolItemName] = schoolRepository.First(s =>
                    s.Id == examinationLevelSpeciality.ExaminationLevel.ExaminationDepartment.Department.SchoolId);
            }
            
            
            if (!string.IsNullOrWhiteSpace(ExaminationItemName))
            {
                IRepository<Examination, long> examinationRepository =
                    context.HttpContext.RequestServices.GetRequiredService<IRepository<Examination, long>>();

                context.HttpContext.Items[ExaminationItemName] = examinationRepository.First(e =>
                    e.Id == examinationLevelSpeciality.ExaminationLevel.ExaminationDepartment.ExaminationId);
            }
        }
    }
}