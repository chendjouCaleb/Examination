using System;
using Everest.AspNetStartup.Infrastructure;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Exam.Filters
{
    public class IsNotFinished : ActionFilterAttribute
    {
        public string ItemName { get; set; }  
        public string ErrorMessage { get; set; } 
        
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            Assert.RequireNonNull(ItemName, nameof(ItemName));
            if (string.IsNullOrWhiteSpace(ErrorMessage))
            {
                ErrorMessage = $"{{{ItemName}.requireNoState.finished}}";
            }

            IPeriod period = context.HttpContext.GetItem<IPeriod>(ItemName);

            if (period == null)
            {
                throw new ArgumentNullException($"Il n'existe pas de periode avec la clé {ItemName} dans les attributs de requêtes");
            }
            
            ErrorMessage = ErrorMessage ?? $"{ItemName}.constraints.noState.finished";
            
            if(String.Equals(period.GetState(), "FINISHED", StringComparison.CurrentCultureIgnoreCase))
            {
                throw new InvalidStateException(ErrorMessage);
            }
        }
        
    }
}