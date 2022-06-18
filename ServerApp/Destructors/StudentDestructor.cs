using System.Linq;
using System.Threading.Tasks;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Entities.Periods;
using Exam.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Exam.Destructors
{
    public class StudentDestructor
    {
        private readonly DbContext _context;
        private ILogger<StudentDestructor> _logger;


        public StudentDestructor(DbContext context,
            ILogger<StudentDestructor> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task Destroy(Student student)
        {
            DestroyYearStudents(student);
            DestroySemesterStudents(student);

            _context.Remove(student);
            await _context.SaveChangesAsync();
            
            Log("Suppréssion de l'étudent terminée!");
        }

        private void DestroyYearStudents(Student student)
        {
            Log("Début de la suppréssion des années scolaires.");

            var yearStudents = _context.Set<YearStudent>().Where(s => student.Equals(s.Student));
            _context.RemoveRange(yearStudents);
            
            Log( "Fin de la suppréssion des années scolaires.");
        }
        
        private void DestroySemesterStudents(Student student)
        {
            Log("Début de la suppréssion des semestres.");

            var semesterStudents = _context.Set<SemesterStudent>()
                .Where(s => student.Equals(s.YearStudent.Student));
            _context.RemoveRange(semesterStudents);
            
            Log( "Fin de la suppréssion des semestres.");
        }

        


        private void Log(string message)
        {
            _logger.LogInformation(message);
        }
    }
}