
using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities.Courses;
using Exam.Loaders.Courses;
using Exam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers.Courses
{
    [Route("api/coursesSessions")]
    public class CourseSessionController:Controller
    {
        private DbContext _dbContext;
        private IRepository<CourseSession, long> _courseSessionRepository;


        [HttpGet("{courseSessionId")]
        public CourseSession Get(long courseSessionId)
        {
            CourseSession courseSession = _courseSessionRepository.Find(courseSessionId);
            return courseSession;
        }
        
        
        
        [HttpGet]
        public IEnumerable<CourseSession> List([FromQuery] long? roomId, 
            [FromQuery] long? courseId,
            [FromQuery] long? courseHourId,
            [FromQuery] long? courseTeacherId,
            [FromQuery] long? teacherId,
            [FromQuery] long? levelId)
        {
            if (roomId == null && courseId == null && courseHourId == null && courseTeacherId == null && teacherId == null && levelId == null)
            {
                return new CourseSession[] { };
            }

            IQueryable<CourseSession> query = _dbContext.Set<CourseSession>();

            if (roomId != null)
            {
                query = query.Where(ch => ch.RoomId != null && ch.RoomId == roomId);
            }
            
            if (courseId != null)
            {
                query = query.Where(ch => ch.CourseId == courseId);
            }
            
            if (courseHourId != null)
            {
                query = query.Where(ch => ch.CourseHourId != null && ch.CourseHourId == courseHourId);
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
        [RequireQueryParameter("courseId")]
        [RequireQueryParameter("courseTeacherId")]
        [LoadCourse(Source = ParameterSource.Query, SchoolItemName = "school")]
        [LoadCourseTeacher]
        [IsPlanner]
        public CreatedAtActionResult Add(Course course,
            CourseTeacher courseTeacher,
            [FromQuery] long? courseHourId,
            [FromBody] AddCourseSessionForm form)
        {
            throw new NotImplementedException();
        }

        
        [HttpPut("{courseSessionId}/hour")]
        [LoadCourseSession(SchoolItemName = "school")]
        [IsPlanner]
        public StatusCodeResult Hour(CourseSession courseSession, [FromBody] CourseSessionHourForm form)
        {
            throw new NotImplementedException();
        }
        
        [HttpPut("{courseSessionId}/report")]
        [LoadCourseSession(SchoolItemName = "school")]
        [IsPlanner]
        public StatusCodeResult Report(CourseSession courseSession, [FromBody] CourseSessionReportForm form)
        {
            throw new NotImplementedException();
        }
        
        [HttpPut("{courseSessionId}/objective")]
        [LoadCourseSession(SchoolItemName = "school")]
        [IsPlanner]
        public StatusCodeResult Objective(CourseSession courseSession, [FromForm] string objective)
        {
            throw new NotImplementedException();
        }
        
        [HttpPut("{courseSessionId}/lecture")]
        [LoadCourseSession(SchoolItemName = "school")]
        [IsPlanner]
        public StatusCodeResult Lecture(CourseSession courseSession)
        {
            throw new NotImplementedException();
        }
        
        [HttpDelete("{courseSessionId}")]
        [LoadCourseSession(SchoolItemName = "school")]
        [IsPlanner]
        public NoContentResult Delete(CourseSession courseSession)
        {
            throw new NotImplementedException();
        }
        
    }
}