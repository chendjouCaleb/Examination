using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Exam.Authorizers;
using Exam.Destructors;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Exam.Loaders;
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
        public YearTeacher Get(long yearTeacherId)
        {
            return DbContext.Set<YearTeacher>().Include(y => y.Teacher)
                .FirstOrDefault(y => y.Id == yearTeacherId);
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
                query = query.Where(s => s.YearDepartment.YearId == yearId);
            }
            
            return query.ToList();
        }

        
        [HttpPost]
        [RequireQueryParameter("teacherId")]
        [RequireQueryParameter("yearDepartmentId")]
        [LoadTeacher(Source = ParameterSource.Query)]
        [LoadYearDepartment(Source = ParameterSource.Query, DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public YearTeacher AddYearTeacher(Teacher teacher, YearDepartment yearDepartment)
        {
            Assert.RequireNonNull(teacher, nameof(teacher));
            Assert.RequireNonNull(yearDepartment, nameof(yearDepartment));

            YearTeacher yearTeacher = _AddYearTeacher(teacher, yearDepartment);
            DbContext.Add(yearTeacher);
            DbContext.SaveChanges();

            return yearTeacher;
        }
        
        
        [HttpPost("addAllDepartment")]
        [RequireQueryParameter("yearDepartmentId")]
        [LoadYearDepartment(Source = ParameterSource.Query, DepartmentItemName = "school")]
        [IsDepartmentPrincipal]
        public List<YearTeacher> AddTeachers(YearDepartment yearDepartment)
        {
            Assert.RequireNonNull(yearDepartment, nameof(yearDepartment));

            List<Teacher> teachers = DbContext.Set<Teacher>()
                .Where(t => yearDepartment.Department.Equals(t.Department) && t.IsActive)
                .ToList();
            
            List<YearDepartment> yearDepartments = new List<YearDepartment>{yearDepartment};
            
            var yearTeachers = _AddTeachers(teachers, yearDepartments);

            DbContext.AddRange(yearTeachers);
            DbContext.SaveChanges();

            return yearTeachers;
        }
        
        [HttpPost("addAll")]
        [RequireQueryParameter("yearId")]
        [LoadYear(Source = ParameterSource.Query, SchoolItemName = "school")]
        [IsDirector]
        public List<YearTeacher> AddTeachers(Year year)
        {
            Assert.RequireNonNull(year, nameof(year));

            List<Teacher> teachers = DbContext.Set<Teacher>()
                .Where(t => t.Department.SchoolId == year.SchoolId && t.IsActive)
                .ToList();
            
            List<YearDepartment> yearDepartments = DbContext.Set<YearDepartment>()
                .Where(yd => yd.YearId == year.Id)
                .ToList();
            
            var yearTeachers = _AddTeachers(teachers, yearDepartments);

            DbContext.AddRange(yearTeachers);
            DbContext.SaveChanges();

            return yearTeachers;
        }


        [HttpDelete("{yearTeacherId}")]
        [LoadYearTeacher]
        [IsDepartmentPrincipal]
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

            return yearTeacher;
        }

        public List<YearTeacher> _AddTeachers(List<Teacher> teachers, List<YearDepartment> yearDepartments)
        {
            List<YearTeacher> yearTeachers = new List<YearTeacher>();

            foreach (Teacher teacher in teachers.FindAll(s => s.IsActive))
            {
                YearDepartment yearDepartment = yearDepartments.Find(yd => yd.DepartmentId == teacher.DepartmentId);

                if (yearDepartment != null && !Contains(teacher, yearDepartment))
                {
                    YearTeacher yearTeacher = _AddYearTeacher(teacher, yearDepartment);
                    yearTeachers.Add(yearTeacher);   
                }
            }

            return yearTeachers;
        }

        public bool Contains(Teacher teacher, YearDepartment yearDepartment)
        {
            return DbContext.Set<YearTeacher>()
                .Any(yt => yt.TeacherId == teacher.Id && yt.YearDepartmentId == yearDepartment.Id);
        }
        
        public YearTeacher First(Teacher teacher, YearDepartment yearDepartment)
        {
            return DbContext.Set<YearTeacher>()
                .FirstOrDefault(yt => yt.TeacherId == teacher.Id && yt.YearDepartmentId == yearDepartment.Id);
        }
        
        
    }
}