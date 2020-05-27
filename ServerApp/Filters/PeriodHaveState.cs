﻿using System;
using Everest.AspNetStartup.Infrastructure;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Exam.Filters
{
    public class PeriodHaveState : ActionFilterAttribute
    {
        public string ItemName { get; set; }  
        public string State { get; set; }
        public string ErrorMessage { get; set; } 

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            Assert.RequireNonNull(ItemName,  nameof(ItemName));
            Assert.RequireNonNull(ErrorMessage,  nameof(ErrorMessage));
            Assert.RequireNonNull(State,  nameof(State));

            IPeriod period = context.HttpContext.GetItem<IPeriod>(ItemName);

            if (period == null)
            {
                throw new ArgumentNullException($"Il n'existe pas de periode avec la clé {ItemName} dans les attributs de requêtes");
            }

            ErrorMessage = ErrorMessage ?? $"{ItemName}.constraints.state.{State}";
            
            if(period.GetState() != State )
            {
                throw new InvalidStateException(ErrorMessage);
            }
        }
        
    }
}