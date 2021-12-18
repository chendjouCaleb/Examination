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
    public class LoadExaminationDepartment : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "examinationDepartment";

        public string ParameterName { get; set; } = "examinationDepartmentId";

        public string SchoolItemName { get; set; }
        
        public string DepartmentItemName { get; set; }

        public string ExaminationItemName { get; set; }

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<ExaminationDepartment, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<ExaminationDepartment, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }

            ExaminationDepartment examinationDepartment = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = examinationDepartment;

            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {
                IRepository<School, long> schoolRepository =
                    context.HttpContext.RequestServices.GetRequiredService<IRepository<School, long>>();

                context.HttpContext.Items[SchoolItemName] = schoolRepository.First(s =>
                    s.Id == examinationDepartment.SemesterDepartment.YearDepartment.Department.SchoolId);
            }
            
            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                IRepository<Department, long> departmentRepository =
                    context.HttpContext.RequestServices.GetRequiredService<IRepository<Department, long>>();

                context.HttpContext.Items[DepartmentItemName] = departmentRepository.First(s =>
                    s.Id == examinationDepartment.SemesterDepartment.YearDepartment.DepartmentId);
            }
            
            if (!string.IsNullOrWhiteSpace(ExaminationItemName))
            {
                IRepository<Examination, long> examinationRepository =
                    context.HttpContext.RequestServices.GetRequiredService<IRepository<Examination, long>>();

                context.HttpContext.Items[ExaminationItemName] = examinationRepository.First(e =>
                    e.Id == examinationDepartment.ExaminationId);
            }
        }
    }
}