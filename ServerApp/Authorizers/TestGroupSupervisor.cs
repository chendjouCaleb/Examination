using System;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Authorizers
{
    public class AuthorizeTestGroupSupervisor: ActionFilterAttribute
    {
        public string TestGroupItemName { get; set; } = "testGroup";

        public string ItemName { get; set; } = "testGroupSupervisor";
        public bool Principal { get; set; } = false;
        
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            IRepository<TestGroupSupervisor, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<TestGroupSupervisor, long>>();
            
            Authorization authorization = 
                context.HttpContext.Items["Authorization"] as Authorization;

            TestGroup testGroup = context.HttpContext.GetItem(TestGroupItemName) as TestGroup;

            if (authorization == null)
            {
                throw new ArgumentNullException(nameof(authorization));
            }

            if (testGroup == null)
            {
                throw new UnauthorizedException("{authorization.constraints.requireTestGroupSupervisor}");
            }

            TestGroupSupervisor supervisor = repository
                .First(p => testGroup.Equals(p.TestGroup) && p.Supervisor.UserId == authorization.UserId);
            
            if (supervisor == null)
            {
                throw new UnauthorizedException("{authorization.constraints.requireTestGroupSupervisor}");
            }

            if (Principal && !supervisor.IsPrincipal)
            {
                throw new UnauthorizedException("{authorization.constraints.requirePrincipalTestGroupSupervisor}");
            }

            if (context.ActionArguments.ContainsKey(ItemName))
            {
                context.ActionArguments[ItemName] = supervisor;
            }
        }
    }
}