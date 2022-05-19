using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Exam.Identity
{
    public class LoggedUserModelBinder: IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            string userId = bindingContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            
            if(!string.IsNullOrWhiteSpace(userId))
            {
                bindingContext.Result = ModelBindingResult.Success(new LoggedUser {UserId = userId});
            }
            else
            {
                bindingContext.Result = ModelBindingResult.Success(null);
            }

            return Task.CompletedTask;
        }
    }
}