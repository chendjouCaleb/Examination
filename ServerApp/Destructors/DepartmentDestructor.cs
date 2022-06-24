using System.Linq;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Exam.Destructors
{
    public class DepartmentDestructor
    {
        private DbContext _context;

        private ILogger<DepartmentDestructor> _logger;


        public DepartmentDestructor(DbContext context,
            ILogger<DepartmentDestructor> logger)
        {
            _context = context;
            _logger = logger;
        }

        public void Destroy(Department department)
        {
            DestroyApplications(department);

            DestroyCorrectors(department);
            DestroySupervisors(department);
            DestroySecretaries(department);
            DestroyPrincipals(department);
            UpdateRooms(department);
            
            DestroyCourseLevelSpecialities(department);
            UpdateCourses(department);
            DestroyLevelSpecialities(department);
            DestroySpecialities(department);
            DestroyLevels(department);

            _context.Remove(department);
            _context.SaveChanges();
            
            Log("Suppréssion de l'établissement terminée!");
        }

        private void DestroyApplications(Department department)
        {
            Log("Début de la suppréssion des demandes");

            var students = _context.Set<Application>()
                .Where(s => department.Equals(s.Level.Department));
            
            _context.RemoveRange(students);
            
            Log( "Fin de la suppréssion des demandes");
        }

        private void UpdateStudents(Department department)
        {
            Log("Début de la suppréssion des étudiants");

            var students = _context.Set<Student>().Where(s => department.Equals(s.Level.Department));

            foreach (Student student in students)
            {
                student.Department = null;
                student.DepartmentId = null;
                student.Level = null;
                student.LevelId = null;
            }
            
            _context.UpdateRange(students);
            
            Log( "Fin de la suppréssion des étudiants");
        }
        

        private void DestroyCorrectors(Department department)
        {
            Log("Suppréssion des correcteurs");

            var correctors = _context.Set<Corrector>().Where(s => department.Equals(s.Department));
            _context.RemoveRange(correctors);
            
        }


        private void DestroySupervisors(Department department)
        {
            Log("Suppréssion des superviseurs");

            var supervisors = _context.Set<Supervisor>().Where(s => department.Equals(s.Department));
            _context.RemoveRange(supervisors);
            
        }

        private void DestroySecretaries(Department department)
        {
            Log("Suppréssion des sécrétaires");

            var secretaries = _context.Set<Secretary>().Where(s => department.Equals(s.Department));
            _context.RemoveRange(secretaries);
             
        }

        private void DestroyPrincipals(Department department)
        {
            Log("Suppréssion des délégués");

            var principals = _context.Set<Principal>().Where(s => department.Equals(s.Department));
            _context.RemoveRange(principals);
            
        }


        private void UpdateRooms(Department department)
        {
            Log("Début de la suppréssion des salles");

            var rooms = _context.Set<Room>().Where(s => department.Equals(s.Department));
            _context.RemoveRange(rooms);
            
            Log("Fin de la suppréssion des salles");
        }
        

        private void DestroyCourseLevelSpecialities(Department department)
        {
            Log("Suppréssion des cours de spécialité");

            var courseLevelSpecialitys = _context.Set<CourseLevelSpeciality>()
                .Where(s => department.Equals(s.Course.Level.Department));
            _context.RemoveRange(courseLevelSpecialitys);
            
        }
        
        private void UpdateCourses(Department department)
        {
            Log("Début de la suppréssion des cours");

            var courses = _context.Set<Course>().Where(s => department.Equals(s.Level.Department));
            foreach (Course course in courses)
            {
                course.Level = null;
                course.LevelId = null;
                course.Department = null;
                course.DepartmentId = null;
            }
            
            
            _context.UpdateRange(courses);
            
            Log("Fin de la suppréssion des cours");
        }
        
        private void DestroyLevelSpecialities(Department department)
        {
            Log("Suppréssion des niveaux de spécialité");

            var levelSpecialitys = _context.Set<LevelSpeciality>()
                .Where(s => department.Equals(s.Level.Department));
            _context.RemoveRange(levelSpecialitys);
            
        }
        
        private void DestroySpecialities(Department department)
        {
            Log( "Suppréssion des spécialités");

            var specialities = _context.Set<Speciality>().Where(s => department.Equals(s.Department));
            _context.RemoveRange(specialities);
            
        }
        
        private void DestroyLevels(Department department)
        {
            Log( "Début de la suppréssion des niveaux");

            var levels = _context.Set<Level>().Where(s => department.Equals(s.Department));
            _context.RemoveRange(levels);
            
        }
        
        
        private void Log(string message)
        {
            _logger.LogInformation(message);
        }
    }
}