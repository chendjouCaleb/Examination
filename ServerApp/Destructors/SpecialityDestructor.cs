using System.Linq;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Exam.Destructors
{
    public class SpecialityDestructor
    {
        private DbContext _context;
        private ILogger<SpecialityDestructor> _logger;


        public SpecialityDestructor(DbContext context,
            ILogger<SpecialityDestructor> logger)
        {
            _context = context;
            _logger = logger;
        }

        public void Destroy(Speciality speciality)
        {
            DestroyCourses(speciality);
            DestroySpecialitySpecialities(speciality);

            _context.Remove(speciality);
            _context.SaveChanges();
            
            Log(speciality, "Suppréssion du niveau terminée!");
        }

        

        private void DestroyStudents(Speciality speciality)
        {
            // Log(speciality, "Début de la suppréssion des étudiants.");
            //
            // var students = _context.Set<Student>().Where(s => speciality.Equals(s.));
            // _context.RemoveRange(students);
            //
            // Log(school, "Fin de la suppréssion des étudiants");
        }
        
        
        
        
        private void DestroyCourses(Speciality speciality)
        {
            // Log(speciality, "Début de la suppréssion des cours.");
            //
            // var courses = _context.Set<Course>().Where(c => speciality.Equals(c.Speciality));
            // _context.RemoveRange(courses);
            //
            // Log(speciality, "Fin de la suppréssion des cours.");
        }
        
        
        
        private void DestroySpecialitySpecialities(Speciality speciality)
        {
            Log(speciality, "Suppréssion des spécialités du niveau.");

            var specialities = _context.Set<LevelSpeciality>().Where(l => speciality.Equals(l.Speciality));
            _context.RemoveRange(specialities);
            
        }
        
        
        private void Log(Speciality school, string message)
        {
            _logger.LogInformation(message);
        }
    }
}