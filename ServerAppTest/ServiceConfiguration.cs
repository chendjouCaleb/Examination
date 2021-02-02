using System;
using Exam.Controllers;
using Exam.Entities;
using Exam.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using ServerApp.Hubs;

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
                options.EnableSensitiveDataLogging();
                options.UseInMemoryDatabase(Guid.NewGuid().ToString());
            });

            ServiceCollection.AddRepositories();

            ServiceCollection.AddLogging();

            ServiceCollection.AddTransient<SchoolController>();
            ServiceCollection.AddTransient<DepartmentController>();
            ServiceCollection.AddTransient<SpecialityController>();
            ServiceCollection.AddTransient<LevelController>();
            ServiceCollection.AddTransient<LevelSpecialityController>();
            ServiceCollection.AddTransient<ScoreController>();
            ServiceCollection.AddTransient<CourseController>();
            ServiceCollection.AddTransient<CourseLevelSpecialityController>();
            ServiceCollection.AddTransient<RoomController>();
            
            
            ServiceCollection.AddTransient<ExaminationController>();
            ServiceCollection.AddTransient<ExaminationDepartmentController>();
            ServiceCollection.AddTransient<ExaminationLevelController>();
            ServiceCollection.AddTransient<ExaminationLevelSpecialityController>();
            ServiceCollection.AddTransient<ExaminationSpecialityController>();
            ServiceCollection.AddTransient<ExaminationStudentController>();
            
            ServiceCollection.AddTransient<MemberController>();
            ServiceCollection.AddTransient<PlannerController>();
            ServiceCollection.AddTransient<PrincipalController>();
            
            ServiceCollection.AddTransient<CorrectorController>();
            ServiceCollection.AddTransient<SupervisorController>();
            ServiceCollection.AddTransient<SecretaryController>();
            ServiceCollection.AddTransient<StudentController>();
            
            ServiceCollection.AddTransient<ApplicationController>();
            
            
            ServiceCollection.AddTransient<TestController>();
            ServiceCollection.AddTransient<TestLevelSpecialityController>();
            ServiceCollection.AddTransient<TestScoreController>();
            ServiceCollection.AddTransient<TestLevelSpeciality>();
            ServiceCollection.AddTransient<TestGroupSupervisorController>();
            ServiceCollection.AddTransient<TestGroupSecretaryController>();
            ServiceCollection.AddTransient<TestGroupCorrectorController>();
            ServiceCollection.AddTransient<TestGroupController>();
            
            
            ServiceCollection.AddTransient<ScorePaperController>();
            ServiceCollection.AddTransient<PaperController>();
            ServiceCollection.AddTransient<GroupPaperController>();
            
            IConfiguration configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            ServiceCollection.AddSingleton(configuration);

            var testHubMock = new Mock<IHubContext<TestHub, ITestHub>>();
            var testGroupHubMock = new Mock<IHubContext<TestGroupHub, ITestGroupHub>>();
            
            ServiceCollection.AddSingleton(testHubMock.Object);
            ServiceCollection.AddSingleton(testGroupHubMock.Object);
            return ServiceCollection;
        }

        public static IServiceProvider BuildServiceProvider()
        {
            ServiceProvider = ServiceCollection.BuildServiceProvider();

            return ServiceProvider;
        }
    }
}