using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Everest.AspNetStartup.ExceptionTransformers;
using Exam.Infrastructure;
using Exam.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ServerApp.Hubs;

namespace ServerApp
{
    public class Startup
    {
        private IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvc(options => { })
                .AddControllersAsServices()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.DateFormatString = "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'";
                });

            services.AddDbContext<DbContext, PersistenceContext>(options =>
            {
                options.UseLazyLoadingProxies();
                options.EnableSensitiveDataLogging();
                options.UseSqlServer(_configuration["Data:ConnectionStrings:Database"]);
            });

            services.AddExceptionTransformerFactory();
            services.AddScoped<ExceptionTransformerAttribute>();


            services.AddRepositories();
            services.AddSession();
            services.AddLogging();
            services.AddSignalR()
                .AddNewtonsoftJsonProtocol();
            services.AddCors(options =>
            {
                options.AddPolicy("corsPolicy", policy =>
                {
                    policy.WithOrigins("http://localhost:9200", "http://localhost:9000", "http://localhost:9100");
                    //policy.AllowAnyOrigin();
                    policy.AllowAnyHeader();
                    policy.AllowAnyMethod();
                    policy.AllowCredentials();
                    policy.Build();
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseExceptionTransformer();
            app.UseCors("corsPolicy");

            app.ParseAuthorization();

            app.UseRouting();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<StudentHub>("/hubs/students");
                endpoints.MapDefaultControllerRoute();
            });

            app.UseSpa(spa =>
            {
                string strategy = _configuration.GetValue<string>("DevTools:ConnectionStrategy");

                if (strategy == "proxy")
                {
                    spa.UseProxyToSpaDevelopmentServer("http://127.0.0.1:9200");
                }
                else if (strategy == "managed")
                {
                    spa.Options.SourcePath = "../ClientApp";
                    spa.UseAngularCliServer("start");
                }
            });
        }
    }
}