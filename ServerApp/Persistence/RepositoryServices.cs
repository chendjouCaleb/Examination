using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Persistence
{
    public static class RepositoryServices
    {
        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddTransient<IRepository<Organisation, long>, OrganisationRepository>();
            services.AddTransient<IOrganisationRepository, OrganisationRepository>();
            services.AddTransient<IRepository<Admin, long>, Repository<Admin, long>>();
            services.AddTransient<IRepository<Room, long>, Repository<Room, long>>();
            services.AddTransient<IRepository<Examination, long>, ExaminationRepository>();
            services.AddTransient<IExaminationRepository, ExaminationRepository>();
            services.AddTransient<IRepository<Principal, long>, PrincipalRepository>();
            services.AddTransient<IRepository<Contest, long>, Repository<Contest, long>>();
            services.AddTransient<IRepository<Corrector, long>, Repository<Corrector, long>>();
            
            services.AddTransient<IRepository<Group, long>, GroupRepository>();
            services.AddTransient<IGroupRepository,GroupRepository>();
            
            services.AddTransient<IRepository<Paper, long>, Repository<Paper, long>>();
            services.AddTransient<IRepository<PaperFile, long>, Repository<PaperFile, long>>();
            services.AddTransient<IRepository<ExaminationReview, long>, Repository<ExaminationReview, long>>();
            services.AddTransient<IRepository<PaperReview, long>, Repository<PaperReview, long>>();
            services.AddTransient<IRepository<TestReview, long>, Repository<TestReview, long>>();
            
            services.AddTransient<IRepository<Speciality, long>, SpecialityRepository>();
            services.AddTransient<ISpecialityRepository, SpecialityRepository>();
            
            services.AddTransient<IRepository<Student, long>, Repository<Student, long>>();
            services.AddTransient<IRepository<Supervisor, long>, Repository<Supervisor, long>>();
            services.AddTransient<IRepository<TestGroupSupervisor, long>, Repository<TestGroupSupervisor, long>>();
            services.AddTransient<IRepository<TestGroupSecretary, long>, Repository<TestGroupSecretary, long>>();
            services.AddTransient<IRepository<TestGroupCorrector, long>, Repository<TestGroupCorrector, long>>();
            
            services.AddTransient<IRepository<Test, long>, TestRepository>();
            services.AddTransient<ITestRepository, TestRepository>();
            
            services.AddTransient<IRepository<Score, long>, Repository<Score, long>>();
            services.AddTransient<IRepository<ScorePaper, long>, Repository<ScorePaper, long>>();
            
            services.AddTransient<IRepository<TestGroup, long>, TestGroupRepository>();
            services.AddTransient<ITestGroupRepository, TestGroupRepository>();
            
            services.AddTransient<IRepository<Application, long>, Repository<Application, long>>();
            services.AddTransient<IRepository<Secretary, long>, Repository<Secretary, long>>();
        }
    }
}