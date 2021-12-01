using System.Collections.Generic;
using System.Linq;
using Exam.Destructors;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers.Periods
{
    [Route("api/semesterTeachers")]
    public class SemesterTeacherController:Controller
    {
        public readonly DbContext DbContext;

        public SemesterTeacherController(DbContext dbContext)
        {
            DbContext = dbContext;
        }


        /// <summary>
        /// Find a semesterTeacher
        /// </summary>
        /// <param name="semesterTeacherId">The Semester teacher id.</param>
        /// <returns></returns>
        [HttpGet("{semesterTeacherId}")]
        public SemesterTeacher Get(long semesterTeacherId)
        {
            return DbContext.Set<SemesterTeacher>()
                .Include(s => s.YearTeacher)
                .ThenInclude(y => y.Teacher)
                .First(s => s.Id == semesterTeacherId);
        }


        [HttpGet]
        public IEnumerable<SemesterTeacher> List([FromQuery] long? teacherId,
            [FromQuery] long? yearTeacherId,
            [FromQuery] long? semesterId, [FromQuery] long? semesterDepartmentId)
        {
            IQueryable<SemesterTeacher> query = DbContext.Set<SemesterTeacher>();

            if (teacherId != null)
            {
                query = query.Where(s => s.YearTeacher.TeacherId == teacherId);
            }
            
            if (yearTeacherId != null)
            {
                query = query.Where(s => s.YearTeacherId == yearTeacherId);
            }
            
            if (semesterDepartmentId != null)
            {
                query = query.Where(s => s.SemesterDepartmentId == semesterDepartmentId);
            }
            
            if (semesterId != null)
            {
                query = query.Where(s => s.SemesterDepartment.SemesterId == semesterDepartmentId);
            }
            
            return query.ToList();
        }
        
        
        [HttpPost("addAll")]
        public List<SemesterTeacher> AddTeachers(Semester semester)
        {
            Assert.RequireNonNull(semester, nameof(semester));

            List<YearTeacher> yearTeachers = DbContext.Set<YearTeacher>()
                .Where(t => t.YearDepartment.Year.Equals(semester.Year))
                .ToList();
            
            List<SemesterDepartment> semesterDepartments = DbContext.Set<SemesterDepartment>()
                .Where(yd => yd.SemesterId == semester.Id)
                .ToList();
            

            return _AddTeachers(yearTeachers, semesterDepartments);
        }


        [HttpDelete("{semesterTeacherId}")]
        public NoContentResult Delete(SemesterTeacher semesterTeacher)
        {
            Assert.RequireNonNull(semesterTeacher, nameof(semesterTeacher));
            var destructor = new SemesterTeacherDestructor(DbContext);

            destructor.Destroy(semesterTeacher);
            DbContext.SaveChanges();
            return NoContent();
        }

        public SemesterTeacher _AddSemesterTeacher(YearTeacher yearTeacher, SemesterDepartment semesterDepartment)
        {
            Assert.RequireNonNull(yearTeacher, nameof(yearTeacher));
            Assert.RequireNonNull(semesterDepartment, nameof(semesterDepartment));

            SemesterTeacher semesterTeacher = DbContext.Set<SemesterTeacher>()
                .FirstOrDefault(yt => yearTeacher.Equals(yt.YearTeacher) && semesterDepartment.Equals(yt.SemesterDepartment));
            if (semesterTeacher != null)
            {
                return semesterTeacher;
            }

            if (!yearTeacher.YearDepartment.Equals(semesterDepartment.YearDepartment))
            {
                throw new IncompatibleEntityException(yearTeacher, semesterDepartment);
            }
            
            semesterTeacher = new SemesterTeacher
            {
                SemesterDepartment = semesterDepartment,
                YearTeacher = yearTeacher
            };

            DbContext.Add(semesterTeacher);

            return semesterTeacher;
        }

        public List<SemesterTeacher> _AddTeachers(List<YearTeacher> yearTeachers, List<SemesterDepartment> semesterDepartments)
        {
            List<SemesterTeacher> semesterTeachers = new List<SemesterTeacher>();

            foreach (YearTeacher yearTeacher in yearTeachers)
            {
                SemesterDepartment semesterDepartment = semesterDepartments
                    .Find(sd => yearTeacher.YearDepartment.Equals(sd.YearDepartment));
                
                SemesterTeacher semesterTeacher = _AddSemesterTeacher(yearTeacher, semesterDepartment);
                semesterTeachers.Add(semesterTeacher);
            }

            return semesterTeachers;
        }
    }
}