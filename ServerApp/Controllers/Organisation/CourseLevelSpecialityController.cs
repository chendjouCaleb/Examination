using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Infrastructure;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Persistence.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    [Route("api/courseLevelSpecialities")]
    public class CourseLevelSpecialityController : Controller
    {
        private ICourseLevelSpecialityRepository _courseLevelSpecialityRepository;

        public CourseLevelSpecialityController(ICourseLevelSpecialityRepository courseLevelSpecialityRepository)
        {
            _courseLevelSpecialityRepository = courseLevelSpecialityRepository;
        }

        [HttpGet("{courseLevelSpecialityId}")]
        [LoadCourseLevelSpeciality]
        public CourseLevelSpeciality Get(CourseLevelSpeciality courseLevelSpeciality)
        {
            return courseLevelSpeciality;
        }

        [HttpGet]
        public IEnumerable<CourseLevelSpeciality> List([FromQuery] long? courseId, [FromQuery] long levelSpecialityId)
        {
            if (courseId != null)
            {
                return _courseLevelSpecialityRepository.List(cls => cls.CourseId == courseId);
            }

            return _courseLevelSpecialityRepository.List(cls => cls.LevelSpecialityId == levelSpecialityId);
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

            CourseLevelSpeciality result = _courseLevelSpecialityRepository
                .First(cls => course.Equals(cls.Course) && levelSpeciality.Equals(cls.LevelSpeciality));

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

            result = _courseLevelSpecialityRepository.Save(new CourseLevelSpeciality
            {
                Course = course,
                LevelSpeciality = levelSpeciality
            });

            return result;
        }


        [HttpDelete("{courseLevelSpecialityId}")]
        [LoadCourseLevelSpeciality(DepartmentItemName = "department")]
        [IsPlanner]
        public NoContentResult Delete(CourseLevelSpeciality courseLevelSpeciality)
        {
            _courseLevelSpecialityRepository.Delete(courseLevelSpeciality);
            return NoContent();
        }

        [NonAction]
        public void DeleteAll(Course course)
        {
            _courseLevelSpecialityRepository.DeleteAll(course);
        }
    }
}