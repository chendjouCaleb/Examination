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
    [Route("api/courseHours")]
    public class CourseHourController:Controller
    {
        private readonly IRepository<CourseHour, long> _courseHourRepository;
        private readonly DbContext _dbContext;

        public CourseHourController(IRepository<CourseHour, long> courseHourRepository, DbContext dbContext)
        {
            _courseHourRepository = courseHourRepository;
            _dbContext = dbContext;
        }


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
        [RequireQueryParameter("courseId")]
        [LoadCourseTeacher(Source = ParameterSource.Query)]
        [LoadCourse(Source = ParameterSource.Query)]
        [LoadRoom(Source = ParameterSource.Query, SchoolItemName = "school")]
        [IsPlanner]
        public CreatedAtActionResult Add(Course course, Room room, CourseTeacher courseTeacher,
            [FromBody] AddCourseHourForm form)
        {
            Assert.RequireNonNull(course, nameof(course));
            Assert.RequireNonNull(room, nameof(room));
            Assert.RequireNonNull(courseTeacher, nameof(courseTeacher));
            Assert.RequireNonNull(form, nameof(form));

            if (!course.Level.Department.School.Equals(room.School))
            {
                throw new IncompatibleEntityException(course, room);
            }

            if (!course.Equals(courseTeacher.Course))
            {
                throw new IncompatibleEntityException(course, courseTeacher);
            }

            CourseHour courseHour = new CourseHour
            {
                Course = course,
                Room = room,
                CourseTeacher = courseTeacher,
                DayOfWeek = form.DayOfWeek,
                StartHour = form.StartHour,
                EndHour = form.EndHour,
                Lecture = form.Lecture
            };

            _courseHourRepository.Save(courseHour);
            return CreatedAtAction("Get", new {courseHourId = courseHour.Id}, courseHour);
        }

        
        [HttpPut("{courseHourId}/teacher")]
        [RequireQueryParameter("courseTeacherId")]
        [LoadCourseHour(SchoolItemName = "school")]
        [LoadCourseTeacher(Source = ParameterSource.Query)]
        [IsPlanner]
        public StatusCodeResult Teacher(CourseHour courseHour, CourseTeacher courseTeacher)
        {
            Assert.RequireNonNull(courseHour, nameof(courseHour));
            Assert.RequireNonNull(courseTeacher, nameof(courseTeacher));
            if (!courseTeacher.Course.Equals(courseHour.Course))
            {
                throw new IncompatibleEntityException(courseHour, courseTeacher);
            }

            courseHour.CourseTeacher = courseTeacher;
            _courseHourRepository.Update(courseHour);
            return Ok();
        }
        
        
        
        [HttpPut("{courseHourId}/room")]
        [RequireQueryParameter("roomId")]
        [LoadCourseHour(SchoolItemName = "school")]
        [LoadRoom(Source = ParameterSource.Query)]
        [IsPlanner]
        public StatusCodeResult Room(CourseHour courseHour, Room room)
        {
            Assert.RequireNonNull(courseHour, nameof(courseHour));
            courseHour.Room = room;
            _courseHourRepository.Update(courseHour);
            return Ok();
        }
        
        [HttpPut("{courseHourId}/lecture")]
        [LoadCourseHour(SchoolItemName = "school")]
        [IsPlanner]
        public StatusCodeResult Lecture(CourseHour courseHour)
        {
            Assert.RequireNonNull(courseHour, nameof(courseHour));
            courseHour.Lecture = !courseHour.Lecture;
            _courseHourRepository.Update(courseHour);
            return Ok();
        }

        [HttpDelete("{courseHourId}")]
        [LoadCourseHour(SchoolItemName = "school")]
        [IsPlanner]
        public NoContentResult Delete(CourseHour courseHour, [FromQuery] bool courseSession) 
        {
            Assert.RequireNonNull(courseHour, nameof(courseHour));
            _courseHourRepository.Delete(courseHour);
            return NoContent();

        }
    }
}