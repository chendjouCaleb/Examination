using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    [Route("api/examinationSpecialities")]
    public class ExaminationSpecialityController
    {
        private readonly IRepository<ExaminationSpeciality, long> _repository;
        private readonly IRepository<Speciality, long> _specialityRepository;

        public ExaminationSpecialityController(IRepository<ExaminationSpeciality, long> repository,
            IRepository<Speciality, long> specialityRepository)
        {
            _repository = repository;
            _specialityRepository = specialityRepository;
        }


        [HttpGet("{examinationSpecialityId}")]
        public ExaminationSpeciality Get(long examinationSpecialityId)
        {
            return _repository.Find(examinationSpecialityId);
        }

        [HttpGet]
        public IEnumerable<ExaminationSpeciality> List([FromQuery] long? examinationId,
            [FromQuery] long? examinationDepartmentId,
            [FromQuery] long? specialityId)
        {
            if (examinationId != null)
            {
                return _repository.List(e => e.ExaminationDepartment.ExaminationId == examinationId);
            }
            
            if (examinationDepartmentId != null)
            {
                return _repository.List(e => e.ExaminationDepartmentId == examinationDepartmentId);
            }

            if (specialityId != null)
            {
                return _repository.List(e => e.SpecialityId == specialityId);
            }

            return new ExaminationSpeciality[0];
        }

        public ExaminationSpeciality _Add(ExaminationDepartment examinationDepartment, Speciality speciality)
        {
            Assert.RequireNonNull(examinationDepartment, nameof(speciality));
            Assert.RequireNonNull(speciality, nameof(speciality));

            if (!examinationDepartment.Department.Equals(speciality.Department))
            {
                throw new IncompatibleEntityException<ExaminationDepartment, Speciality>(examinationDepartment,
                    speciality);
            }

            ExaminationSpeciality examinationSpeciality = _repository
                .First(e => examinationDepartment.Equals(e.ExaminationDepartment) && speciality.Equals(e.Speciality));

            if (examinationSpeciality == null)
            {
                examinationSpeciality = new ExaminationSpeciality
                {
                    ExaminationDepartment = examinationDepartment,
                    Speciality = speciality
                };

                //_repository.Save(examinationSpeciality);
            }

            return examinationSpeciality;
        }


        public void Delete(ExaminationSpeciality examinationSpeciality)
        {
            _repository.Delete(examinationSpeciality);
        }
    }
}