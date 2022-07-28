using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Everest.AspNetStartup.Infrastructure;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Loaders.Courses;
using Exam.Persistence.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers.Courses
{
    [Route("api/courseLevelSpecialities")]
    public class CourseLevelSpecialityController : Controller
    {
        private DbContext _dbContext;

        public CourseLevelSpecialityController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("{courseLevelSpecialityId}")]
        [LoadCourseLevelSpeciality]
        public CourseLevelSpeciality Get(CourseLevelSpeciality courseLevelSpeciality)
        {
            return courseLevelSpeciality;
        }

        [HttpGet]
        public IEnumerable<CourseLevelSpeciality> List([FromQuery] long? schoolId, 
        [FromQuery] long? departmentId,
        [FromQuery] long? levelId,
        [FromQuery] long? specialityId,
        [FromQuery] long? levelSpecialityId,
        [FromQuery] long? courseId)
        {
            IQueryable<CourseLevelSpeciality> query = this._dbContext.Set<CourseLevelSpeciality>();
            if (schoolId != null)
            {
                query = query.Where(c => c.LevelSpeciality.Level.Department.SchoolId == schoolId);
            }
            if (departmentId != null)
            {
                query = query.Where(c => c.LevelSpeciality.Level.DepartmentId == departmentId);
            }
            
            if (levelId != null)
            {
                query = query.Where(c => c.LevelSpeciality.LevelId == levelId);
            }
            
            if (specialityId != null)
            {
                query = query.Where(c => c.LevelSpeciality.SpecialityId == specialityId);
                Console.WriteLine("Speciality count: " + query.Count());
            }
            
            if (levelSpecialityId != null)
            {
                query = query.Where(c => c.LevelSpecialityId == levelSpecialityId);
            }

            if (courseId != null)
            {
                query = query.Where(c => c.CourseId == courseId);
            }

            return query.ToList();
        }

        [HttpPost]
        [RequireQueryParameters(new[] {"levelSpecialityId", "courseId"})]
        [LoadCourse(Source = ParameterSource.Query, DepartmentItemName = "department")]
        [LoadLevelSpeciality(Source = ParameterSource.Query)]
        [IsPlanner]
        public CourseLevelSpeciality Add(Course course, LevelSpeciality levelSpeciality)
        {
            Assert.RequireNonNull(course, nameof(course));
            Assert.RequireNonNull(levelSpeciality, nameof(levelSpeciality));

            CourseLevelSpeciality result = _dbContext.Set<CourseLevelSpeciality>()
                .FirstOrDefault(cls => course.Equals(cls.Course) && levelSpeciality.Equals(cls.LevelSpeciality));

            if (result != null)
            {
                return result;
            }

            if (course.LevelId != levelSpeciality.LevelId)
            {
                throw new IncompatibleEntityException(course, levelSpeciality);
            }

            if (course.IsGeneral)
            {
                throw new InvalidOperationException("{courseLevelSpeciality.constraints.isNotGeneralCourse}");
            }

            var item = new CourseLevelSpeciality
            {
                Course = course,
                LevelSpeciality = levelSpeciality
            };

            result = _dbContext.Set<CourseLevelSpeciality>().Add(item).Entity;
            _dbContext.SaveChanges();

            return result;
        }


        [HttpDelete("{courseLevelSpecialityId}")]
        [LoadCourseLevelSpeciality(DepartmentItemName = "department")]
        [IsPlanner]
        public async Task<NoContentResult> Delete(CourseLevelSpeciality courseLevelSpeciality)
        {
            Assert.RequireNonNull(courseLevelSpeciality, nameof(courseLevelSpeciality));
            _dbContext.Remove(courseLevelSpeciality);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

        [NonAction]
        public void DeleteAll(Course course)
        {
            Assert.RequireNonNull(course, nameof(course));
            IQueryable<CourseLevelSpeciality> items = _dbContext.Set<CourseLevelSpeciality>()
                .Where(c => c.Course.Id == course.Id);
            
            _dbContext.RemoveRange(items);
            _dbContext.SaveChanges();
        }
    }
}