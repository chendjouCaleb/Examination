using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Entities.Periods;
using Exam.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Persistence
{
    public static class RepositoryServices
    {
        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddTransient<IRepository<School, long>, SchoolRepository>();
            services.AddTransient<ISchoolRepository, SchoolRepository>();
            services.AddTransient<IRepository<Department, long>, Repository<Department, long>>();
            services.AddTransient<IRepository<Level, long>, Repository<Level, long>>();
            services.AddTransient<IRepository<Speciality, long>, SpecialityRepository>();
            services.AddTransient<ISpecialityRepository, SpecialityRepository>();
            services.AddTransient<IRepository<Room, long>, Repository<Room, long>>();
            services.AddTransient<IRepository<LevelSpeciality, long>, Repository<LevelSpeciality, long>>();
            
            services.AddTransient<IRepository<Score, long>, Repository<Score, long>>();
            services.AddTransient<IRepository<Course, long>, CourseRepository>();
            services.AddTransient<IRepository<CourseTeacher, long>, CourseTeacherRepository>();
            services.AddTransient<IRepository<CourseSession, long>, CourseSessionRepository>();
            services.AddTransient<ICourseRepository, CourseRepository>();
            services.AddTransient<IRepository<CourseHour, long>, Repository<CourseHour, long>>();

            services.AddTransient<IRepository<CourseLevelSpeciality, long>, CourseLevelSpecialityRepository>();
            services.AddTransient<ICourseLevelSpecialityRepository, CourseLevelSpecialityRepository>();
            
            services.AddTransient<IRepository<Examination, long>, ExaminationRepository>();
            services.AddTransient<IExaminationRepository, ExaminationRepository>();
            services.AddTransient<IRepository<ExaminationDepartment, long>, Repository<ExaminationDepartment, long>>();
            services.AddTransient<IRepository<ExaminationLevel, long>, Repository<ExaminationLevel, long>>();
            services.AddTransient<IRepository<ExaminationLevelSpeciality, long>, Repository<ExaminationLevelSpeciality, long>>();
            services.AddTransient<IRepository<ExaminationSpeciality, long>, Repository<ExaminationSpeciality, long>>();
            services.AddTransient<IRepository<ExaminationStudent, long>, Repository<ExaminationStudent, long>>();
            
            services.AddTransient<IRepository<Member, long>, MemberRepository>();
            services.AddTransient<IMemberRepository, MemberRepository>();
            services.AddTransient<IRepository<Principal, long>, PrincipalRepository>();
            
            services.AddTransient<IRepository<Corrector, long>, Repository<Corrector, long>>();
            services.AddTransient<IRepository<Student, long>, Repository<Student, long>>();
            services.AddTransient<IRepository<Supervisor, long>, Repository<Supervisor, long>>();
            services.AddTransient<IRepository<Secretary, long>, Repository<Secretary, long>>();
            services.AddTransient<IRepository<Planner, long>, Repository<Planner, long>>();
            services.AddTransient<IRepository<Teacher, long>, Repository<Teacher, long>>();
            services.AddTransient<IRepository<Application, long>, Repository<Application, long>>();
            
            services.AddTransient<IRepository<Contest, long>, Repository<Contest, long>>();
            
            services.AddTransient<IRepository<Test, long>, TestRepository>();
            services.AddTransient<ITestLevelSpecialityRepository, TestLevelSpecialityRepository>();
            services.AddTransient<IRepository<TestLevelSpeciality, long>, TestLevelSpecialityRepository>();
            
            services.AddTransient<IRepository<TestScore, long>, Repository<TestScore, long>>();
            services.AddTransient<ITestRepository, TestRepository>();
            services.AddTransient<IRepository<TestGroupSupervisor, long>, TestGroupSupervisorRepository>();
            services.AddTransient<IRepository<TestGroupSecretary, long>, TestGroupSecretaryRepository>();
            services.AddTransient<IRepository<TestGroupCorrector, long>, TestGroupCorrectorRepository>();
            
            services.AddTransient<ITestGroupSupervisorRepository, TestGroupSupervisorRepository>();
            services.AddTransient<ITestGroupSecretaryRepository, TestGroupSecretaryRepository>();
            services.AddTransient<ITestGroupCorrectorRepository, TestGroupCorrectorRepository>();
            
            services.AddTransient<IRepository<Paper, long>, Repository<Paper, long>>();
            services.AddTransient<IRepository<PaperFile, long>, Repository<PaperFile, long>>();
            services.AddTransient<IRepository<ScorePaper, long>, Repository<ScorePaper, long>>();
            services.AddTransient<IRepository<TestGroup, long>, TestGroupRepository>();
            services.AddTransient<ITestGroupRepository, TestGroupRepository>();

            services.AddTransient<IRepository<Year, long>, Repository<Year, long>>();
            services.AddTransient<IRepository<YearDepartment, long>, Repository<YearDepartment, long>>();
            services.AddTransient<IRepository<YearLevel, long>, Repository<YearLevel, long>>();
            services.AddTransient<IRepository<YearSpeciality, long>, Repository<YearSpeciality, long>>();   
            services.AddTransient<IRepository<YearLevelSpeciality, long>, Repository<YearLevelSpeciality, long>>();
            services.AddTransient<IRepository<YearTeacher, long>, Repository<YearTeacher, long>>();
            services.AddTransient<IRepository<YearStudent, long>, Repository<YearStudent, long>>();

            services.AddTransient<IRepository<Semester, long>, Repository<Semester, long>>();
            services.AddTransient<IRepository<SemesterDepartment, long>, Repository<SemesterDepartment, long>>();
            services.AddTransient<IRepository<SemesterLevel, long>, Repository<SemesterLevel, long>>();
            services.AddTransient<IRepository<SemesterSpeciality, long>, Repository<SemesterSpeciality, long>>();
            services.AddTransient<IRepository<SemesterLevelSpeciality, long>, Repository<SemesterLevelSpeciality, long>>();
            
            services.AddTransient<IRepository<SemesterTeacher, long>, Repository<SemesterTeacher, long>>();
            services.AddTransient<IRepository<SemesterStudent, long>, Repository<SemesterStudent, long>>();


            services.AddTransient<IRepository<SemesterCourse, long>, Repository<SemesterCourse, long>>();   
            services.AddTransient<IRepository<SemesterCourseLevelSpeciality, long>, Repository<SemesterCourseLevelSpeciality, long>>();   
            services.AddTransient<IRepository<SemesterCourseTeacher, long>, Repository<SemesterCourseTeacher, long>>();   
            services.AddTransient<IRepository<SemesterTeacher, long>, Repository<SemesterTeacher, long>>();   



        }
    }
}