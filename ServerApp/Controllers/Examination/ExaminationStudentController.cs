using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace Exam.Controllers
{
    [Route("api/examinationStudents")]
    public class ExaminationStudentController
    {
        private readonly DbContext _dbContext;

        public ExaminationStudentController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet("{examinationStudentId}")]
        public ExaminationStudent Get(long examinationStudentId)
        {
            return _dbContext.Set<ExaminationStudent>()
                .Include(e => e.SemesterStudent)
                .ThenInclude(s => s.YearStudent).ThenInclude(s => s.Student)
                .FirstOrDefault(e => e.Id == examinationStudentId);
        }

        [HttpGet]
        public IEnumerable<ExaminationStudent> List(
            [FromQuery] string userId,
            [FromQuery] long? studentId,
            [FromQuery] long? yearStudentId,
            [FromQuery] long? semesterStudentId,
            [FromQuery] long? examinationId,
            [FromQuery] long? examinationLevelId,
            [FromQuery] long? examinationLevelSpecialityId,
            [FromQuery] long? examinationSpecialityId,
            [FromQuery] long? examinationDepartmentId)
        {
            IQueryable<ExaminationStudent> query = _dbContext.Set<ExaminationStudent>()
                .Include(s => s.SemesterStudent)
                .ThenInclude(s => s.YearStudent).ThenInclude(s => s.Student);
            
            if (userId != null)
            {
                query = query.Where(e => e.SemesterStudent.YearStudent.Student.UserId == userId);
            }
            
            if (studentId != null)
            {
                query = query.Where(e => e.SemesterStudent.YearStudent.StudentId == studentId);
            }
            
            if (yearStudentId != null)
            {
                query = query.Where(e => e.SemesterStudent.YearStudentId == yearStudentId);
            }
            
            if (semesterStudentId != null)
            {
                query = query.Where(e => e.SemesterStudentId == semesterStudentId);
            }

            if (examinationId != null)
            {
                query = query.Where(s => s.ExaminationLevel.ExaminationDepartment.ExaminationId == examinationId);
            }
            
            if (examinationDepartmentId != null)
            {
                query = query.Where(s => s.ExaminationLevel.ExaminationDepartmentId == examinationDepartmentId);
            }

            if (examinationLevelId != null)
            {
                query = query.Where(s => s.ExaminationLevelId == examinationLevelId);
            }
            
            if (examinationSpecialityId != null)
            {
                query = query.Where(
                    s => s.ExaminationLevelSpeciality.ExaminationSpecialityId == examinationSpecialityId);
            }

            if (examinationLevelSpecialityId != null)
            {
                query = query.Where(s => s.ExaminationLevelSpecialityId == examinationLevelSpecialityId);
            }
            

            return query.ToList();
        }


        public List<ExaminationStudent> Add(ExaminationLevel examinationLevel)
        {
            var examinationStudents = new List<ExaminationStudent>();

            var semesterStudents = _dbContext.Set<SemesterStudent>()
                .Where(s => s.SemesterLevel.Equals(examinationLevel.SemesterLevel))
                .ToList();

            foreach (SemesterStudent semesterStudent in semesterStudents)
            {
                if (!Contains(examinationLevel, semesterStudent))
                {
                    examinationStudents.Add(_Add(semesterStudent, examinationLevel));
                }
            }

            return examinationStudents;
        }

        public ExaminationStudent _Add(SemesterStudent semesterStudent, ExaminationLevel examinationLevel)
        {
            ExaminationLevelSpeciality examinationLevelSpeciality = _dbContext.Set<ExaminationLevelSpeciality>()
                .FirstOrDefault(
                    s => s.ExaminationLevel.Equals(examinationLevel) &&
                         s.SemesterLevelSpeciality.Equals(semesterStudent.SemesterLevelSpeciality));
            return _Add(semesterStudent, examinationLevel, examinationLevelSpeciality);
        }

        public ExaminationStudent _Add(SemesterStudent semesterStudent, ExaminationLevel examinationLevel,
            ExaminationLevelSpeciality examinationLevelSpeciality)
        {
            Assert.RequireNonNull(semesterStudent, nameof(semesterStudent));
            Assert.RequireNonNull(examinationLevel, nameof(examinationLevel));

            if (!semesterStudent.SemesterLevel.Equals(examinationLevel.SemesterLevel))
            {
                throw new IncompatibleEntityException(semesterStudent, examinationLevel);
            }

            if (examinationLevelSpeciality != null &&
                !examinationLevelSpeciality.ExaminationLevel.Equals(examinationLevel))
            {
                throw new IncompatibleEntityException(examinationLevelSpeciality, examinationLevel);
            }

            if (Contains(examinationLevel, semesterStudent))
            {
                throw new DuplicateObjectException("DUPLICATE_EXAMINATION_STUDENT");
            }


            ExaminationStudent  examinationStudent = new ExaminationStudent
                {
                    SemesterStudent = semesterStudent,
                    ExaminationLevel = examinationLevel,
                    ExaminationLevelSpeciality = examinationLevelSpeciality
                };
                

            return examinationStudent;
        }


        public void ChangeExaminationLevelSpeciality(
            ExaminationStudent examinationStudent,
            ExaminationLevelSpeciality examinationLevelSpeciality)
        {
            Assert.RequireNonNull(examinationStudent, nameof(examinationStudent));
            Assert.RequireNonNull(examinationLevelSpeciality, nameof(examinationLevelSpeciality));

            if (examinationLevelSpeciality.ExaminationLevelId != examinationStudent.ExaminationLevelId)
            {
                throw new IncompatibleEntityException<ExaminationLevelSpeciality, ExaminationStudent>(
                    examinationLevelSpeciality, examinationStudent);
            }

            examinationStudent.ExaminationLevelSpeciality = examinationLevelSpeciality;
            
            _dbContext.Update(examinationStudent);
            _dbContext.SaveChanges();
        }


        public void RemoveExaminationLevelSpeciality(ExaminationStudent examinationStudent)
        {
            Assert.RequireNonNull(examinationStudent, nameof(examinationStudent));

            examinationStudent.ExaminationLevelSpeciality = null;
            examinationStudent.ExaminationLevelSpecialityId = null;

            _dbContext.Update(examinationStudent);
            _dbContext.SaveChanges();
        }

        public void Delete(ExaminationStudent examinationStudent)
        {
            Assert.RequireNonNull(examinationStudent, nameof(examinationStudent));
            _dbContext.Remove(examinationStudent);
            _dbContext.SaveChanges();
        }

        public ExaminationStudent Find(ExaminationLevel examinationLevel, SemesterStudent semesterStudent)
        {
            return _dbContext.Set<ExaminationStudent>()
                .FirstOrDefault(s =>  examinationLevel.Equals(s.ExaminationLevel) &&
                semesterStudent.Equals(s.SemesterStudent));
        }
        
        public bool Contains(ExaminationLevel examinationLevel, SemesterStudent semesterStudent)
        {
            return _dbContext.Set<ExaminationStudent>()
                .Any(s =>  examinationLevel.Equals(s.ExaminationLevel) &&
                                      semesterStudent.Equals(s.SemesterStudent));
        }
    }
}