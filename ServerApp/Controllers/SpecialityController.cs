using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Filters;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    [Route("api/specialities")]
    public class SpecialityController:Controller
    {
        private readonly IRepository<Speciality, long> _specialityRepository;
        private readonly IRepository<Examination, long> _examinationRepository;
        private readonly ILogger<SpecialityController> _logger;


        public SpecialityController(IRepository<Speciality, long> specialityRepository,
            IRepository<Examination, long> examinationRepository, ILogger<SpecialityController> logger)
        {
            _specialityRepository =
                specialityRepository ?? throw new ArgumentNullException(nameof(specialityRepository));
            _examinationRepository =
                examinationRepository ?? throw new ArgumentNullException(nameof(examinationRepository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }


        [HttpGet("{specialityId}")]
        [LoadSpeciality]
        public Speciality Find(Speciality speciality) => speciality;

        [HttpGet]
        [LoadExamination(Source = ParameterSource.Query)]
        public IEnumerable<Speciality> List(Examination examination)
        {
            if (examination != null)
            {
                return examination.Specialities;
            }

            return new Speciality[] {};
        }


        [HttpPost]
        [LoadExamination(Source = ParameterSource.Query)]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        public CreatedAtActionResult Add(Examination examination, [FromBody] SpecialityForm form)
        {
            if(_specialityRepository.Exists(s => examination.Equals( s.Examination) && s.Name == form.Name))
            {
                throw new InvalidValueException("{speciality.constraints.uniqueNameByExamination}");
            }
            Speciality speciality = new Speciality
            {
                Name = form.Name,
                Examination = examination
            };

            speciality = _specialityRepository.Save(speciality);

            _logger.LogInformation($"New speciality: {speciality}");
            examination.SpecialityCount += 1;
            _examinationRepository.Update(examination);
            return CreatedAtAction("Find", new { speciality.Id}, speciality);
        }
        
        
        [HttpPut("{specialityId}/name")]
        [LoadSpeciality(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        public StatusCodeResult ChangeName(Speciality speciality, string name)
        {
            if (speciality == null)
            {
                throw new ArgumentNullException(nameof(speciality));
            }
            
            if(_specialityRepository.Exists(s => speciality.Examination.Equals( s.Examination) && s.Name == name))
            {
                throw new InvalidValueException("{speciality.constraints.uniqueNameByExamination}");
            }

            speciality.Name = name;
            _specialityRepository.Update(speciality);

            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpDelete("{specialityId")]
        [LoadSpeciality(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        public NoContentResult Delete(Speciality speciality)
        {
            Assert.RequireNonNull(speciality, nameof(speciality));
            speciality.Examination.SpecialityCount -= 1;
            _examinationRepository.Update(speciality.Examination);
            
            _specialityRepository.Delete(speciality);
            return NoContent() ;
        }

    }
}