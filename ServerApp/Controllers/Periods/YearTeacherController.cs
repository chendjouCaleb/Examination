using System.Collections.Generic;
using System.Linq;
using Exam.Destructors;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers.Periods
{
    
    [Route("api/yearTeachers")]
    public class YearTeacherController:Controller
    {
        public readonly DbContext DbContext;

        public YearTeacherController(DbContext dbContext)
        {
            DbContext = dbContext;
        }


        [HttpGet("{yearTeacherId}")]
        public YearTeacher Get(YearTeacher yearTeacher)
        {
            return yearTeacher;
        }


        [HttpGet]
        public IEnumerable<YearTeacher> List([FromQuery] long? teacherId,
            [FromQuery] long? yearId, [FromQuery] long? yearDepartmentId)
        {
            IQueryable<YearTeacher> query = DbContext.Set<YearTeacher>();

            if (teacherId != null)
            {
                query = query.Where(s => s.TeacherId == teacherId);
            }
            
            if (yearDepartmentId != null)
            {
                query = query.Where(s => s.YearDepartmentId == yearDepartmentId);
            }
            
            if (yearId != null)
            {
                query = query.Where(s => s.YearDepartment.YearId == yearDepartmentId);
            }
            
            return query.ToList();
        }
        
        
        [HttpPost("addAll")]
        public List<YearTeacher> AddTeachers(Year year)
        {
            Assert.RequireNonNull(year, nameof(year));

            List<Teacher> teachers = DbContext.Set<Teacher>()
                .Where(t => t.Department.SchoolId == year.SchoolId && t.IsActive)
                .ToList();
            
            List<YearDepartment> yearDepartments = DbContext.Set<YearDepartment>()
                .Where(yd => yd.YearId == year.Id)
                .ToList();
            

            return _AddTeachers(teachers, yearDepartments);
        }


        [HttpDelete("{yearTeacherId}")]
        public NoContentResult Delete(YearTeacher yearTeacher)
        {
            Assert.RequireNonNull(yearTeacher, nameof(yearTeacher));
            var destructor = new YearTeacherDestructor(DbContext);

            destructor.Destroy(yearTeacher);
            DbContext.SaveChanges();
            return NoContent();
        }

        public YearTeacher _AddYearTeacher(Teacher teacher, YearDepartment yearDepartment)
        {
            Assert.RequireNonNull(teacher, nameof(teacher));
            Assert.RequireNonNull(yearDepartment, nameof(yearDepartment));

            YearTeacher yearTeacher = DbContext.Set<YearTeacher>()
                .FirstOrDefault(yt => yt.TeacherId == teacher.Id && yt.YearDepartmentId == yearDepartment.Id);
            if (yearTeacher != null)
            {
                return yearTeacher;
            }

            if (!teacher.Department.Equals(yearDepartment.Department))
            {
                throw new IncompatibleEntityException(teacher, yearDepartment);
            }
            
            yearTeacher = new YearTeacher
            {
                YearDepartment = yearDepartment,
                Teacher = teacher
            };

            DbContext.Add(yearTeacher);

            return yearTeacher;
        }

        public List<YearTeacher> _AddTeachers(List<Teacher> teachers, List<YearDepartment> yearDepartments)
        {
            List<YearTeacher> yearTeachers = new List<YearTeacher>();

            foreach (Teacher teacher in teachers.FindAll(s => s.IsActive))
            {
                YearDepartment yearDepartment = yearDepartments.Find(yd => yd.DepartmentId == teacher.DepartmentId);
                YearTeacher yearTeacher = _AddYearTeacher(teacher, yearDepartment);
                yearTeachers.Add(yearTeacher);
            }

            return yearTeachers;
        }
    }
}