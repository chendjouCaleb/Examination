﻿using System;
using System.IO;
using Exam.Controllers;
using Exam.Controllers.Identity;
using Exam.Controllers.Courses;
using Exam.Controllers.Periods;
using Exam.Destructors;
using Exam.Entities;
using Exam.Entities.Identity;
using Exam.Hubs;
using Exam.Persistence;
using Exam.Services.Emails;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using ServerApp.Hubs;
using UserController = Exam.Controllers.Identity.UserController;

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

            ServiceCollection.AddDbContext<IdentityDataContext>(options =>
            {
                options.EnableSensitiveDataLogging();
                options.UseInMemoryDatabase(Guid.NewGuid().ToString());
            });
            
            ServiceCollection.AddIdentity<User, IdentityRole>(options =>
                {
                    options.Password.RequireDigit = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireLowercase = false;
                })
                .AddEntityFrameworkStores<IdentityDataContext>();

            ServiceCollection.AddRepositories();

            ServiceCollection.AddLogging();

            ServiceCollection.AddTransient<UserController>();
            ServiceCollection.AddTransient<UserCodeController>();

            ServiceCollection.AddTransient<SchoolController>();
            ServiceCollection.AddTransient<DepartmentController>();
            ServiceCollection.AddTransient<SpecialityController>();
            ServiceCollection.AddTransient<LevelController>();
            ServiceCollection.AddTransient<LevelSpecialityController>();
            ServiceCollection.AddTransient<ScoreController>();
            
            ServiceCollection.AddTransient<CourseController>();
            ServiceCollection.AddTransient<CourseTeacherController>();
            ServiceCollection.AddTransient<CourseHourController>();
            ServiceCollection.AddTransient<CourseSessionController>();
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
            ServiceCollection.AddTransient<TeacherController>();
            
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
            ServiceCollection.AddTransient<YearController>();
            ServiceCollection.AddTransient<YearStudentController>();
            ServiceCollection.AddTransient<YearTeacherController>();
            ServiceCollection.AddTransient<SemesterController>();
            ServiceCollection.AddTransient<SemesterStudentController>();
            
            ServiceCollection.AddTransient<SemesterCourseController>();
            ServiceCollection.AddTransient<SemesterTeacherController>();
            ServiceCollection.AddTransient<SemesterStudentController>();
            ServiceCollection.AddTransient<SemesterCourseTeacherController>();
            ServiceCollection.AddTransient<SemesterCourseLevelSpecialityController>();

            ServiceCollection.AddTransient<SchoolDestructor>();

            ServiceCollection.AddTransient<IEmailSender, EmailSender>();
            
            IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.test.json")
                .Build();

            ServiceCollection.AddSingleton(configuration);

            var testHubMock = new Mock<IHubContext<TestHub, ITestHub>>();
            var testGroupHubMock = new Mock<IHubContext<TestGroupHub, ITestGroupHub>>();
            var schoolDestructorHubMock = new Mock<IHubContext<SchoolDestructorHub, ISchoolDestructorHub>>();
            
            ServiceCollection.AddSingleton(testHubMock.Object);
            ServiceCollection.AddSingleton(testGroupHubMock.Object);
            ServiceCollection.AddSingleton(schoolDestructorHubMock.Object);
            return ServiceCollection;
        }

        public static IServiceProvider BuildServiceProvider()
        {
            ServiceProvider = ServiceCollection.BuildServiceProvider();

            return ServiceProvider;
        }
    }
}