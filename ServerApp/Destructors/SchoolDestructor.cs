using System.Linq;
using Exam.Entities;
using Exam.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Exam.Destructors
{
    public class SchoolDestructor
    {
        private DbContext _context;

        private IHubContext<SchoolDestructorHub, ISchoolDestructorHub> _hub;
        private ILogger<SchoolDestructor> _logger;


        public SchoolDestructor(DbContext context,
            IHubContext<SchoolDestructorHub, ISchoolDestructorHub> hub,
            ILogger<SchoolDestructor> logger)
        {
            _hub = hub;
            _context = context;
            _logger = logger;
        }

        public void Destruct(School school)
        {
            DestroyApplications(school);
            DestroyStudents(school);

            DestroyCorrectors(school);
            DestroySupervisors(school);
            DestroySecretaries(school);
            DestroyPrincipals(school);
            DestroyPlanners(school);

            DestroyMembers(school);
            DestroyRooms(school);
            
            DestroyScores(school);
            DestroyCourseLevelSpecialities(school);
            DestroyCourses(school);
            DestroyLevelSpecialities(school);
            DestroySpecialities(school);
            DestroyLevels(school);
            DestroyDepartments(school);

            _context.Remove(school);
            _context.SaveChanges();
            
            Log(school, "Suppréssion de l'établissement terminée!");
        }

        private void DestroyApplications(School school)
        {
            Log(school, "Début de la suppréssion des demandes");

            var students = _context.Set<Application>().Where(s => school.Equals(s.Level.Department.School));
            _context.RemoveRange(students);
            
            Log(school, "Fin de la suppréssion des demandes");
        }

        private void DestroyStudents(School school)
        {
            Log(school, "Début de la suppréssion des étudiants");

            var students = _context.Set<Student>().Where(s => school.Equals(s.Level.Department.School));
            _context.RemoveRange(students);
            
            Log(school, "Fin de la suppréssion des étudiants");
        }

        private void DestroyPlanners(School school)
        {
            Log(school, "Suppréssion des planificateurs");

            var planners = _context.Set<Planner>().Where(s => school.Equals(s.School));
            _context.RemoveRange(planners);
            
        }

        private void DestroyCorrectors(School school)
        {
            Log(school, "Suppréssion des correcteurs");

            var correctors = _context.Set<Corrector>().Where(s => school.Equals(s.Department.School));
            _context.RemoveRange(correctors);
            
        }


        private void DestroySupervisors(School school)
        {
            Log(school, "Suppréssion des superviseurs");

            var supervisors = _context.Set<Supervisor>().Where(s => school.Equals(s.Department.School));
            _context.RemoveRange(supervisors);
            
        }

        private void DestroySecretaries(School school)
        {
            Log(school, "Suppréssion des sécrétaires");

            var secretaries = _context.Set<Secretary>().Where(s => school.Equals(s.Department.School));
            _context.RemoveRange(secretaries);
             
        }

        private void DestroyPrincipals(School school)
        {
            Log(school, "Suppréssion des délégués");

            var principals = _context.Set<Principal>().Where(s => school.Equals(s.Department.School));
            _context.RemoveRange(principals);
            
        }

        private void DestroyMembers(School school)
        {
            Log(school, "Début de la suppréssion des members");

            var members = _context.Set<Member>().Where(s => school.Equals(s.School));
            _context.RemoveRange(members);
            
            Log(school, "Fin de la suppréssion des membres");
        }

        private void DestroyRooms(School school)
        {
            Log(school, "Début de la suppréssion des salles");

            var rooms = _context.Set<Room>().Where(s => school.Equals(s.School));
            _context.RemoveRange(rooms);
            
            Log(school, "Fin de la suppréssion des salles");
        }
        
        private void DestroyScores(School school)
        {
            Log(school, "Début de la suppréssion des barèmes");

            var scores = _context.Set<Score>().Where(s => school.Equals(s.Course.Level.Department.School));
            _context.RemoveRange(scores);
            
            Log(school, "Fin de la suppréssion des barèmes");
        }

        private void DestroyCourseLevelSpecialities(School school)
        {
            Log(school, "Suppréssion des cours de spécialité");

            var courseLevelSpecialitys = _context.Set<CourseLevelSpeciality>()
                .Where(s => school.Equals(s.Course.Level.Department.School));
            _context.RemoveRange(courseLevelSpecialitys);
            
        }
        
        private void DestroyCourses(School school)
        {
            Log(school, "Début de la suppréssion des cours");

            var courses = _context.Set<Course>().Where(s => school.Equals(s.Level.Department.School));
            _context.RemoveRange(courses);
            
            Log(school, "Fin de la suppréssion des cours");
        }
        
        private void DestroyLevelSpecialities(School school)
        {
            Log(school, "Suppréssion des niveaux de spécialité");

            var levelSpecialitys = _context.Set<LevelSpeciality>()
                .Where(s => school.Equals(s.Level.Department.School));
            _context.RemoveRange(levelSpecialitys);
            
        }
        
        private void DestroySpecialities(School school)
        {
            Log(school, "Suppréssion des spécialités");

            var specialitys = _context.Set<Speciality>().Where(s => school.Equals(s.Department.School));
            _context.RemoveRange(specialitys);
            
        }
        
        private void DestroyLevels(School school)
        {
            Log(school, "Début de la suppréssion des niveaux");

            var levels = _context.Set<Level>().Where(s => school.Equals(s.Department.School));
            _context.RemoveRange(levels);
            
        }
        
        private void DestroyDepartments(School school)
        {
            Log(school, "Suppréssion des départment");

            var departments = _context.Set<Department>().Where(s => school.Equals(s.School));
            _context.RemoveRange(departments);
            
        }
        
        private void Log(School school, string message)
        {
            _logger.LogInformation(message);
            _hub.Clients.All.Log(school, message);
        }
    }
}