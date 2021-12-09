using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Exam.Authorizers;
using Exam.Destructors;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Exam.Loaders;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers.Periods
{
    [Route("api/semesterTeachers")]
    public class SemesterTeacherController : Controller
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
                query = query.Where(s => s.SemesterDepartment.SemesterId == semesterId);
            }

            return query.ToList();
        }


        [HttpPost]
        [RequireQueryParameter("semesterDepartmentId")]
        [RequireQueryParameter("yearTeacherId")]
        [LoadSemesterDepartment(Source = ParameterSource.Query)]
        [LoadYearTeacher(Source = ParameterSource.Query, DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public CreatedAtActionResult AddSemesterTeacher(YearTeacher yearTeacher, SemesterDepartment semesterDepartment)
        {
            Assert.RequireNonNull(yearTeacher, nameof(yearTeacher));
            Assert.RequireNonNull(semesterDepartment, nameof(semesterDepartment));

            SemesterTeacher semesterTeacher = _AddSemesterTeacher(yearTeacher, semesterDepartment);
            DbContext.Add(semesterTeacher);
            DbContext.SaveChanges();
            return CreatedAtAction("Get", new {semesterTeacherId = semesterTeacher.Id}, semesterTeacher);
        }

        [HttpPost("addAll")]
        [RequireQueryParameter("semesterId")]
        [LoadSemester(Source = ParameterSource.Query, SchoolItemName = "school")]
        [IsDirector]
        public List<SemesterTeacher> AddTeachers(Semester semester)
        {
            Assert.RequireNonNull(semester, nameof(semester));

            List<YearTeacher> yearTeachers = DbContext.Set<YearTeacher>()
                .Where(t => t.YearDepartment.Year.Equals(semester.Year))
                .ToList();

            List<SemesterDepartment> semesterDepartments = DbContext.Set<SemesterDepartment>()
                .Where(yd => yd.SemesterId == semester.Id)
                .ToList();

            var semesterTeachers = _AddTeachers(yearTeachers, semesterDepartments);
            DbContext.AddRange(semesterTeachers);
            DbContext.SaveChanges();

            return semesterTeachers;
        }
        
        
        [HttpPost("addAllDepartment")]
        [RequireQueryParameter("semesterDepartmentId")]
        [LoadSemesterDepartment(Source = ParameterSource.Query, DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public List<SemesterTeacher> AddTeachers(SemesterDepartment semesterDepartment)
        {
            Assert.RequireNonNull(semesterDepartment, nameof(semesterDepartment));

            List<YearTeacher> yearTeachers = DbContext.Set<YearTeacher>()
                .Where(t => t.YearDepartment.Equals(semesterDepartment.YearDepartment))
                .ToList();

            List<SemesterDepartment> semesterDepartments = new List<SemesterDepartment>{semesterDepartment};

            var semesterTeachers = _AddTeachers(yearTeachers, semesterDepartments);
            DbContext.AddRange(semesterTeachers);
            DbContext.SaveChanges();

            return semesterTeachers;
        }


        [HttpDelete("{semesterTeacherId}")]
        [LoadSemesterTeacher(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
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

            if (Contains(yearTeacher, semesterDepartment))
            {
                throw new DuplicateObjectException("DUPLICATE_ENTITY");
            }

            if (!yearTeacher.YearDepartment.Equals(semesterDepartment.YearDepartment))
            {
                throw new IncompatibleEntityException(yearTeacher, semesterDepartment);
            }

            SemesterTeacher semesterTeacher = new SemesterTeacher
            {
                SemesterDepartment = semesterDepartment,
                YearTeacher = yearTeacher
            };

            return semesterTeacher;
        }

        public List<SemesterTeacher> _AddTeachers(List<YearTeacher> yearTeachers,
            List<SemesterDepartment> semesterDepartments)
        {
            List<SemesterTeacher> semesterTeachers = new List<SemesterTeacher>();

            foreach (YearTeacher yearTeacher in yearTeachers)
            {
                SemesterDepartment semesterDepartment = semesterDepartments
                    .Find(sd => yearTeacher.YearDepartment.Equals(sd.YearDepartment));

                if (!Contains(yearTeacher, semesterDepartment))
                {
                    SemesterTeacher semesterTeacher = _AddSemesterTeacher(yearTeacher, semesterDepartment);
                    semesterTeachers.Add(semesterTeacher);
                }
            }

            return semesterTeachers;
        }

        public bool Contains(YearTeacher yearTeacher, SemesterDepartment semesterDepartment)
        {
            return DbContext.Set<SemesterTeacher>()
                .Any(yt => yearTeacher.Equals(yt.YearTeacher) && semesterDepartment.Equals(yt.SemesterDepartment));
        }

        public SemesterTeacher First(YearTeacher yearTeacher, SemesterDepartment semesterDepartment)
        {
            return DbContext.Set<SemesterTeacher>()
                .FirstOrDefault(yt =>
                    yearTeacher.Equals(yt.YearTeacher) && semesterDepartment.Equals(yt.SemesterDepartment));
        }
    }
}