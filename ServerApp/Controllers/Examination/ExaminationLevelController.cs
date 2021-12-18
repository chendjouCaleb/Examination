using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Exam.Statistics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers
{
    [Route("api/examinationLevels")]
    public class ExaminationLevelController
    {
        private DbContext _dbContext;

        public ExaminationLevelController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet("{examinationLevelId}")]
        public ExaminationLevel Get(long examinationLevelId)
        {
            ExaminationLevel examinationLevel = _dbContext.Set<ExaminationLevel>().Find(examinationLevelId);

            var builder = new ExaminationLevelStatisticsBuilder(_dbContext);

            var statistics = builder.Statistics(examinationLevel);

            JsonSerializerOptions options = new JsonSerializerOptions();
            options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            examinationLevel.Statistics = JsonSerializer.Serialize(statistics, options);
            return examinationLevel;
        }

        [HttpGet]
        public IEnumerable<ExaminationLevel> List([FromQuery] long? examinationId,
            [FromQuery] long? examinationDepartmentId,
            [FromQuery] long? yearLevelId,
            [FromQuery] long? semesterLevelId,
            [FromQuery] long? levelId)
        {
            IQueryable<ExaminationLevel> query = _dbContext.Set<ExaminationLevel>();

            if (examinationId != null)
            {
                query = query.Where(e => e.ExaminationDepartment.ExaminationId == examinationId);
            }

            if (examinationDepartmentId != null)
            {
                query = query.Where(e => e.ExaminationDepartmentId == examinationDepartmentId);
            }

            if (yearLevelId != null)
            {
                query = query.Where(e => e.SemesterLevel.YearLevelId == yearLevelId);
            }

            if (semesterLevelId != null)
            {
                query = query.Where(e => e.SemesterLevel.Id == yearLevelId);
            }

            if (levelId != null)
            {
                query = query.Where(e => e.SemesterLevel.YearLevel.LevelId == levelId);
            }

            return query.ToList();
        }


        public ExaminationLevel _Add(ExaminationDepartment examinationDepartment, SemesterLevel semesterLevel)
        {
            Assert.RequireNonNull(examinationDepartment, nameof(examinationDepartment));
            Assert.RequireNonNull(semesterLevel, nameof(semesterLevel));

            if (!examinationDepartment.SemesterDepartment.Equals(semesterLevel.SemesterDepartment))
            {
                throw new IncompatibleEntityException(examinationDepartment, semesterLevel);
            }

            if (Contains(examinationDepartment, semesterLevel))
            {
                throw new DuplicateObjectException("DUPLICATE_EXAMINATION_LEVEL");
            }

            ExaminationLevel examinationLevel = new ExaminationLevel
            {
                ExaminationDepartment = examinationDepartment,
                SemesterLevel = semesterLevel
            };

            return examinationLevel;
        }


        public void Delete(ExaminationLevel examinationLevel)
        {
            _dbContext.Remove(examinationLevel);
            _dbContext.SaveChanges();
        }

        public bool Contains(ExaminationDepartment examinationDepartment, SemesterLevel semesterLevel)
        {
            return _dbContext.Set<ExaminationLevel>()
                .Any(e => examinationDepartment.Equals(e.ExaminationDepartment) &&
                          semesterLevel.Equals(e.SemesterLevel));
        }

        public ExaminationLevel Find(ExaminationDepartment examinationDepartment, SemesterLevel semesterLevel)
        {
            return _dbContext.Set<ExaminationLevel>()
                .FirstOrDefault(e => examinationDepartment.Equals(e.ExaminationDepartment) &&
                                     semesterLevel.Equals(e.SemesterLevel));
        }
    }
}