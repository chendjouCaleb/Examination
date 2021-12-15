using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Everest.AspNetStartup.ExceptionTransformers;
using Exam.Destructors;
using Exam.Hubs;
using Exam.Infrastructure;
using Exam.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
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
            Console.WriteLine("Auth url: " + _configuration["Authorization:Url"]);
            services
                .AddMvc(options => { })
                .AddControllersAsServices()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.DateFormatString = "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'";
                });
            
                services.AddSingleton<IFileProvider>(new PhysicalFileProvider(Directory.GetCurrentDirectory()));
            services.AddDbContext<DbContext, PersistenceContext>(options =>
            {
                options.UseLazyLoadingProxies();
                options.EnableSensitiveDataLogging();
                options.UseSqlite(_configuration["Data:SQLiteConnectionStrings"]);
                //options.UseSqlServer(_configuration["Data:ConnectionStrings:Database"]);
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
                    //policy.WithOrigins("http://localhost:9200", "http://localhost:9000", "http://localhost:9100");
                    policy.AllowAnyOrigin();
                    policy.AllowAnyHeader();
                    policy.AllowAnyMethod();
                    //policy.AllowCredentials();
                    policy.Build();
                });
            });

            services.AddTransient<SchoolDestructor>();
            
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseExceptionTransformer();
            app.UseCors("corsPolicy");

            app.UseStaticFiles();
            
            if (env.IsProduction())
            {
                app.UseStaticFiles(new StaticFileOptions
                {
                    RequestPath = "",
                    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "./wwwroot/app"))
                });
            }

            app.ParseAuthorization();

            app.UseRouting();
            
            


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<StudentHub>("/hubs/students");
                endpoints.MapHub<TestHub>("hubs/tests");
                endpoints.MapHub<TestGroupHub>("hubs/testGroups");
                endpoints.MapHub<SchoolDestructorHub>("hubs/schoolDestructor");
                endpoints.MapHub<ExaminationBuilderHub>("hubs/examinationBuilder");
                endpoints.MapDefaultControllerRoute();
                if (!env.IsDevelopment())
                {
                    endpoints.MapFallbackToController("Index", "Home");
                }
            });

            if (env.IsDevelopment())
            {
                app.UseSpa(spa =>
                {
                    spa.UseProxyToSpaDevelopmentServer("http://127.0.0.1:9200");
                });
            }
            
        }
    }
}