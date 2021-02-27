using System;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Loaders
{
    [AttributeUsage(AttributeTargets.Method)]
    public class LoadScore : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "score";
        public string CourseItemName { get; set; }
        public string LevelItemName { get; set; }
        public string DepartmentItemName { get; set; }

        public string ParameterName { get; set; } = "scoreId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<Score, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Score, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }

            Score score = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = score;

            if (!string.IsNullOrWhiteSpace(CourseItemName))
            {
                context.HttpContext.Items[CourseItemName] = score.Course;
            }

            if (!string.IsNullOrWhiteSpace(LevelItemName))
            { 
                IRepository<Level, long> levelRepository =
                    context.HttpContext.RequestServices.GetRequiredService<IRepository<Level, long>>();
                context.HttpContext.Items[LevelItemName] = levelRepository.First(d => d.Id == score.Course.LevelId);
            }

            if (!string.IsNullOrWhiteSpace(DepartmentItemName))
            {
                IRepository<Department, long> departmentRepository =
                    context.HttpContext.RequestServices.GetRequiredService<IRepository<Department, long>>();
                context.HttpContext.Items[DepartmentItemName] =
                    departmentRepository.First(d => d.Id == score.Course.Level.DepartmentId);
            }
        }
    }
}