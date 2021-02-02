using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    [Route("api/examinationLevelSpecialities")]
    public class ExaminationLevelSpecialityController
    {
        private readonly IRepository<ExaminationLevelSpeciality, long> _repository;
        private readonly IRepository<ExaminationSpeciality, long> _examinationSpecialityRepository;
        private readonly IRepository<LevelSpeciality, long> _levelSpecialityRepository;


        public ExaminationLevelSpecialityController(IRepository<ExaminationLevelSpeciality, long> repository,
            IRepository<ExaminationSpeciality, long> examinationSpecialityRepository,
            IRepository<LevelSpeciality, long> levelSpecialityRepository)
        {
            _repository = repository;
            _examinationSpecialityRepository = examinationSpecialityRepository;
            _levelSpecialityRepository = levelSpecialityRepository;
        }


        [HttpGet("{examinationLevelSpecialityId}")]
        public ExaminationLevelSpeciality Get(long examinationLevelSpecialityId)
        {
            return _repository.Find(examinationLevelSpecialityId);
        }

        [HttpGet]
        public IEnumerable<ExaminationLevelSpeciality> List([FromQuery] long? examinationLevelId,
            [FromQuery] long? examinationSpecialityId)
        {
            if (examinationLevelId != null)
            {
                return _repository.List(e => e.ExaminationLevelId == examinationLevelId);
            }

            if (examinationSpecialityId != null)
            {
                return _repository.List(e => e.ExaminationSpecialityId == examinationSpecialityId);
            }

            return new ExaminationLevelSpeciality[0];
        }

        public List<ExaminationLevelSpeciality> Add(ExaminationLevel examinationLevel)
        {
            Assert.RequireNonNull(examinationLevel, nameof(examinationLevel));
            Assert.RequireNonNull(examinationLevel.ExaminationDepartment,
                nameof(examinationLevel.ExaminationDepartment));


            return _examinationSpecialityRepository
                .List(e => examinationLevel.ExaminationDepartment.Equals(e.ExaminationDepartment))
                .Select(e => Add(examinationLevel, e))
                .Where(t => t != null)
                .ToList();
        }

        public List<ExaminationLevelSpeciality> Add(ExaminationLevel examinationLevel, Speciality speciality)
        {
            Assert.RequireNonNull(examinationLevel, nameof(examinationLevel));
            Assert.RequireNonNull(speciality, nameof(speciality));

            return _examinationSpecialityRepository
                .List(e => speciality.Equals(e.Speciality) &&
                           examinationLevel.ExaminationDepartment.Equals(e.ExaminationDepartment)
                )
                .Select(e => Add(examinationLevel, e))
                .Where(t => t != null)
                .ToList();
        }

        public ExaminationLevelSpeciality Add(ExaminationLevel examinationLevel,
            ExaminationSpeciality examinationSpeciality)
        {
            ExaminationLevelSpeciality examinationLevelSpeciality = _Add(examinationLevel, examinationSpeciality);


            return examinationLevelSpeciality;
        }


        public ExaminationLevelSpeciality _Add(ExaminationLevel examinationLevel,
            ExaminationSpeciality examinationSpeciality, LevelSpeciality levelSpeciality)
        {
            Assert.RequireNonNull(examinationLevel, nameof(examinationLevel));
            Assert.RequireNonNull(levelSpeciality, nameof(levelSpeciality));

            if (!examinationLevel.Level.Equals(levelSpeciality.Level))
            {
                throw new IncompatibleEntityException(examinationLevel, levelSpeciality);
            }

            if (!examinationSpeciality.Speciality.Equals(levelSpeciality.Speciality))
            {
                throw new IncompatibleEntityException(examinationSpeciality, levelSpeciality);
            }

            ExaminationLevelSpeciality examinationLevelSpeciality = _repository
                .First(e => examinationLevel.Equals(e.ExaminationLevel) &&
                            levelSpeciality.Equals(e.LevelSpeciality));

            if (examinationLevelSpeciality != null)
            {
                return examinationLevelSpeciality;
            }


            examinationLevelSpeciality = new ExaminationLevelSpeciality
            {
                LevelSpeciality = levelSpeciality,
                ExaminationLevel = examinationLevel,
                ExaminationSpeciality = examinationSpeciality
            };

            //_repository.Save(examinationLevelSpeciality);

            return examinationLevelSpeciality;
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

            LevelSpeciality levelSpeciality = _levelSpecialityRepository.First(l =>
                l.SpecialityId == examinationSpeciality.SpecialityId && l.LevelId == examinationLevel.LevelId);

            if (levelSpeciality == null)
            {
                return null;
            }

            ExaminationLevelSpeciality examinationLevelSpeciality = _repository
                .First(e => examinationLevel.Equals(e.ExaminationLevel) &&
                            examinationSpeciality.Equals(e.ExaminationSpeciality));

            if (examinationLevelSpeciality == null)
            {
                examinationLevelSpeciality = new ExaminationLevelSpeciality
                {
                    ExaminationLevel = examinationLevel,
                    ExaminationSpeciality = examinationSpeciality,
                    LevelSpeciality = levelSpeciality
                };

                //_repository.Save(examinationLevelSpeciality);
            }

            return examinationLevelSpeciality;
        }


        public void Delete(ExaminationLevelSpeciality examinationLevelSpeciality)
        {
            _repository.Delete(examinationLevelSpeciality);
        }
    }
}