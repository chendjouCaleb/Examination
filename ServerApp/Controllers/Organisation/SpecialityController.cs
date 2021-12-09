using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Exceptions;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    [Route("api/specialities")]
    public class SpecialityController : Controller
    {
        private IRepository<Speciality, long> _specialityRepository;
        private IRepository<Level, long> _levelRepository;
        private LevelSpecialityController _levelSpecialityController;
        private ILogger<SpecialityController> _logger;

        public SpecialityController(IRepository<Speciality, long> specialityRepository,
            IRepository<Level, long> levelRepository,
            LevelSpecialityController levelSpecialityController,
            ILogger<SpecialityController> logger)
        {
            _specialityRepository = specialityRepository;
            _levelRepository = levelRepository;
            _levelSpecialityController = levelSpecialityController;
            _logger = logger;
        }

        [HttpGet("{specialityId}")]
        [LoadSpeciality]
        public Speciality Get(Speciality speciality)
        {
            return speciality;
        }

        [HttpGet("find/name")]
        [RequireQueryParameter("departmentId")]
        [RequireQueryParameter("name")]
        [LoadDepartment(Source = ParameterSource.Query)]
        public Speciality Find([FromQuery] long departmentId, [FromQuery] string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return _specialityRepository.First(s => departmentId == s.DepartmentId && s.Name == name);
            }

            return null;
        }

        public Speciality FindByName(Department department, string name)
        {
            Assert.RequireNonNull(department, name);

            return _specialityRepository.First(s => department.Equals(s?.Department) && s?.Name == name);
        }

        [HttpGet]
        [RequireQueryParameter("departmentId")]
        [LoadDepartment(Source = ParameterSource.Query)]
        public IEnumerable<Speciality> List(Department department)
        {
            Assert.RequireNonNull(department, nameof(department));
            return _specialityRepository.List(s => department.Equals(s.Department));
        }


        [HttpPost]
        [RequireQueryParameter("departmentId")]
        [ValidModel]
        [LoadDepartment(Source = ParameterSource.Query)]
        [IsDepartmentPrincipal]
        public CreatedAtActionResult Add(Department department, [FromQuery] long[] levelId,
            [FromBody] SpecialityForm form)
        {
            Speciality speciality = Add(department, form);

            foreach (var id in levelId)
            {
                Level level = _levelRepository.Find(id);
                _levelSpecialityController.Add(level, speciality);
            }

            return CreatedAtAction("Get", new {SpecialityId = speciality.Id}, speciality);
        }


        public Speciality Add(Department department, [FromBody] SpecialityForm form)
        {
            Assert.RequireNonNull(department, nameof(department));

            if (FindByName(department, form.Name) != null)
            {
                throw new UniqueValueException("{speciality.constraints.uniqueName}");
            }

            Speciality speciality = new Speciality
            {
                Name = form.Name,
                Description = form.Description,
                Department = department
            };

            _specialityRepository.Save(speciality);

            _logger.LogInformation($"New Speciality: {speciality}");

            return speciality;
        }


        [HttpPut("{specialityId}")]
        [ValidModel]
        [LoadSpeciality(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public AcceptedResult Edit(Speciality speciality, [FromBody] SpecialityEditForm form)
        {
            Assert.RequireNonNull(speciality, nameof(speciality));
            Assert.RequireNonNull(form, nameof(form));

            Speciality found = FindByName(speciality.Department, form.Name);

            if (found != null && !found.Equals(speciality))
            {
                throw new UniqueValueException("{speciality.constraints.uniqueName}");
            }

            speciality.Name = form.Name;
            speciality.Description = form.Description;
            _specialityRepository.Update(speciality);

            _logger.LogInformation($"Speciality Updated: {speciality}");

            return Accepted(speciality);
        }


        [HttpDelete("{specialityId}")]
        [LoadSpeciality(DepartmentItemName = "department")]
        [IsDepartmentPrincipal]
        public NoContentResult Delete(Speciality speciality)
        {
            Assert.RequireNonNull(speciality, nameof(speciality));
            _specialityRepository.Delete(speciality);

            return NoContent();
        }
    }
}