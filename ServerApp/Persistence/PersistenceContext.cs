using Exam.Entities;
using Microsoft.EntityFrameworkCore;

namespace Exam.Persistence
{
    public class PersistenceContext:DbContext
    {
        public DbSet<Department> Departments { get; set; }
        public DbSet<School> Schools { get; set; }
        public DbSet<Level> Levels { get; set; }
        public DbSet<Speciality> Specialities { get; set; }
        public DbSet<LevelSpeciality> LevelSpecialities { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseLevelSpeciality> CourseLevelSpecialities { get; set; }
        public DbSet<Score> Scores { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Application> Applications { get; set; }
        
        public DbSet<Member> Members { get; set; }
        public DbSet<Principal> Principals { get; set; }
        public DbSet<Corrector> Correctors { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Supervisor> Supervisors { get; set; }
        public DbSet<Secretary> Secretaries { get; set; }
        public DbSet<Planner> Planners { get; set; }
        
        public DbSet<Examination> Examinations { get; set; }
        public DbSet<ExaminationStudent> ExaminationStudents { get; set; }
        public DbSet<ExaminationDepartment> ExaminationDepartments { get; set; }
        public DbSet<ExaminationLevel> ExaminationLevels { get; set; }
        public DbSet<ExaminationSpeciality> ExaminationSpecialities { get; set; }
        public DbSet<ExaminationLevelSpeciality> ExaminationLevelSpecialities{ get; set; }
        
        public DbSet<Contest> Contests { get; set; }
        public DbSet<TestGroup> TestGroups { get; set; }
        public DbSet<Paper> Papers { get; set; }
        public DbSet<PaperFile> PaperFiles { get; set; }
        
        
        public DbSet<TestGroupSupervisor> TestGroupSupervisors { get; set; }
        public DbSet<TestGroupCorrector> TestGroupCorrectors { get; set; }
        public DbSet<TestGroupSecretary> TestGroupSecretaries { get; set; }
        
        public DbSet<Test> Tests { get; set; }
        public DbSet<TestLevelSpeciality> TestLevelSpecialities { get; set; }
        public DbSet<TestScore> TestScores { get; set; }
        public DbSet<ScorePaper> ScorePapers{ get; set; }
        
        public PersistenceContext(DbContextOptions<PersistenceContext> options):base(options)
        { }

        public PersistenceContext()
        { }
        
    }
}