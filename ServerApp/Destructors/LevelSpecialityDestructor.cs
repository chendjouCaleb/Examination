using System.Linq;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Exam.Destructors
{
    public class LevelSpecialityDestructor
    {
        private DbContext _context;
        private ILogger<LevelSpecialityDestructor> _logger;


        public LevelSpecialityDestructor(DbContext context,
            ILogger<LevelSpecialityDestructor> logger)
        {
            _context = context;
            _logger = logger;
        }

        public void Destroy(LevelSpeciality levelSpeciality)
        {
            DestroyCourses(levelSpeciality);
            DestroyStudents(levelSpeciality);

            _context.Remove(levelSpeciality);
            _context.SaveChanges();
            
            Log(levelSpeciality, "Suppréssion du niveau terminée!");
        }

        

        private void DestroyStudents(LevelSpeciality levelSpeciality)
        {
            Log(levelSpeciality, "Début de la suppréssion des étudiants.");
            
            var students = _context.Set<Student>().Where(s => levelSpeciality.Equals(s.LevelSpeciality));

            foreach (var student in students)
            {
                student.LevelSpeciality = null;
                student.LevelSpecialityId = null;
            }
            _context.UpdateRange(students);
            
            Log(levelSpeciality, "Fin de la suppréssion des étudiants");
        }

        
        
        
        
        private void DestroyCourses(LevelSpeciality levelSpeciality)
        {
            Log(levelSpeciality, "Début de la suppréssion des cours.");
            
            var courses = _context.Set<CourseLevelSpeciality>()
                .Where(c => levelSpeciality.Equals(c.LevelSpeciality));
            _context.RemoveRange(courses);
            
            Log(levelSpeciality, "Fin de la suppréssion des cours.");
        }
        
        
        
        
        
        
        private void Log(LevelSpeciality school, string message)
        {
            _logger.LogInformation(message);
        }
    }
}