using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    [Route("api/examinationDepartments")]
    public class ExaminationDepartmentController
    {
        private readonly IRepository<ExaminationDepartment, long> _repository;

        public ExaminationDepartmentController(IRepository<ExaminationDepartment, long> repository)
        {
            _repository = repository;
        }

        [HttpGet("{examinationDepartmentId}")]
        public ExaminationDepartment Get(long examinationDepartmentId)
        {
            return _repository.Find(examinationDepartmentId);
        }

        [HttpGet]
        public IEnumerable<ExaminationDepartment> List(
            [FromQuery] long? examinationId,
            [FromQuery] long? yearDepartmentId,
            [FromQuery] long? semesterDepartmentId,
            [FromQuery] long? departmentId)
        {
            var query = _repository.Set;

            if (examinationId != null)
            {
                query = query.Where(e => e.ExaminationId == examinationId);
            }

            if (yearDepartmentId != null)
            {
                query = query.Where(e => e.SemesterDepartment.YearDepartmentId == yearDepartmentId);
            }

            if (semesterDepartmentId != null)
            {
                query = query.Where(e => e.SemesterDepartmentId == yearDepartmentId);
            }

            if (departmentId != null)
            {
                query = query.Where(e => e.SemesterDepartment.YearDepartment.DepartmentId == departmentId);
            }

            return new ExaminationDepartment[0];
        }


        public ExaminationDepartment _Add(Examination examination, SemesterDepartment semesterDepartment)
        {
            Assert.RequireNonNull(examination, nameof(examination));
            Assert.RequireNonNull(semesterDepartment, nameof(semesterDepartment));

            if (!examination.Semester.Equals(semesterDepartment.Semester))
            {
                throw new IncompatibleEntityException(examination, semesterDepartment);
            }

            if (Contains(examination, semesterDepartment))
            {
                throw new DuplicateObjectException("DUPLICATE_EXAMINATION_DEPARTMENT");
            }

            ExaminationDepartment examinationDepartment = new ExaminationDepartment
            {
                Examination = examination,
                SemesterDepartment = semesterDepartment
            };

            return examinationDepartment;
        }

        public ExaminationDepartment Find(Examination examination, SemesterDepartment semesterDepartment)
        {
            return _repository.First(
                e => examination.Equals(e.Examination) && semesterDepartment.Equals(e.SemesterDepartment));
        }

        public bool Contains(Examination examination, SemesterDepartment semesterDepartment)
        {
            return _repository.Exists(
                e => examination.Equals(e.Examination) && semesterDepartment.Equals(e.SemesterDepartment));
        }

        public void Delete(ExaminationDepartment examinationDepartment)
        {
            _repository.Delete(examinationDepartment);
        }
    }
}