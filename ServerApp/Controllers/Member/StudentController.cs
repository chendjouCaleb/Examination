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
using Exam.Destructors;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    [Route("api/students")]
    public class StudentController : Controller
    {
        //private IRepository<Student, long> _studentRepository;
        private DbContext _dbContext;
        private IConfiguration _configuration;
        private ILogger<StudentController> _logger;
        private StudentDestructor _studentDestructor;

        public StudentController(
            IRepository<Student, long> studentRepository,
            StudentDestructor studentDestructor,
            DbContext dbContext,
            IConfiguration configuration,
            ILogger<StudentController> logger)
        {
            _studentDestructor = studentDestructor;
            _dbContext = dbContext;
            _configuration = configuration;
            _logger = logger;
        }


        [HttpGet("{studentId}")]
        [LoadStudent]
        public Student Get(Student student) => student;

        [HttpGet("find/registrationId")]
        [RequireQueryParameter("schoolId")]
        [RequireQueryParameter("registrationId")]
        public Task<Student> First(long schoolId, [FromQuery] string registrationId)
        {
            return _dbContext.Set<Student>().FirstOrDefaultAsync(s =>
                schoolId == s.Level.Department.SchoolId && registrationId == s.RegistrationId);
        }

        [HttpGet("count")]
        public long Count([FromQuery] long? levelId,
            [FromQuery] long? schoolId,
            [FromQuery] long? departmentId,
            [FromQuery] long? levelSpecialityId,
            [FromQuery] long? specialityId,
            [FromQuery] string userId)
        {
            IQueryable<Student> query = _dbContext.Set<Student>();
            if (levelId != null)
            {
                query = query.Where(s => s.LevelId == levelId);
            }

            if (levelSpecialityId != null)
            {
                query = query.Where(s => s.LevelSpecialityId == levelSpecialityId);
            }

            if (specialityId != null)
            {
                query = query.Where(s => s.LevelSpecialityId != null && s.LevelSpeciality.SpecialityId == specialityId);
            }

            if (departmentId != null)
            {
                query = query.Where(s => s.Level.DepartmentId == departmentId);
            }
            
            if (schoolId != null)
            {
                query = query.Where(s => s.Level.Department.SchoolId == schoolId);
            }

            if (!string.IsNullOrWhiteSpace(userId))
            {
                query = query.Where(s => s.UserId == userId);
            }

            return query.LongCount();
        }

        [HttpGet]
        public IEnumerable<Student> List([FromQuery] long? levelId,
            [FromQuery] long? schoolId,
            [FromQuery] long? departmentId,
            [FromQuery] long? levelSpecialityId,
            [FromQuery] long? specialityId,
            [FromQuery] string userId)
        {
            IQueryable<Student> query = _dbContext.Set<Student>();
            if (levelId != null)
            {
                return query.Where(s => s.LevelId == levelId);
            }

            if (levelSpecialityId != null)
            {
                return query.Where(s => s.LevelSpecialityId == levelSpecialityId);
            }

            if (specialityId != null)
            {
                return query.Where(s => s.LevelSpecialityId != null && s.LevelSpeciality.SpecialityId == specialityId);
            }

            if (departmentId != null)
            {
                return query.Where(s => s.Level.DepartmentId == departmentId);
            }
            
            if (schoolId != null)
            {
                return query.Where(s => s.Level.Department.SchoolId == schoolId);
            }

            if (!string.IsNullOrWhiteSpace(userId))
            {
                return query.Where(s => s.UserId == userId);
            }

            return new Student[] { };
        }


        [HttpPost]
        [ValidModel]
        [RequireQueryParameter("levelId")]
        [LoadLevel(Source = ParameterSource.Query, DepartmentItemName = "department")]
        [LoadLevelSpeciality(Source = ParameterSource.Query)]
        [IsPrincipal]
        public async Task<CreatedAtActionResult> Add([FromForm] StudentForm form, Level level,
            LevelSpeciality levelSpeciality, Principal principal)
        {
            Assert.RequireNonNull(principal, nameof(principal));
            Assert.RequireNonNull(form, nameof(form));
            Assert.RequireNonNull(level, nameof(level));
            Assert.RequireNonNull(level.Department, nameof(level.Department));
            Assert.RequireNonNull(level.Department.School, nameof(level.Department.School));

            if (levelSpeciality != null && !level.Equals(levelSpeciality.Level))
            {
                throw new IncompatibleEntityException<Level, LevelSpeciality>(level, levelSpeciality);
            }

            string registrationId = form.RegistrationId.ToUpper();
            
            if (await _dbContext.Set<Student>().AnyAsync(s =>
                level.Department.SchoolId == s.Level.Department.SchoolId && s.RegistrationId.ToLower() == registrationId.ToLower()))
            {
                throw new InvalidValueException("{student.constraints.uniqueRegistrationId}");
            }

            Student student = new Student
            {
                FullName = form.FullName,
                RegistrationId = registrationId,
                BirthDate = form.BirthDate,
                BirthPlace = form.BirthPlace,
                School = level.Department.School,
                Department = level.Department,
                Level = level,
                LevelSpeciality = levelSpeciality,
                RegisterUserId = principal.UserId,
                Gender = form.Gender,
                PhoneNumber = form.PhoneNumber,
                Email = form.Email,
                Address = form.Address
            };

            student = _dbContext.Add(student).Entity;
            await _dbContext.SaveChangesAsync();

            if (form.Image != null)
            {
                ChangeImage(student, form.Image);
            }

            _logger.LogInformation($"New Student: {student}");
            return CreatedAtAction("Get", new {student.Id}, student);
        }

        [HttpPut("{studentId}")]
        [ValidModel]
        [LoadStudent(DepartmentItemName = "department")]
        [IsPrincipal]
        public async Task<Student> Update(Student student, [FromBody] StudentFormInfo form)
        {
            student.BirthDate = form.BirthDate;
            student.FullName = form.FullName;
            student.Gender = form.Gender;
            student.BirthPlace = form.BirthPlace;

            _dbContext.Update(student);
            await _dbContext.SaveChangesAsync();
            return student;
        }


        [HttpPut("{studentId}/level")]
        [RequireQueryParameter("levelId")]
        [LoadStudent(DepartmentItemName = "department")]
        [LoadLevel(Source = ParameterSource.Query)]
        [LoadLevelSpeciality(Source = ParameterSource.Query)]
        [IsPrincipal]
        public async Task<StatusCodeResult> ChangeLevel(Student student, Level level, LevelSpeciality levelSpeciality = null)
        {
            Assert.RequireNonNull(student, nameof(student));
            Assert.RequireNonNull(level, nameof(level));

            if (student.Level.DepartmentId != level.DepartmentId)
            {
                throw new IncompatibleEntityException<Student, Level>(student, level);
            }

            if (levelSpeciality != null && level.Id != levelSpeciality.LevelId)
            {
                throw new IncompatibleEntityException(level, levelSpeciality);
            }

            student.School = level.Department.School;
            student.Department = level.Department;
            student.Level = level;
            student.LevelSpeciality = levelSpeciality;
            
            _dbContext.Update(student);
            await _dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpDelete("{studentId}/levelSpeciality")]
        [LoadStudent(DepartmentItemName = "department")]
        [LoadLevelSpeciality(Source = ParameterSource.Query)]
        [IsPrincipal]
        public async Task<StatusCodeResult> RemoveLevelSpeciality(Student student)
        {
            Assert.RequireNonNull(student, nameof(student));

            if (student.LevelSpeciality == null)
            {
                return StatusCode(StatusCodes.Status202Accepted);
            }

            student.LevelSpeciality = null;
            _dbContext.Update(student);
            await _dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{studentId}/registrationId")]
        [LoadStudent(DepartmentItemName = "department")]
        [IsPrincipal]
        public async Task<StatusCodeResult> ChangeRegistrationId(Student student, [FromQuery] string registrationId)
        {
            Assert.RequireNonNull(student, nameof(student));
            Assert.RequireNonNull(student.Level, nameof(student.Level));
            Assert.RequireNonNull(student.Level.Department, nameof(student.Level.Department));
            Assert.RequireNonNull(student.Level.Department.School, nameof(student.Level.Department.School));

            if (await _dbContext.Set<Student>().AnyAsync(s =>
                student.Level.Department.School.Equals(s.Level.Department.School) &&
                s.RegistrationId == registrationId))
            {
                throw new InvalidValueException("{student.constraints.uniqueRegistrationId}");
            }

            student.RegistrationId = registrationId;
            
            _dbContext.Update(student);
            await _dbContext.SaveChangesAsync();
            
            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{studentId}/userId")]
        [RequireQueryParameter("userId")]
        [LoadStudent(DepartmentItemName = "department")]
        [IsPrincipal]
        public async Task<StatusCodeResult> ChangeUserId(Student student, [FromQuery] string userId)
        {
            Assert.RequireNonNull(student, nameof(student));
            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new ArgumentNullException(nameof(userId));
            }

            if (await _dbContext.Set<Student>().AnyAsync(s =>
                student.Level.Department.School.Equals(s.Level.Department.School) && s.UserId == userId))
            {
                throw new InvalidValueException("{student.constraints.uniqueUserId}");
            }

            student.UserId = userId;

            _dbContext.Update(student);
            await _dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpDelete("{studentId}/userId")]
        [LoadStudent(DepartmentItemName = "department")]
        [IsPrincipal]
        public async Task<StatusCodeResult> RemoveUserId(Student student)
        {
            Assert.RequireNonNull(student, nameof(student));
            student.UserId = null;
            _dbContext.Update(student);
            await _dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status202Accepted);
        }
        
      
        [HttpGet("{studentId}/image")]
        public async Task<IActionResult> DownloadImage(long? studentId)
        {
            Assert.RequireNonNull(studentId, nameof(studentId));

            string path = Path.Combine(_configuration["File:Paths:StudentImages"], $"{studentId}.png");
            Stream memory = new MemoryStream();

            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }

            memory.Position = 0;
            string mime = MimeTypes.GetMimeType(Path.GetExtension(path));
            return File(memory, mime);
        }


        [HttpPut("{studentId}/image")]
        [LoadStudent(DepartmentItemName = "department")]
        [IsPrincipal]
        public async Task<StatusCodeResult> ChangeImage(Student student, IFormFile image)
        {
            if (student == null)
            {
                throw new ArgumentNullException(nameof(student));
            }

            if (image == null)
            {
                throw new ArgumentNullException(nameof(image));
            }

            string fileName = $"{student.Id}{Path.GetExtension(image.FileName)}";

            string path = Path.Combine(_configuration["File:Paths:StudentImages"], fileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await image.CopyToAsync(stream).ConfigureAwait(false);
            }

            student.HasImage = true;

            _dbContext.Update(student);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }


        [HttpDelete("{studentId}")]
        [LoadStudent(DepartmentItemName = "department")]
        [IsPrincipal]
        public async Task<NoContentResult> Delete(Student student)
        {
           await _studentDestructor.Destroy(student);
            
            return NoContent();
        }
    }
}