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
    public class LoadRoom : Attribute, IResourceFilter
    {
        public string ItemName { get; set; } = "room";

        public string ParameterName { get; set; } = "roomId";

        public string OrganisationItemName { get; set; }

        public ParameterSource Source { get; set; } = ParameterSource.Route;

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            Assert.RequireNonNull(context, nameof(context));
            IRepository<Room, long> repository =
                context.HttpContext.RequestServices.GetRequiredService<IRepository<Room, long>>();
            string id = context.GetParameter(ParameterName, Source);
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            Room room = repository.Find(long.Parse(id));

            context.HttpContext.Items[ItemName] = room;

            if (!string.IsNullOrWhiteSpace(OrganisationItemName))
            {
                context.HttpContext.Items[OrganisationItemName] = room.Organisation;
            }
        }
    }
}