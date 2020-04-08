using Exam.Entities;
using Microsoft.EntityFrameworkCore;

namespace Exam.Persistence
{
    public class PersistenceContext:DbContext
    {
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Organisation> Organisations { get; set; }
        public DbSet<Examination> Examinations { get; set; }
        public DbSet<Principal> Principals { get; set; }
        public DbSet<PaperManager> PaperManagers { get; set; }
        public DbSet<Corrector> Correctors { get; set; }
        public DbSet<Contest> Contests { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Paper> Papers { get; set; }
        public DbSet<PaperFile> PaperFiles { get; set; }
        public DbSet<ExaminationReview> ExaminationReviews { get; set; }
        public DbSet<TestReview> TestReviews { get; set; }
        public DbSet<PaperReview> PaperReviews { get; set; }
        public DbSet<Speciality> Specialities { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Supervisor> Supervisors { get; set; }
        public DbSet<TestSupervisor> TestSupervisors { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<Application> Applications { get; set; }
        
        public PersistenceContext(DbContextOptions<PersistenceContext> options):base(options)
        {

        }

        public PersistenceContext()
        {

        }
    }
}