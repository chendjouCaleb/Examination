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
    public class LoadMember : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "member";
        
        public string SchoolItemName { get; set; }
        
        public string ParameterName { get; set; } = "memberId";

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<Member, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Member, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            Member member = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = member;

            if (!string.IsNullOrWhiteSpace(SchoolItemName))
            {
                context.HttpContext.Items[SchoolItemName] = member.School;
            }
            
        }
    }
}