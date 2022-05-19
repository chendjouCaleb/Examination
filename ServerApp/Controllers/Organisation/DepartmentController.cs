using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Identity;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Models;
using Exam.Models.Statistics;
using Exam.Statistics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;


namespace Exam.Controllers
{
    [Route("api/departments")]
    public class DepartmentController : Controller
    {
        private readonly IRepository<Department, long> _departmentRepository;
        private readonly ILogger<DepartmentController> _logger;
        private readonly IConfiguration _configuration;
        private readonly DbContext _dbContext;

        public DepartmentController(IRepository<Department, long> departmentRepository,
            DbContext dbContext,
            ILogger<DepartmentController> logger,
            IConfiguration configuration)
        {
            _departmentRepository = departmentRepository;
            _configuration = configuration;
            _dbContext = dbContext;
            _logger = logger;
        }


        [LoadDepartment]
        [HttpGet("{departmentId}")]
        public Department Get(Department department, LoggedUser loggedUser)
        {
            Assert.RequireNonNull(department, nameof(department));
            
            if (!string.IsNullOrEmpty(loggedUser?.UserId))
            {
                department.IsPrincipalUser = department.PrincipalUserId == loggedUser.UserId;
                department.IsCorrector = _dbContext.Set<Corrector>()
                    .Any(c => c.UserId == loggedUser.UserId && c.DepartmentId == department.Id);
                
                department.IsSecretary = _dbContext.Set<Secretary>()
                    .Any(c => c.UserId == loggedUser.UserId && c.DepartmentId == department.Id);
                
                department.IsSupervisor = _dbContext.Set<Supervisor>()
                    .Any(c => c.UserId == loggedUser.UserId && c.DepartmentId == department.Id);
                
                department.IsPrincipal = _dbContext.Set<Principal>()
                    .Any(c => c.UserId == loggedUser.UserId && c.DepartmentId == department.Id);
                
                department.IsStudent = _dbContext.Set<Student>()
                    .Any(s => s.UserId != null && s.UserId == loggedUser.UserId && s.Level.DepartmentId == department.Id);
            }
            return department;
        }

        [RequireQueryParameter("schoolId")]
        [RequireQueryParameter("name")]
        [HttpGet("find/name")]
        public Department FindByName([FromQuery] long schoolId, [FromQuery] string name)
        {
            return _departmentRepository.First(d => schoolId == d.SchoolId && d.Name == name);
        }

        [RequireQueryParameter("schoolId")]
        [RequireQueryParameter("nameId")]
        [HttpGet("find/acronym")]
        public Department FindByAcronym([FromQuery] long schoolId, [FromQuery] string acronym)
        {
            return _departmentRepository.First(d => schoolId == d.SchoolId && d.Acronym == acronym);
        }

        public Department FindByName(School school, string name)
        {
            return _departmentRepository.First(d => school.Equals(d.School) && d.Name == name);
        }

        public Department FindByAcronym(School school, string acronym)
        {
            return _departmentRepository.First(d => school.Equals(d.School) && d.Acronym == acronym);
        }


        [LoadDepartment]
        [HttpGet("{departmentId}/statistics")]
        public DepartmentStatistics Get(Department department)
        {
            return new DepartmentStatisticsBuilder(_dbContext).GetStatistics(department);
        }

        [HttpGet]
        [RequireQueryParameter("schoolId")]
        [LoadSchool(Source = ParameterSource.Query)]
        public IEnumerable<Department> List(School school)
        {
            return _departmentRepository.List(d => d.SchoolId == school.Id);
        }

        [HttpPost]
        [RequireQueryParameter("schoolId")]
        [ValidModel]
        [LoadSchool(Source = ParameterSource.Query)]
        [IsDirector]
        public CreatedAtActionResult Add(School school, [FromBody] AddDepartmentForm form)
        {
            if (school == null)
            {
                throw new ArgumentNullException(nameof(school));
            }

            if (form == null)
            {
                throw new ArgumentNullException(nameof(form));
            }

            if (_departmentRepository.Exists(d => school.Equals(d.School) && d.Name == form.Name))
            {
                throw new InvalidValueException("{department.constraints.uniqueName}");
            }

            if (_departmentRepository.Exists(d => school.Equals(d.School) && d.Acronym == form.Acronym))
            {
                throw new InvalidValueException("{department.constraints.uniqueAcronym}");
            }

            Department department = new Department
            {
                School = school,
                Name = form.Name,
                Acronym = form.Acronym,
                Address = form.Address,
                PrincipalUserId = form.UserId
            };

            _departmentRepository.Save(department);
            return CreatedAtAction("Get", new {departmentId = department.Id}, department);
        }


        [HttpPut("{departmentId}")]
        [ValidModel]
        [LoadDepartment]
        [IsDepartmentPrincipal]
        public StatusCodeResult Edit(Department department, [FromBody] EditDepartmentForm form)
        {
            if (department == null)
            {
                throw new ArgumentNullException(nameof(department));
            }

            if (form == null)
            {
                throw new ArgumentNullException(nameof(form));
            }

            Department found = FindByName(department.School, form.Name);

            if (found != null && !found.Equals(department))
            {
                throw new InvalidValueException("{department.constraints.uniqueName}");
            }

            found = FindByAcronym(department.School, form.Acronym);

            if (found != null && !found.Equals(department))
            {
                throw new InvalidValueException("{department.constraints.uniqueAcronym}");
            }

            department.Name = form.Name;
            department.Address = form.Address;
            department.Acronym = form.Acronym;
            _departmentRepository.Update(department);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{departmentId}/principal")]
        [LoadDepartment(SchoolItemName = "school")]
        [IsDirector]
        public StatusCodeResult Principal(Department department, [FromForm] string userId)
        {
            if (department == null)
            {
                throw new ArgumentNullException(nameof(department));
            }

            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new ArgumentNullException(nameof(userId));
            }

            department.PrincipalUserId = userId;

            _departmentRepository.Update(department);
            _logger.LogInformation($"L'administrateur du département {department.Name} a été changé.");
            return StatusCode(StatusCodes.Status202Accepted);
        }


        [LoadDepartment]
        [HttpGet("{departmentId}/image")]
        public async Task<IActionResult> DownloadImage(Department department)
        {
            Assert.RequireNonNull(department, nameof(department));

            string path = Path.Combine(_configuration["File:Paths:DepartmentImages"], $"{department.Id}.png");
            Stream memory = new MemoryStream();

            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }

            memory.Position = 0;
            string mime = MimeTypes.GetMimeType(Path.GetExtension(path));
            return File(memory, mime);
        }


        [HttpPut("{departmentId}/image")]
        [LoadDepartment]
        [IsDepartmentPrincipal]
        public async Task<StatusCodeResult> ChangeImage(Department department, IFormFile image)
        {
            if (department == null)
            {
                throw new ArgumentNullException(nameof(department));
            }

            if (image == null)
            {
                throw new ArgumentNullException(nameof(image));
            }

            string fileName = department.Id + Path.GetExtension(image.FileName);

            string path = Path.Combine(_configuration["File:Paths:DepartmentImages"], fileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await image.CopyToAsync(stream).ConfigureAwait(false);
            }

            department.HasImage = true;

            _departmentRepository.Update(department);
            return Ok();
        }


        [LoadDepartment]
        [HttpGet("{departmentId}/coverImage")]
        public async Task<IActionResult> DownloadCoverImage(Department department)
        {
            Assert.RequireNonNull(department, nameof(department));

            string path = Path.Combine(_configuration["File:Paths:DepartmentCoverImages"], $"{department.Id}.png");
            Stream memory = new MemoryStream();

            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }

            memory.Position = 0;
            string mime = MimeTypes.GetMimeType(Path.GetExtension(path));
            return File(memory, mime);
        }


        [HttpPut("{departmentId}/coverImage")]
        [LoadDepartment]
        [IsDepartmentPrincipal]
        public async Task<StatusCodeResult> ChangeCoverImage(Department department, IFormFile image)
        {
            if (department == null)
            {
                throw new ArgumentNullException(nameof(department));
            }

            if (image == null)
            {
                throw new ArgumentNullException(nameof(image));
            }

            string fileName = department.Id + Path.GetExtension(image.FileName);

            string path = Path.Combine(_configuration["File:Paths:DepartmentCoverImages"], fileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await image.CopyToAsync(stream).ConfigureAwait(false);
            }

            department.HasCoverImage = true;

            _departmentRepository.Update(department);
            return Ok();
        }


        [HttpDelete("{departmentId}")]
        [LoadDepartment(SchoolItemName = "school")]
        [IsDirector]
        public NoContentResult Delete(Department department)
        {
            _departmentRepository.Delete(department);
            return NoContent();
        }
    }
}