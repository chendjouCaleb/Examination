using System;
using Exam.Controllers;
using Exam.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ServerAppTest
{
    public class ServiceConfiguration
    {
        public static IServiceProvider ServiceProvider { get; set; }
        public static IServiceCollection ServiceCollection { get; set; }

        public static IServiceCollection InitServiceCollection()
        {
            ServiceCollection = new ServiceCollection();

            ServiceCollection.AddDbContext<DbContext, PersistenceContext>(options => {
                options.UseLazyLoadingProxies();
                options.UseInMemoryDatabase(Guid.NewGuid().ToString());
            });

            ServiceCollection.AddRepositories();

            ServiceCollection.AddLogging();

            ServiceCollection.AddTransient<ExaminationController>();
            ServiceCollection.AddTransient<SpecialityController>();
            ServiceCollection.AddTransient<CorrectorController>();
            ServiceCollection.AddTransient<SupervisorController>();

            IConfiguration configuration = new ConfigurationBuilder()

                .AddJsonFile("appsettings.json")

                .Build();

            ServiceCollection.AddSingleton<IConfiguration>(configuration);


            return ServiceCollection;
        }

        public static IServiceProvider BuildServiceProvider()
        {
            ServiceProvider = ServiceCollection.BuildServiceProvider();

            return ServiceProvider;
        }
    }
}