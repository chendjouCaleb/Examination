
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Loaders.Courses;
using Exam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers.Courses
{
    [Route("api/courseSessions")]
    public class CourseSessionController:Controller
    {
        private DbContext _dbContext;
        private IRepository<CourseSession, long> _courseSessionRepository;

        public CourseSessionController(DbContext dbContext, IRepository<CourseSession, long> courseSessionRepository)
        {
            _dbContext = dbContext;
            _courseSessionRepository = courseSessionRepository;
        }

        [HttpGet("{courseSessionId}")]
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
        [RequireQueryParameter("roomId")]
        [LoadCourse(Source = ParameterSource.Query, SchoolItemName = "school")]
        [LoadCourseTeacher(Source = ParameterSource.Query)]
        [LoadRoom(Source = ParameterSource.Query)]
        [IsPlanner]
        public CreatedAtActionResult Add(Course course,
            CourseTeacher courseTeacher,
            Room room,
            [FromQuery] long? courseHourId,
            [FromBody] AddCourseSessionForm form)
        {
            Assert.RequireNonNull(course, nameof(course));
            Assert.RequireNonNull(courseTeacher, nameof(courseTeacher));
            Assert.RequireNonNull(room, nameof(room));
            Assert.RequireNonNull(form, nameof(form));
            Assert.RequireNonNull(form, nameof(form));

            CourseHour courseHour = null;

            if (courseHourId != null)
            {
                courseHour = _dbContext.Set<CourseHour>().Find(courseHourId);
            }

            if (!course.Equals(courseTeacher.Course))
            {
                throw new IncompatibleEntityException(course, courseTeacher);
            }

            if (!room.School.Equals(course.Level?.Department?.School))
            {
                throw new IncompatibleEntityException(room, course);
            }

            if (courseHour != null && !course.Equals(courseHour.Course))
            {
                throw new IncompatibleEntityException(course, courseHour);
            }


            CourseSession courseSession = new CourseSession
            {
                Course = course,
                CourseHour = courseHour,
                Room = room,
                CourseTeacher = courseTeacher,
                ExpectedStartDate = form.ExpectedStartDate,
                ExpectedEndDate = form.ExpectedEndDate,
                Objective = form.Objective,
                Lecture = form.Lecture
            };

            _courseSessionRepository.Save(courseSession);

            return CreatedAtAction("Get", new {courseSessionId = courseSession.Id}, courseSession);
        }

        
        [HttpPut("{courseSessionId}/hour")]
        [LoadCourseSession(SchoolItemName = "school")]
        [IsPlanner]
        public StatusCodeResult Hour(CourseSession courseSession, [FromBody] CourseSessionHourForm form)
        {
            Assert.RequireNonNull(courseSession, nameof(courseSession));
            Assert.RequireNonNull(form, nameof(form));

            courseSession.ExpectedStartDate = form.ExpectedStartDate;
            courseSession.ExpectedEndDate = form.ExpectedEndDate;
            
            _courseSessionRepository.Update(courseSession);

            return Ok();
        }
        
        [HttpPut("{courseSessionId}/report")]
        [LoadCourseSession(SchoolItemName = "school")]
        [IsPlanner]
        public OkObjectResult Report(CourseSession courseSession, [FromBody] CourseSessionReportForm form)
        {
            Assert.RequireNonNull(courseSession, nameof(courseSession));
            Assert.RequireNonNull(form, nameof(form));

            courseSession.Report = form.Report;
            courseSession.Presence = form.Presence;
            courseSession.StartDate = form.StartDate;
            courseSession.EndDate = form.EndDate;
            _courseSessionRepository.Update(courseSession);

            return Ok(courseSession);
        }
        
        [HttpPut("{courseSessionId}/objective")]
        [LoadCourseSession(SchoolItemName = "school")]
        [IsPlanner]
        public StatusCodeResult Objective(CourseSession courseSession, [FromForm] string objective)
        {
            Assert.RequireNonNull(courseSession, nameof(courseSession));
            courseSession.Objective = objective;
            
            _courseSessionRepository.Update(courseSession);
            return Ok();
        }
        
        [HttpPut("{courseSessionId}/room")]
        [RequireQueryParameter("roomId")]
        [LoadCourseSession(SchoolItemName = "school")]
        [LoadRoom(Source = ParameterSource.Query)]
        [IsPlanner]
        public StatusCodeResult Room(CourseSession courseSession, Room room)
        {
            Assert.RequireNonNull(courseSession, nameof(courseSession));
            Assert.RequireNonNull(room, nameof(room));

            if (!room.School.Equals(courseSession.Room?.School))
            {
                throw new IncompatibleEntityException(courseSession, room);
            }

            courseSession.Room = room;
            _courseSessionRepository.Update(courseSession);

            return Ok();
        }
        
        [HttpPut("{courseSessionId}/teacher")]
        [RequireQueryParameter("courseTeacherId")]
        [LoadCourseHour(SchoolItemName = "school")]
        [LoadCourseTeacher(Source = ParameterSource.Query)]
        [IsPlanner]
        public StatusCodeResult Teacher(CourseSession courseSession, CourseTeacher courseTeacher)
        {
            Assert.RequireNonNull(courseSession, nameof(courseSession));
            Assert.RequireNonNull(courseTeacher, nameof(courseTeacher));

            if (!courseSession.Course.Equals(courseTeacher.Course))
            {
                throw new IncompatibleEntityException(courseSession, courseTeacher);
            }

            courseSession.CourseTeacher = courseTeacher;
            _courseSessionRepository.Update(courseSession);

            return Ok();
        }

        
        [HttpPut("{courseSessionId}/lecture")]
        [LoadCourseSession(SchoolItemName = "school")]
        [IsPlanner]
        public StatusCodeResult Lecture(CourseSession courseSession)
        {
            Assert.RequireNonNull(courseSession, nameof(courseSession));
            courseSession.Lecture = !courseSession.Lecture;

            _courseSessionRepository.Update(courseSession);
            return Ok();
        }
        
        [HttpDelete("{courseSessionId}")]
        [LoadCourseSession(SchoolItemName = "school")]
        [IsPlanner]
        public NoContentResult Delete(CourseSession courseSession)
        {
            Assert.RequireNonNull(courseSession, nameof(courseSession));
            _courseSessionRepository.Delete(courseSession);

            return NoContent();
        }
        
    }
}