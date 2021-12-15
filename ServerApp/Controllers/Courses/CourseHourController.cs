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
            [FromQuery] long? semesterLevelId
            )
        {
            IQueryable<CourseHour> query = _dbContext.Set<CourseHour>();

            if (roomId != null)
            {
                query = query.Where(ch => ch.RoomId != null && ch.RoomId == roomId);
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

            return query.ToArray();
        }


        [HttpPost]
        [RequireQueryParameter("roomId")]
        [RequireQueryParameter("semesterCourseTeacherId")]
        [RequireQueryParameter("semesterCourseId")]
        [LoadSemesterCourseTeacher(Source = ParameterSource.Query)]
        [LoadSemesterCourse(Source = ParameterSource.Query)]
        [LoadRoom(Source = ParameterSource.Query, SchoolItemName = "school")]
        [IsPlanner]
        [ValidModel]
        public CreatedAtActionResult Add(SemesterCourse semesterCourse, Room room, 
            SemesterCourseTeacher semesterCourseTeacher,
            [FromBody] AddCourseHourForm form)
        {
            Assert.RequireNonNull(semesterCourse, nameof(semesterCourse));
            Assert.RequireNonNull(room, nameof(room));
            Assert.RequireNonNull(semesterCourseTeacher, nameof(semesterCourseTeacher));
            Assert.RequireNonNull(form, nameof(form));

            if (!room.School.Equals(semesterCourse.SemesterLevel?.SemesterDepartment?.YearDepartment?.Year?.School))
            {
                throw new IncompatibleEntityException(semesterCourse, room);
            }

            if (!semesterCourse.Equals(semesterCourseTeacher.SemesterCourse))
            {
                throw new IncompatibleEntityException(semesterCourse, semesterCourseTeacher);
            }

            CourseHour courseHour = new CourseHour
            {
                SemesterCourse = semesterCourse,
                Room = room,
                SemesterCourseTeacher = semesterCourseTeacher,
                DayOfWeek = form.DayOfWeek,
                StartHour = form.StartHour,
                EndHour = form.EndHour,
                Lecture = form.Lecture
            };

            _courseHourRepository.Save(courseHour);
            return CreatedAtAction("Get", new {courseHourId = courseHour.Id}, courseHour);
        }

        
        [HttpPut("{courseHourId}/teacher")]
        [HttpPut("{courseHourId}/semesterTeacher")]
        [RequireQueryParameter("semesterCourseTeacherId")]
        [LoadCourseHour(SchoolItemName = "school")]
        [LoadSemesterCourseTeacher(Source = ParameterSource.Query)]
        [IsPlanner]
        public StatusCodeResult Teacher(CourseHour courseHour, SemesterCourseTeacher semesterCourseTeacher)
        {
            Assert.RequireNonNull(courseHour, nameof(courseHour));
            Assert.RequireNonNull(semesterCourseTeacher, nameof(semesterCourseTeacher));
            if (!semesterCourseTeacher.SemesterCourse.Equals(courseHour.SemesterCourse))
            {
                throw new IncompatibleEntityException(courseHour, semesterCourseTeacher);
            }

            courseHour.SemesterCourseTeacher = semesterCourseTeacher;
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
            
            var courseSessions = _dbContext.Set<CourseSession>().Where(s => courseHour.Equals(s.CourseHour));
            
            if (courseSession)
            {
                _dbContext.RemoveRange(courseSessions);
            }
            else
            {
                foreach (CourseSession session in courseSessions)
                {
                    session.CourseHour = null;
                    session.CourseHourId = null;
                }
                _dbContext.UpdateRange(courseSessions);
            }
            
            _dbContext.RemoveRange(courseHour);

            _dbContext.SaveChanges();
            return NoContent();

        }
    }
}