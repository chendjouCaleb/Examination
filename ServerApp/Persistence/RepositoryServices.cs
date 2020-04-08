using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Persistence
{
    public static class RepositoryServices
    {
        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddTransient<IRepository<Organisation, long>, Repository<Organisation, long>>();
            services.AddTransient<IRepository<Admin, long>, Repository<Admin, long>>();
            services.AddTransient<IRepository<Room, long>, Repository<Room, long>>();
            services.AddTransient<IRepository<Examination, long>, Repository<Examination, long>>();
            services.AddTransient<IRepository<Principal, long>, Repository<Principal, long>>();
            services.AddTransient<IRepository<PaperManager, long>, Repository<PaperManager, long>>();
            services.AddTransient<IRepository<Contest, long>, Repository<Contest, long>>();
            services.AddTransient<IRepository<Corrector, long>, Repository<Corrector, long>>();
            services.AddTransient<IRepository<Group, long>, Repository<Group, long>>();
            services.AddTransient<IRepository<Paper, long>, Repository<Paper, long>>();
            services.AddTransient<IRepository<PaperFile, long>, Repository<PaperFile, long>>();
            services.AddTransient<IRepository<ExaminationReview, long>, Repository<ExaminationReview, long>>();
            services.AddTransient<IRepository<PaperReview, long>, Repository<PaperReview, long>>();
            services.AddTransient<IRepository<TestReview, long>, Repository<TestReview, long>>();
            services.AddTransient<IRepository<Speciality, long>, Repository<Speciality, long>>();
            services.AddTransient<IRepository<Student, long>, Repository<Student, long>>();
            services.AddTransient<IRepository<Supervisor, long>, Repository<Supervisor, long>>();
            services.AddTransient<IRepository<TestSupervisor, long>, Repository<TestSupervisor, long>>();
            services.AddTransient<IRepository<Test, long>, Repository<Test, long>>();
            services.AddTransient<IRepository<Application, long>, Repository<Application, long>>();
        }
    }
}