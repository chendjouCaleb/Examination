using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Statistics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers
{
    [Route("api/examinationLevels")]
    public class ExaminationLevelController
    {
        private readonly IRepository<ExaminationLevel, long> _repository;
        private DbContext _dbContext;

        public ExaminationLevelController(IRepository<ExaminationLevel, long> repository, DbContext dbContext)
        {
            _repository = repository;
            _dbContext = dbContext;
        }


        [HttpGet("{examinationLevelId}")]
        public ExaminationLevel Get(long examinationLevelId)
        {
            ExaminationLevel examinationLevel = _repository.Find(examinationLevelId);
            
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
            [FromQuery] long? levelId)
        {
            if (examinationId != null)
            {
                return _repository.List(e => e.ExaminationDepartment.ExaminationId == examinationId);
            }

            if (examinationDepartmentId != null)
            {
                return _repository.List(e => e.ExaminationDepartmentId == examinationDepartmentId);
            }

            if (levelId != null)
            {
                return _repository.List(e => e.LevelId == levelId);
            }

            return new ExaminationLevel[0];
        }


        public ExaminationLevel _Add(ExaminationDepartment examinationDepartment, Level level)
        {
            Assert.RequireNonNull(examinationDepartment, nameof(level));
            Assert.RequireNonNull(level, nameof(level));

            if (!examinationDepartment.Department.Equals(level.Department))
            {
                throw new IncompatibleEntityException<ExaminationDepartment, Level>(examinationDepartment,
                    level);
            }

            ExaminationLevel examinationLevel = _repository
                .First(e => examinationDepartment.Equals(e.ExaminationDepartment) && level.Equals(e.Level));

            if (examinationLevel == null)
            {
                examinationLevel = new ExaminationLevel
                {
                    ExaminationDepartment = examinationDepartment,
                    Level = level
                };
            }

            return examinationLevel;
        }


        public void Delete(ExaminationLevel examinationLevel)
        {
            _repository.Delete(examinationLevel);
        }
    }
}