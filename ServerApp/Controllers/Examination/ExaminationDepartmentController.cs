using System.Collections.Generic;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
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
        public IEnumerable<ExaminationDepartment> List([FromQuery] long? examinationId, [FromQuery] long? departmentId)
        {
            if (examinationId != null)
            {
                return _repository.List(e => e.ExaminationId == examinationId);
            }

            if (departmentId != null)
            {
                return _repository.List(e => e.DepartmentId == departmentId);
            }

            return new ExaminationDepartment[0];
        }


        public ExaminationDepartment _Add(Examination examination, Department department)
        {
            Assert.RequireNonNull(examination, nameof(department));
            Assert.RequireNonNull(department, nameof(department));

            if (!examination.School.Equals(department.School))
            {
                throw new IncompatibleEntityException<Examination, Department>(examination, department);
            }

            ExaminationDepartment examinationDepartment = _repository
                .First(e => examination.Equals(e.Examination) && department.Equals(e.Department));

            if (examinationDepartment == null)
            {
                examinationDepartment = new ExaminationDepartment
                {
                    Examination = examination,
                    Department = department
                };

                //_repository.Save(examinationDepartment);
            }

            return examinationDepartment;
        }


        public void Delete(ExaminationDepartment examinationDepartment)
        {
            _repository.Delete(examinationDepartment);
        }
    }
}