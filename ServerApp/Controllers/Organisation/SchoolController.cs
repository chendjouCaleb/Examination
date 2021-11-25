using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Exam.Authorizers;
using Exam.Destructors;
using Exam.Entities;
using Exam.Exceptions;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Models;
using Exam.Models.Statistics;
using Exam.Persistence.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    [Route("api/schools")]
    public class SchoolController : ControllerBase
    {
        private ISchoolRepository _schoolRepository;
        private MemberController _memberController;
        private ILogger<SchoolController> _logger;
        private SchoolDestructor _schoolDestructor;
        private DbContext _dbContext;
        private IConfiguration _configuration;


        public SchoolController(ISchoolRepository schoolRepository, MemberController memberController,
            SchoolDestructor schoolDestructor, DbContext dbContext,
            ILogger<SchoolController> logger, IConfiguration configuration)
        {
            _schoolRepository = schoolRepository;
            _memberController = memberController;
            _logger = logger;
            _configuration = configuration;
            _schoolDestructor = schoolDestructor;
            _dbContext = dbContext;
        }

        [HttpGet("{schoolId}")]
        [LoadSchool]
        public School Find(School school, User user)
        {
            Get(school, user);
            school.Statistics = Statistics(school);
            return school;
        }

        [HttpGet("find/identifier/{identifier}")]
        public School FindByIdentifier(string identifier, User user)
        {
            School school = _schoolRepository.First(o => o.Identifier == identifier);
            Get(school, user);
            return school;
        }

        public School Get(School school, User user)
        {
            if (user != null && !string.IsNullOrEmpty(user?.Id))
            {
                school.IsPrincipalUser = school.PrincipalUserId == user.Id;
                school.IsPlanner = _dbContext.Set<Planner>()
                    .Any(c => c.UserId == user.Id && c.SchoolId == school.Id);
            }
            
            school.ImageUrl =
                new Uri($"{Request.Scheme}://{Request.Host}{Request.PathBase}/api/schools/{school.Id}.png");

            return school;
        }

        [HttpGet]
        public IEnumerable<School> List([FromQuery] int start = 0, [FromQuery] int take = 20)
        {
            IQueryable<School> queryable = _schoolRepository.Set.Skip(start).Take(take);
            return queryable.ToList();
        }

        [HttpGet("{schoolId}/statistics")]
        [LoadSchool]
        public SchoolStatistics Statistics(School school)
        {
            return _schoolRepository.Statistics(school);
        }

        /// <summary>
        /// Create a new School
        /// </summary>
        /// <param name="form">Information of a school to create.</param>
        /// <param name="user">The user who creates the school. This user will be the admin of the created school.</param>
        /// <returns>A <see cref="CreatedAtActionResult"/> containing the created <see cref="School"/> as <c>Value</c>.
        /// </returns>
        /// <exception cref="UniqueValueException">When the given identifier is already used by another school.</exception>
        [HttpPost]
        [ValidModel]
        public CreatedAtActionResult Add([FromBody] SchoolForm form, User user)
        {
            Assert.RequireNonNull(form, nameof(form));
            Assert.RequireNonNull(user, nameof(user));


            if (_schoolRepository.Exists(o => o.Identifier == form.Identifier))
            {
                throw new UniqueValueException("{school.constraints.uniqueIdentifier}");
            }

            School school = new School
            {
                Name = form.Name,
                Identifier = form.Identifier,
                Address = form.Address,
                RegisterUserId = user.Id,
                PrincipalUserId = user.Id,
                Acronym = form.Acronym
            };

            school = _schoolRepository.Save(school);

            Member principal = _memberController._Add(school, user.Id);
            school.Principal = principal;

            _schoolRepository.Update(school);

            _logger.LogInformation($"New school: {school}");
            return CreatedAtAction("Find", new {school.Id}, school);
        }


        [HttpPut("{schoolId}/principal")]
        [LoadSchool]
        [IsDirector]
        public StatusCodeResult ChangePrincipalUserId(School school, [FromForm] string userId)
        {
            Assert.RequireNonNull(school, nameof(school));
            Assert.RequireNonNull(userId, nameof(userId));

            school.PrincipalUserId = userId;
            _schoolRepository.Update(school);

            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpPut("{schoolId}")]
        [ValidModel]
        [LoadSchool]
        [IsDirector]
        public AcceptedResult Update(School school, [FromBody] SchoolInfoForm form)
        {
            Assert.RequireNonNull(school, nameof(school));
            Assert.RequireNonNull(form, nameof(form));

            school.Name = form.Name;
            school.Address = form.Address;
            school.Acronym = form.Acronym;

            _schoolRepository.Update(school);

            return Accepted(school);
        }


        [HttpPut("{schoolId}/identifier")]
        [LoadSchool]
        [IsDirector]
        public StatusCodeResult ChangeIdentifier(School school, [FromQuery] string identifier)
        {
            Assert.RequireNonNull(school, nameof(school));
            if (string.IsNullOrWhiteSpace(identifier))
            {
                throw new ArgumentNullException(nameof(identifier));
            }

            if (_schoolRepository.Exists(e => e.Identifier == identifier))
            {
                throw new InvalidValueException("{school.constraints.uniqueIdentifier}");
            }

            school.Identifier = identifier;

            _schoolRepository.Update(school);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [LoadSchool]
        [HttpGet("{schoolId}/image")]
        public async Task<IActionResult> DownloadImage(School school)
        {
            Assert.RequireNonNull(school, nameof(school));

            string path = Path.Combine(_configuration["File:Paths:SchoolImages"], $"{school.Id}.png");
            Stream memory = new MemoryStream();

            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }

            memory.Position = 0;
            string mime = MimeTypes.GetMimeType(Path.GetExtension(path));
            return File(memory, mime);
        }


        [HttpPut("{schoolId}/image")]
        [LoadSchool]
        [IsDirector]
        public async Task<StatusCodeResult> ChangeImage(School school, IFormFile image)
        {
            if (school == null)
            {
                throw new ArgumentNullException(nameof(school));
            }

            if (image == null)
            {
                throw new ArgumentNullException(nameof(image));
            }

            string fileName = school.Id + Path.GetExtension(image.FileName);

            string path = Path.Combine(_configuration["File:Paths:SchoolImages"], fileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await image.CopyToAsync(stream).ConfigureAwait(false);
            }

            school.HasImage = true;

            _schoolRepository.Update(school);
            return Ok();
        }


        [LoadSchool]
        [HttpGet("{schoolId}/coverImage")]
        public async Task<IActionResult> DownloadCoverImage(School school)
        {
            Assert.RequireNonNull(school, nameof(school));

            string path = Path.Combine(_configuration["File:Paths:SchoolCoverImages"], $"{school.Id}.png");
            Stream memory = new MemoryStream();

            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }

            memory.Position = 0;
            string mime = MimeTypes.GetMimeType(Path.GetExtension(path));
            return File(memory, mime);
        }


        [HttpPut("{schoolId}/coverImage")]
        [LoadSchool]
        [IsDirector]
        public async Task<StatusCodeResult> ChangeCoverImage(School school, IFormFile image)
        {
            if (school == null)
            {
                throw new ArgumentNullException(nameof(school));
            }

            if (image == null)
            {
                throw new ArgumentNullException(nameof(image));
            }

            string fileName = school.Id + Path.GetExtension(image.FileName);

            string path = Path.Combine(_configuration["File:Paths:SchoolCoverImages"], fileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await image.CopyToAsync(stream).ConfigureAwait(false);
            }

            school.HasCoverImage = true;

            _schoolRepository.Update(school);
            return Ok();
        }


        [HttpDelete("{schoolId}")]
        [LoadSchool]
        [IsDirector]
        public NoContentResult Delete(School school)
        {
            Assert.RequireNonNull(school, nameof(school));
            string imagePath = Path.Combine(_configuration["File:Paths:SchoolImages"], $"{school.Id}.png");
            string coverImagePath = Path.Combine(_configuration["File:Paths:SchoolCoverImages"], $"{school.Id}.png");

            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }

            if (System.IO.File.Exists(coverImagePath))
            {
                System.IO.File.Delete(coverImagePath);
            }

            _schoolDestructor.Destruct(school);
            //_schoolRepository.Delete(school);
            return NoContent();
        }
    }
}