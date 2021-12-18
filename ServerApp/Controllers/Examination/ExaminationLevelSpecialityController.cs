using System.Collections.Generic;
using System.Data;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers
{
    [Route("api/examinationLevelSpecialities")]
    public class ExaminationLevelSpecialityController
    {
        private readonly DbContext _dbContext;

        public ExaminationLevelSpecialityController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet("{examinationLevelSpecialityId}")]
        public ExaminationLevelSpeciality Get(long examinationLevelSpecialityId)
        {
            return _dbContext.Set<ExaminationLevelSpeciality>().Find(examinationLevelSpecialityId);
        }

        [HttpGet]
        public IEnumerable<ExaminationLevelSpeciality> List(
            [FromQuery] long? levelSpecialityId,
            [FromQuery] long? yearLevelSpecialityId,
            [FromQuery] long? semesterLevelSpecialityId,
            [FromQuery] long? examinationLevelId,
            [FromQuery] long? examinationSpecialityId)
        {
            IQueryable<ExaminationLevelSpeciality> query = _dbContext.Set<ExaminationLevelSpeciality>();

            if (levelSpecialityId != null)
            {
                query = query
                    .Where(e => e.SemesterLevelSpeciality.YearLevelSpeciality.LevelSpecialityId == levelSpecialityId);
            }

            if (yearLevelSpecialityId != null)
            {
                query = query.Where(e => e.SemesterLevelSpeciality.YearLevelSpecialityId == yearLevelSpecialityId);
            }

            if (semesterLevelSpecialityId != null)
            {
                query = query.Where(e => e.SemesterLevelSpecialityId == semesterLevelSpecialityId);
            }

            if (examinationLevelId != null)
            {
                query = query.Where(e => e.ExaminationLevelId == examinationLevelId);
            }

            if (examinationSpecialityId != null)
            {
                query = query.Where(e => e.ExaminationSpecialityId == examinationSpecialityId);
            }

            return query.ToArray();
        }
        

        public ExaminationLevelSpeciality _Add(ExaminationLevel examinationLevel,
            ExaminationSpeciality examinationSpeciality)
        {
            Assert.RequireNonNull(examinationLevel, nameof(examinationSpeciality));
            Assert.RequireNonNull(examinationSpeciality, nameof(examinationSpeciality));

            if (!examinationLevel.ExaminationDepartment.Equals(examinationSpeciality.ExaminationDepartment))
            {
                throw new IncompatibleEntityException<ExaminationLevel, ExaminationSpeciality>(examinationLevel,
                    examinationSpeciality);
            }

            if (Contains(examinationLevel, examinationSpeciality))
            {
                throw new DuplicateObjectException("DUPLICATE_EXAMINATION_LEVEL_SPECIALITY");
            }

            SemesterLevelSpeciality semesterLevelSpeciality = _dbContext.Set<SemesterLevelSpeciality>()
                .First(s => s.SemesterSpeciality.Equals(examinationSpeciality.SemesterSpeciality)
                            && s.SemesterLevel.Equals(examinationLevel.SemesterLevel));


            ExaminationLevelSpeciality examinationLevelSpeciality = new ExaminationLevelSpeciality
            {
                ExaminationLevel = examinationLevel,
                ExaminationSpeciality = examinationSpeciality,
                SemesterLevelSpeciality = semesterLevelSpeciality
            };

            return examinationLevelSpeciality;
        }


        public void Delete(ExaminationLevelSpeciality examinationLevelSpeciality)
        {
            _dbContext.Remove(examinationLevelSpeciality);
            _dbContext.SaveChanges();
        }

        public bool Contains(ExaminationLevel examinationLevel, ExaminationSpeciality examinationSpeciality)
        {
            return _dbContext.Set<ExaminationLevelSpeciality>()
                .Any(e => examinationLevel.Equals(e.ExaminationLevel) &&
                          examinationSpeciality.Equals(e.ExaminationSpeciality));
        }

        public ExaminationLevelSpeciality Find(ExaminationLevel examinationLevel,
            ExaminationSpeciality examinationSpeciality)
        {
            return _dbContext.Set<ExaminationLevelSpeciality>()
                .FirstOrDefault(e => examinationLevel.Equals(e.ExaminationLevel) &&
                                     examinationSpeciality.Equals(e.ExaminationSpeciality));
        }
    }
}