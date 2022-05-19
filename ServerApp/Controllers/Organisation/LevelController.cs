using System;
using System.Collections.Generic;
using System.Linq;
using Castle.Core.Internal;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Destructors;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Persistence.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    [Route("api/levels")]
    public class LevelController : Controller
    {
        private IRepository<Level, long> _levelRepository;
        private ISpecialityRepository _specialityRepository;
        private LevelSpecialityController _levelSpecialityController;
        private LevelDestructor _levelDestructor;
        private ILogger<LevelController> _logger;


        public LevelController(IRepository<Level, long> levelRepository,
            ISpecialityRepository specialityRepository,
            LevelSpecialityController levelSpecialityController,
            LevelDestructor levelDestructor,
            ILogger<LevelController> logger)
        {
            _levelRepository = levelRepository;
            _specialityRepository = specialityRepository;
            _levelSpecialityController = levelSpecialityController;
            _levelDestructor = levelDestructor;
            _logger = logger;
        }


        [HttpGet("{levelId}")]
        [LoadLevel]
        public Level Get(Level level)
        {
            return level;
        }

        [HttpGet]
        public IEnumerable<Level> List([FromQuery] long? schoolId, [FromQuery] long[]? departmentId)
        {
            IQueryable<Level> query = _levelRepository.Set;

            if (schoolId != null)
            {
                query = query.Where(l => l.Department.SchoolId == schoolId);
            }

            if (departmentId != null && !departmentId.IsNullOrEmpty())
            {
                query = query.Where(l => departmentId.Contains(l.DepartmentId));
            }

            return query.ToList();
        }


        [HttpPost]
        [RequireQueryParameter("departmentId")]
        [LoadDepartment(Source = ParameterSource.Query)]
        [IsDepartmentPrincipal]
        public CreatedAtActionResult Add(Department department, [FromQuery] long[] specialityId)
        {
            Level level = Add(department);

            foreach (var id in specialityId)
            {
                Speciality speciality = _specialityRepository.Find(id);
                _levelSpecialityController.Add(level, speciality);
            }

            return CreatedAtAction("Get", new {LevelId = level.Id}, level);
        }

        /// <summary>
        /// Pour ajouter un niveau à un département.
        /// Le rang d'un niveau ajouté est celui du niveau de rang le plus élevée du département + 1
        /// autrement dit, c'est le nombre de niveau du département.
        /// 
        /// Après l'ajout le nouveau niveau devient le dernier niveau du département.
        /// </summary>
        /// <param name="department"></param>
        /// <returns></returns>
        public Level Add(Department department)
        {
            Assert.RequireNonNull(department, nameof(department));

            Level level = new Level
            {
                Index = (int) _levelRepository.Count(l => department.Equals(l.Department)),
                Department = department
            };

            _levelRepository.Save(level);

            _logger.LogInformation("Level created: " + level);

            return level;
        }


        /// <summary>
        /// Supprime un niveau.
        /// Seul le dernier niveau d'un département peut être supprimé.
        /// </summary>
        /// <param name="level">Le niveau à supprimer.</param>
        /// <returns> Un <see cref="NoContentResult"/> Si le niveau est supprimé. </returns>
        /// 
        /// <exception cref="InvalidOperationException">Si le niveau à supprimer n'est pas le dernier du département.
        /// </exception>
        [HttpDelete("{levelId}")]
        [LoadLevel(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public NoContentResult Delete(Level level)
        {
            if (level == null)
            {
                throw new ArgumentNullException(nameof(level));
            }

            int lastIndex = (int) _levelRepository.Count(l => level.Department.Equals(l.Department));

            if (level.Index != lastIndex - 1)
            {
                throw new InvalidOperationException("{level.constraints.DeleteOnlyLastLevel}");
            }

            _levelDestructor.Destroy(level);

            _logger.LogInformation("Level deleted: " + level);
            return NoContent();
        }
    }
}