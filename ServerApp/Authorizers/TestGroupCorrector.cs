﻿using System;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Authorizers
{
    public class AuthorizeTestGroupCorrector: ActionFilterAttribute
    {
        public string TestGroupItemName { get; set; } = "testGroup";
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            IRepository<TestGroupCorrector, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<TestGroupCorrector, long>>();
            
            Authorization authorization = 
                context.HttpContext.Items["Authorization"] as Authorization;

            TestGroup testGroup = context.HttpContext.GetItem(TestGroupItemName) as TestGroup;

            if (authorization == null)
            {
                throw new ArgumentNullException(nameof(authorization));
            }

            if (testGroup == null)
            {
                throw new ArgumentNullException(nameof(testGroup));
            }

            if (!repository.Exists(p => testGroup.Equals(p.TestGroup) && p.Corrector.UserId == authorization.UserId))
            {
                throw new UnauthorizedException("{authorization.constraints.requireTestGroupCorrector}");
            }
        }
    }
}