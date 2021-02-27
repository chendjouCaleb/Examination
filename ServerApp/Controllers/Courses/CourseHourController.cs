using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities.Courses;
using Exam.Loaders;
using Exam.Loaders.Courses;
using Exam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers.Courses
{
    [Route("api/courseHours")]
    public class CourseHourController:Controller
    {
        private IRepository<CourseHour, long> _courseHourRepository;
        private DbContext _dbContext;


        [HttpGet("{courseHourId}")]
        public CourseHour Get(long courseHourId)
        {
            CourseHour courseHour = _courseHourRepository.Find(courseHourId);
            return courseHour;
        }

        [HttpGet]
        public IEnumerable<CourseHour> List([FromQuery] long? roomId, 
            [FromQuery] long? courseId,
            [FromQuery] long? courseTeacherId,
            [FromQuery] long? teacherId,
            [FromQuery] long? levelId)
        {
            if (roomId == null && courseId == null && courseTeacherId == null && teacherId == null && levelId == null)
            {
                return new CourseHour[] { };
            }

            IQueryable<CourseHour> query = _dbContext.Set<CourseHour>();

            if (roomId != null)
            {
                query = query.Where(ch => ch.RoomId != null && ch.RoomId == roomId);
            }
            
            if (courseId != null)
            {
                query = query.Where(ch => ch.CourseId == courseId);
            }

            if (courseTeacherId != null)
            {
                query = query.Where(ch => ch.CourseTeacherId != null && ch.CourseTeacherId == courseTeacherId);
            }
            
            if (teacherId != null)
            {
                query = query.Where(ch => ch.CourseTeacherId != null && ch.CourseTeacher.TeacherId == teacherId);
            }
            
            if (levelId != null)
            {
                query = query.Where(ch => ch.Course.LevelId == levelId);
            }

            return query.ToArray();
        }


        [HttpPost]
        [RequireQueryParameter("roomId")]
        [RequireQueryParameter("courseTeacherId")]
        [LoadCourseTeacher(Source = ParameterSource.Query)]
        [LoadRoom(Source = ParameterSource.Query, SchoolItemName = "school")]
        [IsPlanner]
        public CreatedAtActionResult Add([FromQuery] long? roomId, [FromQuery] long? courseTeacherId,
            [FromBody] AddCourseHour form)
        {
            throw new NotImplementedException();
        }

        
        [HttpPut("{courseHour}/teacher")]
        [RequireQueryParameter("courseTeacherId")]
        [LoadCourseHour(SchoolItemName = "school")]
        [IsPlanner]
        public StatusCodeResult Teacher(CourseHour courseHour, [FromQuery] long courseTeacherId)
        {
            throw new NotImplementedException();
        }
        
        [HttpPut("{courseHour}/room")]
        [RequireQueryParameter("roomId")]
        [LoadCourseHour(SchoolItemName = "school")]
        [IsPlanner]
        public StatusCodeResult Room(CourseHour courseHour, [FromQuery] long roomId)
        {
            throw new NotImplementedException();
        }
        
        [HttpPut("{courseHour}/lecture")]
        [LoadCourseHour(SchoolItemName = "school")]
        [IsPlanner]
        public StatusCodeResult Lecture(CourseHour courseHour, [FromQuery] long roomId)
        {
            throw new NotImplementedException();
        }

        [HttpPut("{courseHour}/lecture")]
        [LoadCourseHour(SchoolItemName = "school")]
        [IsPlanner]
        public NoContentResult Delete(CourseHour courseHour, [FromQuery] bool courseSession) 
        {
            throw new NotImplementedException();
        }
    }
}