﻿using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Exam.Infrastructure
{
    [ModelBinder(BinderType = typeof(AuthorizationModelBinder))]
    public class Authorization
    {
        public User User { get; set; }
        public string UserId { get; set; }
    }

    [ModelBinder(BinderType = typeof(UserModelBinder))]
    public class User
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
    }
    
    public class AuthorizationModelBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            Authorization auth = bindingContext.HttpContext.Items["Authorization"] as Authorization;

            if(auth == null)
            {
                throw new InvalidOperationException("There are no authorization attribute in http context items");
            }

            bindingContext.Result = ModelBindingResult.Success(auth);
            return Task.CompletedTask;
        }
    }
    
    
    public class UserModelBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            Authorization auth = bindingContext.HttpContext.Items["Authorization"] as Authorization;

            if(auth?.User != null)
            {
                bindingContext.Result = ModelBindingResult.Success(auth.User);
            }
            else
            {
                bindingContext.Result = ModelBindingResult.Success(null);
            }

            return Task.CompletedTask;
        }
    }
}