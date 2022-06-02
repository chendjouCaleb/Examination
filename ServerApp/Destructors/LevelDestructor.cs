using System.Linq;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Exam.Destructors
{
    public class LevelDestructor
    {
        private DbContext _context;
        private ILogger<LevelDestructor> _logger;


        public LevelDestructor(DbContext context,
            ILogger<LevelDestructor> logger)
        {
            _context = context;
            _logger = logger;
        }

        public void Destroy(Level level)
        {
            UpdateCourses(level);
            DestroyCourseLevelSpecialities(level);
            DestroyLevelSpecialities(level);
            UpdateRooms(level);
            UpdateStudents(level);

            _context.Remove(level);
            _context.SaveChanges();
            
            Log(level, "Suppréssion du niveau terminée!");
        }

        

        private void UpdateStudents(Level level)
        {
            Log(level, "Début de la suppréssion des étudiants.");
            
            var students = _context.Set<Student>().Where(s => level.Equals(s.Level));
            foreach (Student student in students)
            {
                student.Level = null;
                student.LevelId = null;
            }
            _context.UpdateRange(students);
            
            Log(level, "Fin de la suppréssion des étudiants");
        }

        private void UpdateRooms(Level level)
        {
            Log(level, "Début de la suppréssion des salles.");

            var rooms = _context.Set<Room>().Where(r => level.Equals(r.Level));
            foreach (Room room in rooms)
            {
                room.Level = null;
                room.LevelId = null;
            }
            _context.UpdateRange(rooms);
            
            Log(level, "Fin de la suppréssion des salles");
        }
        
        
        
        private void UpdateCourses(Level level)
        {
            Log(level, "Début de la suppréssion des cours.");
            
            var courses = _context.Set<Course>().Where(c => level.Equals(c.Level));

            foreach (Course course in courses)
            {
                course.Level = null;
                course.LevelId = null;
            }
            _context.UpdateRange(courses);
            
            Log(level, "Fin de la suppréssion des cours.");
        }
        
        
        private void DestroyCourseLevelSpecialities(Level level)
        {
            Log(level, "Début de la suppréssion des cours par niveau.");
            
            var courseLevelSpecialities = _context.Set<CourseLevelSpeciality>()
                .Where(c => level.Equals(c.LevelSpeciality.Level));
            
            _context.UpdateRange(courseLevelSpecialities);
            
            Log(level, "Fin de la suppréssion des cours par niveau.");
        }
        
        
        private void DestroyLevelSpecialities(Level level)
        {
            Log(level, "Suppréssion des spécialités du niveau.");

            var specialities = _context.Set<LevelSpeciality>().Where(l => level.Equals(l.Level));
            _context.RemoveRange(specialities);
            
        }
        
        
        private void Log(Level school, string message)
        {
            _logger.LogInformation(message);
        }
    }
}