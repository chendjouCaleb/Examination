
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Entities.Periods;
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
            [FromQuery] long? schoolId,
            [FromQuery] long? departmentId,
            [FromQuery] long? courseId,
            [FromQuery] long? teacherId,
            [FromQuery] long? levelId,
            [FromQuery] long? yearId,
            [FromQuery] long? yearDepartmentId,
            [FromQuery] long? yearTeacherId,
            [FromQuery] long? yearLevelId,
            [FromQuery] long? semesterId,
            [FromQuery] long? semesterDepartmentId,
            [FromQuery] long? semesterCourseId,
            [FromQuery] long? semesterCourseTeacherId,
            [FromQuery] long? semesterTeacherId,
            [FromQuery] long? semesterLevelId,
            [FromQuery] long? courseHourId
        )
        {
            IQueryable<CourseSession> query = _dbContext.Set<CourseSession>();

            if (roomId != null)
            {
                query = query.Where(ch => ch.RoomId != null && ch.RoomId == roomId);
            }
            if (courseHourId != null)
            {
                query = query.Where(ch => ch.CourseHourId == courseHourId);
            }

            if (semesterCourseId != null)
            {
                query = query.Where(ch => ch.SemesterCourseId == semesterCourseId);
            }
            
            if (semesterCourseTeacherId != null)
            {
                query = query.Where(ch => ch.SemesterCourseTeacherId == semesterCourseTeacherId);
            }
            
            if (semesterTeacherId != null)
            {
                query = query.Where(ch => ch.SemesterCourseTeacher !=null && 
                                          ch.SemesterCourseTeacher.SemesterTeacherId == semesterTeacherId);
            }
            
            if (semesterLevelId != null)
            {
                query = query.Where(ch => ch.SemesterCourse.SemesterLevelId == semesterLevelId);
            }
            
            if (semesterDepartmentId != null)
            {
                query = query.Where(ch => ch.SemesterCourse.SemesterLevel.SemesterDepartmentId == semesterDepartmentId);
            }
            
            if (semesterId != null)
            {
                query = query.Where(ch => ch.SemesterCourse.SemesterLevel.SemesterDepartment.SemesterId == semesterId);
            }
            
            if (yearTeacherId != null)
            {
                query = query.Where(ch => ch.SemesterCourseTeacher !=null && 
                                          ch.SemesterCourseTeacher.SemesterTeacher.YearTeacherId == yearTeacherId);
            }
            
            if (yearLevelId != null)
            {
                query = query.Where(ch => ch.SemesterCourse.SemesterLevel.YearLevelId == yearLevelId);
            }
            
            if (yearDepartmentId != null)
            {
                query = query.Where(ch => ch.SemesterCourse.SemesterLevel.SemesterDepartment.YearDepartmentId == yearDepartmentId);
            }
            
            if (yearId != null)
            {
                query = query.Where(ch => ch.SemesterCourse.SemesterLevel.SemesterDepartment.Semester.YearId == yearId);
            }
            
            if (courseId != null)
            {
                query = query.Where(ch => ch.SemesterCourse.CourseId == courseId);
            }

            if (teacherId != null)
            {
                query = query.Where(ch => ch.SemesterCourseTeacherId != null 
                                          && ch.SemesterCourseTeacher.SemesterTeacher.YearTeacher.TeacherId == teacherId);
            }
            
            if (levelId != null)
            {
                query = query.Where(ch => ch.SemesterCourse.SemesterLevel.YearLevel.LevelId == levelId);
            }
            
            if (departmentId != null)
            {
                query = query.Where(ch => ch.SemesterCourse.SemesterLevel.SemesterDepartment.YearDepartmentId == 
                                          yearDepartmentId);
            }
            
            if (schoolId != null)
            {
                query = query.Where(ch => ch.SemesterCourse.SemesterLevel.SemesterDepartment.Semester.Year.SchoolId == schoolId);
            }

            query = query.OrderBy(s => s.ExpectedStartDate);

            return query.ToArray();
        }

        [HttpPost]
        [RequireQueryParameter("semesterCourseId")]
        [RequireQueryParameter("semesterCourseTeacherId")]
        [RequireQueryParameter("roomId")]
        [LoadSemesterCourse(Source = ParameterSource.Query)]
        [LoadSemesterCourseTeacher(Source = ParameterSource.Query)]
        [LoadRoom(Source = ParameterSource.Query, SchoolItemName = "school")]
        [IsPlanner]
        [ValidModel]
        public CreatedAtActionResult Add(SemesterCourse semesterCourse,
            SemesterCourseTeacher semesterCourseTeacher,
            Room room,
            [FromQuery] long? courseHourId,
            [FromBody] AddCourseSessionForm form)
        {
            Assert.RequireNonNull(semesterCourse, nameof(semesterCourse));
            Assert.RequireNonNull(semesterCourseTeacher, nameof(semesterCourseTeacher));
            Assert.RequireNonNull(room, nameof(room));
            Assert.RequireNonNull(form, nameof(form));

            CourseHour courseHour = null;

            if (courseHourId != null)
            {
                courseHour = _dbContext.Set<CourseHour>().Find(courseHourId);
            }

            if (!semesterCourse.Equals(semesterCourseTeacher.SemesterCourse))
            {
                throw new IncompatibleEntityException(semesterCourse, semesterCourseTeacher);
            }

            if (!room.School.Equals(semesterCourse.SemesterLevel.SemesterDepartment?.Semester?.Year.School))
            {
                throw new IncompatibleEntityException(room, semesterCourse);
            }

            if (courseHour != null && !semesterCourse.Equals(courseHour.SemesterCourse))
            {
                throw new IncompatibleEntityException(semesterCourse, courseHour);
            }


            CourseSession courseSession = new CourseSession
            {
                SemesterCourse = semesterCourse,
                CourseHour = courseHour,
                Room = room,
                SemesterCourseTeacher = semesterCourseTeacher,
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
        [ValidModel]
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
        [ValidModel]
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
        [HttpPut("{courseSessionId}/semesterTeacher")]
        [RequireQueryParameter("semesterCourseTeacherId")]
        [LoadCourseSession(SchoolItemName = "school")]
        [LoadSemesterCourseTeacher(Source = ParameterSource.Query)]
        [IsPlanner]
        public StatusCodeResult Teacher(CourseSession courseSession, SemesterCourseTeacher semesterCourseTeacher)
        {
            Assert.RequireNonNull(courseSession, nameof(courseSession));
            Assert.RequireNonNull(semesterCourseTeacher, nameof(semesterCourseTeacher));

            if (!courseSession.SemesterCourse.Equals(semesterCourseTeacher.SemesterCourse))
            {
                throw new IncompatibleEntityException(courseSession, semesterCourseTeacher);
            }

            courseSession.SemesterCourseTeacher = semesterCourseTeacher;
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