using System.Collections.Generic;
using System.Linq;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers
{
    [Route("api/examinationSpecialities")]
    public class ExaminationSpecialityController
    {
        private readonly DbContext _dbContext;

        public ExaminationSpecialityController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet("{examinationSpecialityId}")]
        public ExaminationSpeciality Get(long examinationSpecialityId)
        {
            return _dbContext.Set<ExaminationSpeciality>().Find(examinationSpecialityId);
        }

        [HttpGet]
        public IEnumerable<ExaminationSpeciality> List(
            [FromQuery] long? examinationDepartmentId,
            [FromQuery] long? yearSpecialityId,
            [FromQuery] long? semesterSpecialityId,
            [FromQuery] long? specialityId)
        {
            IQueryable<ExaminationSpeciality> query = _dbContext.Set<ExaminationSpeciality>();
            if (examinationDepartmentId != null)
            {
                query = query.Where(e => e.ExaminationDepartmentId == examinationDepartmentId);
            }

            if (yearSpecialityId != null)
            {
                query = query.Where(e => e.SemesterSpeciality.YearSpecialityId == yearSpecialityId);
            }

            if (semesterSpecialityId != null)
            {
                query = query.Where(e => e.SemesterSpecialityId == semesterSpecialityId);
            }

            if (specialityId != null)
            {
                query = query.Where(e => e.SemesterSpeciality.YearSpeciality.SpecialityId == specialityId);
            }

            return query.ToArray();
        }

        public ExaminationSpeciality _Add(ExaminationDepartment examinationDepartment,
            SemesterSpeciality semesterSpeciality)
        {
            Assert.RequireNonNull(examinationDepartment, nameof(examinationDepartment));
            Assert.RequireNonNull(semesterSpeciality, nameof(semesterSpeciality));

            if (!examinationDepartment.SemesterDepartment.Equals(semesterSpeciality.SemesterDepartment))
            {
                throw new IncompatibleEntityException(examinationDepartment, semesterSpeciality);
            }

            if (Contains(examinationDepartment, semesterSpeciality))
            {
                throw new DuplicateObjectException("DUPLICATE_EXAMINATION_SPECIALITY");
            }

            ExaminationSpeciality examinationSpeciality = new ExaminationSpeciality
            {
                ExaminationDepartment = examinationDepartment,
                SemesterSpeciality = semesterSpeciality
            };

            return examinationSpeciality;
        }


        public void Delete(ExaminationSpeciality examinationSpeciality)
        {
            _dbContext.Remove(examinationSpeciality);
            _dbContext.SaveChanges();
        }


        public bool Contains(ExaminationDepartment examinationDepartment, SemesterSpeciality semesterSpeciality)
        {
            return _dbContext.Set<ExaminationSpeciality>()
                .Any(e => examinationDepartment.Equals(e.ExaminationDepartment) &&
                          semesterSpeciality.Equals(e.SemesterSpeciality));
        }

        public ExaminationSpeciality Find(ExaminationDepartment examinationDepartment,
            SemesterSpeciality semesterSpeciality)
        {
            return _dbContext.Set<ExaminationSpeciality>()
                .FirstOrDefault(e => examinationDepartment.Equals(e.ExaminationDepartment) &&
                                     semesterSpeciality.Equals(e.SemesterSpeciality));
        }
    }
}