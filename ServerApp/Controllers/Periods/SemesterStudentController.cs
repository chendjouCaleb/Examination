using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Exam.Destructors;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Exam.Loaders;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers.Periods
{
    [Route("api/semesterStudents")]
    public class SemesterStudentController:Controller
    {
        private DbContext _dbContext;

        public SemesterStudentController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet("{semesterStudentId}")]
        public SemesterStudent Get(SemesterStudent semesterStudent)
        {
            return semesterStudent;
        }


        [HttpGet]
        public IEnumerable<SemesterStudent> List([FromQuery] long? studentId,
            [FromQuery] long? yearStudentId,
            [FromQuery] long? semesterId, [FromQuery] long? semesterDepartmentId,
            [FromQuery] long? semesterLevelId, [FromQuery] long? semesterLevelSpecialityId
        )
        {
            IQueryable<SemesterStudent> query = _dbContext.Set<SemesterStudent>();

            if (studentId != null)
            {
                query = query.Where(s => s.YearStudent.StudentId == studentId);
            }
            
            if (yearStudentId != null)
            {
                query = query.Where(s => s.YearStudentId == yearStudentId);
            }

            if (semesterId != null)
            {
                query = query.Where(s => s.SemesterLevel.SemesterDepartment.SemesterId == semesterId);
            }
            
            if (semesterDepartmentId != null)
            {
                query = query.Where(s => s.SemesterLevel.SemesterDepartmentId == semesterDepartmentId);
            }
            
            if (semesterLevelId != null)
            {
                query = query.Where(s => s.SemesterLevelId == semesterLevelId);
            }
            
            if (semesterLevelSpecialityId != null)
            {
                query = query.Where(s => s.SemesterLevelSpecialityId == semesterLevelSpecialityId);
            }

            return query.ToList();
        }

        
        [HttpPost]
        [RequireQueryParameter("yearStudentId")]
        [RequireQueryParameter("semesterLevelId")]
        [LoadYearStudent(Source = ParameterSource.Query)]
        [LoadSemesterLevel(Source = ParameterSource.Query)]
        [LoadSemesterLevelSpeciality(Source = ParameterSource.Query)]
        public CreatedAtActionResult AddSemesterStudent(YearStudent yearStudent, SemesterLevel semesterLevel,
            SemesterLevelSpeciality semesterLevelSpeciality = null)
        {
            Assert.RequireNonNull(yearStudent, nameof(yearStudent));
            Assert.RequireNonNull(semesterLevel, nameof(semesterLevel));

            SemesterStudent semesterStudent = _AddSemesterStudent(yearStudent, semesterLevel, semesterLevelSpeciality);
            _dbContext.Add(semesterStudent);
            _dbContext.SaveChanges();
            
            return CreatedAtAction("Get", new {semesterStudentId = semesterStudent.Id}, semesterStudent);
        }
        
        
        [HttpPost("addAll")]
        [LoadSemester(Source = ParameterSource.Query)]
        public List<SemesterStudent> AddStudents(Semester semester)
        {
            Assert.RequireNonNull(semester, nameof(semester));

            List<YearStudent> yearStudents = _dbContext.Set<YearStudent>()
                .Where(ys => ys.YearLevel.YearDepartment.Year.Equals(semester.Year))
                .ToList();
            List<SemesterLevel> semesterLevels = _dbContext.Set<SemesterLevel>()
                .Where(yl => yl.SemesterDepartment.SemesterId == semester.Id)
                .ToList();
            
            List<SemesterLevelSpeciality> semesterLevelSpecialities = _dbContext.Set<SemesterLevelSpeciality>()
                .Where(yls => yls.SemesterLevel.SemesterDepartment.SemesterId == semester.Id)
                .ToList();

            return _AddStudents(yearStudents, semesterLevels, semesterLevelSpecialities);
        }

        
        [HttpPut("{semesterStudentId}/speciality")]
        [LoadSemesterStudent]
        [RequireQueryParameter("semesterLevelSpecialityId")]
        [LoadSemesterLevelSpeciality(Source = ParameterSource.Query)]
        public OkResult ChangeSpeciality(SemesterStudent semesterStudent, SemesterLevelSpeciality semesterLevelSpeciality)
        {
            _ChangeSpeciality(semesterStudent, semesterLevelSpeciality);
            _dbContext.Update(semesterStudent);
            _dbContext.SaveChanges();

            return Ok();
        }

        public void _ChangeSpeciality(SemesterStudent semesterStudent, SemesterLevelSpeciality semesterLevelSpeciality)
        {
            Assert.RequireNonNull(semesterStudent, nameof(semesterStudent));
            Assert.RequireNonNull(semesterLevelSpeciality, nameof(semesterLevelSpeciality));

            if (!semesterStudent.SemesterLevel.Equals(semesterLevelSpeciality.SemesterLevel))
            {
                throw new IncompatibleEntityException(semesterStudent, semesterLevelSpeciality);
            }

            semesterStudent.SemesterLevelSpeciality = semesterLevelSpeciality;
        }

        [HttpDelete("{semesterStudentId}")]
        [LoadSemesterStudent]
        public NoContentResult Delete(SemesterStudent semesterStudent)
        {
            Assert.RequireNonNull(semesterStudent, nameof(semesterStudent));
            var destructor = new SemesterStudentDestructor(_dbContext);

            destructor.Destroy(semesterStudent);
            _dbContext.SaveChanges();
            return NoContent();
        }

        public SemesterStudent _AddSemesterStudent(YearStudent yearStudent, SemesterLevel semesterLevel,
            SemesterLevelSpeciality semesterLevelSpeciality = null)
        {
            Assert.RequireNonNull(yearStudent, nameof(yearStudent));
            Assert.RequireNonNull(semesterLevel, nameof(semesterLevel));
            
            if (Contains(yearStudent, semesterLevel))
            {
                throw new DuplicateObjectException("DUPLICATE_SEMESTER_STUDENT");
            }

            if (!yearStudent.YearLevel.Equals(semesterLevel.YearLevel))
            {
                throw new IncompatibleEntityException(yearStudent, semesterLevel);
            }

            if (semesterLevelSpeciality != null && !semesterLevel.Equals(semesterLevelSpeciality.SemesterLevel))
            {
                throw new IncompatibleEntityException(semesterLevel, semesterLevelSpeciality);
            }
            
            SemesterStudent semesterStudent = new SemesterStudent
            {
                SemesterLevel = semesterLevel,
                SemesterLevelSpeciality = semesterLevelSpeciality,
                YearStudent = yearStudent
            };
            return semesterStudent;
        }

        public List<SemesterStudent> _AddStudents(List<YearStudent> yearStudents, List<SemesterLevel> semesterLevels,
            List<SemesterLevelSpeciality> semesterLevelSpecialities)
        {
            List<SemesterStudent> semesterStudents = new List<SemesterStudent>();

            foreach (YearStudent yearStudent in yearStudents)
            {
                SemesterLevel semesterLevel = semesterLevels.Find(yl => yl.YearLevel.Equals(yearStudent.YearLevel));
                SemesterLevelSpeciality semesterLevelSpeciality = semesterLevelSpecialities
                    .Find(yl => yl.YearLevelSpeciality.Equals(yearStudent.YearLevelSpeciality));

                if (semesterLevel != null && !Contains(yearStudent, semesterLevel))
                {
                    SemesterStudent semesterStudent = _AddSemesterStudent(yearStudent, semesterLevel, semesterLevelSpeciality);
                    semesterStudents.Add(semesterStudent);
                }
            }
            return semesterStudents;
        }

        public SemesterStudent Find(YearStudent yearStudent, SemesterLevel semesterLevel)
        {
            return _dbContext.Set<SemesterStudent>()
                .FirstOrDefault(ss => ss.YearStudentId == yearStudent.Id && ss.SemesterLevelId == semesterLevel.Id);
        }
        
        public bool Contains(YearStudent yearStudent, SemesterLevel semesterLevel)
        {
            return _dbContext.Set<SemesterStudent>()
                .Any(ss => ss.YearStudentId == yearStudent.Id && ss.SemesterLevelId == semesterLevel.Id);
        }
    }
}