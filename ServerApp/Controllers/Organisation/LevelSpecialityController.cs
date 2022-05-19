using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Destructors;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Loaders;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    [Route("api/levelSpecialities")]
    public class LevelSpecialityController : Controller
    {
        private IRepository<LevelSpeciality, long> _levelSpecialityRepository;
        private ILogger<LevelSpecialityController> _logger;
        private LevelSpecialityDestructor _levelSpecialityDestructor;

        public LevelSpecialityController(IRepository<LevelSpeciality, long> levelSpecialityRepository,
            LevelSpecialityDestructor levelSpecialityDestructor,
            ILogger<LevelSpecialityController> logger)
        {
            _levelSpecialityRepository = levelSpecialityRepository;
            _levelSpecialityDestructor = levelSpecialityDestructor;
            _logger = logger;
        }


        [HttpGet("{levelSpecialityId}")]
        [LoadLevelSpeciality]
        public LevelSpeciality Get(LevelSpeciality levelSpeciality)
        {
            return levelSpeciality;
        }

        [HttpGet]
        public IEnumerable<LevelSpeciality> List([FromQuery] long? levelId, [FromQuery] long? specialityId)
        {
            if (levelId != null)
            {
                return _levelSpecialityRepository.List(l => levelId.Value == l.LevelId);
            }

            if (specialityId != null)
            {
                return _levelSpecialityRepository.List(l => specialityId.Value == l.SpecialityId);
            }

            throw new InvalidOperationException("You must provided levelId or specialityId in query paramter");
        }



        /// <summary>
        /// Pour ajouter une specialité à un niveau.
        /// 
        /// </summary>
        /// <param name="level">Le niveau auquel on ajoute la spécialité</param>
        /// <param name="speciality">La spécialité à ajouter.</param>
        /// <returns> Un <see cref="ObjectResult"/> Si la spécialité à déjà été ajouté au niveau,
        /// ou un <see cref="CreatedAtActionResult"/> contenant un <see cref="LevelSpeciality"/> en valeur
        /// Si la spécialité est ajoutée. </returns>
        [HttpPost]
        [RequireQueryParameter("levelId")]
        [RequireQueryParameter("specialityId")]
        [LoadLevel(Source = ParameterSource.Query, DepartmentItemName = "department")]
        [LoadSpeciality(Source = ParameterSource.Query)]
        [IsDepartmentPrincipal]
        public ObjectResult Add(Level level, Speciality speciality)
        {
            Assert.RequireNonNull(speciality, nameof(speciality));
            Assert.RequireNonNull(level, nameof(level));

            if (level.DepartmentId != speciality.DepartmentId)
            {
                throw new IncompatibleEntityException<Level, Speciality>(level, speciality);
            }

            LevelSpeciality levelSpeciality = _levelSpecialityRepository.First(ls => ls.SpecialityId == speciality.Id
                                                                                     && level.Id == ls.LevelId);

            if (levelSpeciality != null)
            {
                return Ok(levelSpeciality);
            }


            levelSpeciality = new LevelSpeciality
            {
                Level = level,
                Speciality = speciality
            };

            _levelSpecialityRepository.Save(levelSpeciality);

            _logger.LogInformation("LevelSpeciality created: " + levelSpeciality);

            return CreatedAtAction("Get", new {LevelSpecialityId = levelSpeciality.Id}, levelSpeciality);
        }


        [HttpDelete("{levelSpecialityId}")]
        [LoadLevelSpeciality(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public NoContentResult Delete(LevelSpeciality levelSpeciality)
        {
            if (levelSpeciality == null)
            {
                throw new ArgumentNullException(nameof(levelSpeciality));
            }

            _levelSpecialityDestructor.Destroy(levelSpeciality);

            _logger.LogInformation("LevelSpeciality deleted: " + levelSpeciality);
            return NoContent();
        }
    }
}