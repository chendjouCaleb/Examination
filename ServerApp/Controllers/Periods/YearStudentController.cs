﻿using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Exam.Destructors;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Exam.Loaders;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers.Periods
{
    [Route("api/yearStudents")]
    public class YearStudentController:Controller
    {
        private DbContext _dbContext;

        public YearStudentController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet("{yearStudentId}")]
        public YearStudent Get(long yearStudentId)
        {
           return  _dbContext.Set<YearStudent>()
               .Include(y => y.Student).First(y => y.Id == yearStudentId);
        }


        [HttpGet]
        public IEnumerable<YearStudent> List([FromQuery] long? studentId,
            [FromQuery] long? yearId, [FromQuery] long? yearDepartmentId,
            [FromQuery] long? yearLevelId, [FromQuery] long? yearLevelSpecialityId
        )
        {
            IQueryable<YearStudent> query = _dbContext.Set<YearStudent>();

            if (studentId != null)
            {
                query = query.Where(s => s.StudentId == studentId);
            }

            if (yearId != null)
            {
                query = query.Where(s => s.YearLevel.YearDepartment.YearId == yearId);
            }
            
            if (yearDepartmentId != null)
            {
                query = query.Where(s => s.YearLevel.YearDepartmentId == yearDepartmentId);
            }
            
            if (yearLevelId != null)
            {
                query = query.Where(s => s.YearLevelId == yearLevelId);
            }
            
            if (yearLevelSpecialityId != null)
            {
                query = query.Where(s => s.YearLevelSpecialityId == yearLevelSpecialityId);
            }

            return query.Include(y => y.Student).ToList();
        }
        
        
        [HttpPost("addAll")]
        [RequireQueryParameter("yearId")]
        [LoadYear(Source = ParameterSource.Query)]
        public List<YearStudent> AddStudents(Year year)
        {
            Assert.RequireNonNull(year, nameof(year));

            List<Student> students = _dbContext.Set<Student>()
                .Where(s => s.Level.Department.SchoolId == year.SchoolId && s.IsActive)
                .ToList();
            List<YearLevel> yearLevels = _dbContext.Set<YearLevel>()
                .Where(yl => yl.YearDepartment.YearId == year.Id)
                .ToList();
            
            List<YearLevelSpeciality> yearLevelSpecialities = _dbContext.Set<YearLevelSpeciality>()
                .Where(yls => yls.YearLevel.YearDepartment.YearId == year.Id)
                .ToList();

            var yearStudents = _AddStudents(students, yearLevels, yearLevelSpecialities);
            
            _dbContext.AddRange(yearStudents);
            _dbContext.SaveChanges();
            return yearStudents;
        }

        
        [HttpPost("addAllDepartment")]
        [RequireQueryParameter("yearDepartmentId")]
        [LoadYearDepartment(Source = ParameterSource.Query)]
        public List<YearStudent> AddStudents(YearDepartment yearDepartment)
        {
            Assert.RequireNonNull(yearDepartment, nameof(yearDepartment));

            List<Student> students = _dbContext.Set<Student>()
                .Where(s => s.Level.DepartmentId == yearDepartment.DepartmentId && s.IsActive)
                .ToList();
            
            List<YearLevel> yearLevels = _dbContext.Set<YearLevel>()
                .Where(yl => yl.YearDepartmentId == yearDepartment.Id)
                .ToList();
            
            List<YearLevelSpeciality> yearLevelSpecialities = _dbContext.Set<YearLevelSpeciality>()
                .Where(yls => yls.YearLevel.YearDepartmentId == yearDepartment.Id)
                .ToList();

            var yearStudents = _AddStudents(students, yearLevels, yearLevelSpecialities);
            
            _dbContext.AddRange(yearStudents);
            _dbContext.SaveChanges();
            return yearStudents;
        }
        
       
        [HttpPost("addAllLevel")]
        [RequireQueryParameter("yearLevelId")]
        [LoadYearLevel(Source = ParameterSource.Query)]
        public List<YearStudent> AddStudents(YearLevel yearLevel)
        {
            Assert.RequireNonNull(yearLevel, nameof(yearLevel));

            List<Student> students = _dbContext.Set<Student>()
                .Where(s => s.LevelId == yearLevel.LevelId && s.IsActive)
                .ToList();
            
            List<YearLevel> yearLevels = new List<YearLevel>(new []{yearLevel});
            
            List<YearLevelSpeciality> yearLevelSpecialities = _dbContext.Set<YearLevelSpeciality>()
                .Where(yls => yls.YearLevelId == yearLevel.Id)
                .ToList();

            var yearStudents = _AddStudents(students, yearLevels, yearLevelSpecialities);
            
            _dbContext.AddRange(yearStudents);
            _dbContext.SaveChanges();
            return yearStudents;
        }

        [HttpDelete("{yearStudentId}")]
        [LoadYearStudent]
        public NoContentResult Delete(YearStudent yearStudent)
        {
            Assert.RequireNonNull(yearStudent, nameof(yearStudent));
            var destructor = new YearStudentDestructor(_dbContext);

            destructor.Destroy(yearStudent);
            _dbContext.SaveChanges();
            return NoContent();
        }

        public YearStudent _AddYearStudent(Student student, YearLevel yearLevel)
        {
            return _AddYearStudent(student, yearLevel, null);
        }
        

        public YearStudent _AddYearStudent(Student student, YearLevel yearLevel,
            YearLevelSpeciality yearLevelSpeciality)
        {
            Assert.RequireNonNull(student, nameof(student));
            Assert.RequireNonNull(yearLevel, nameof(yearLevel));

            YearStudent yearStudent = _dbContext.Set<YearStudent>()
                .FirstOrDefault(ys => ys.StudentId == student.Id && ys.YearLevelId == yearLevel.Id);
            if (yearStudent != null)
            {
                return yearStudent;
            }

            if (student.Level.DepartmentId != yearLevel.YearDepartment.DepartmentId)
            {
                throw new IncompatibleEntityException(student, yearLevel);
            }

            if (yearLevelSpeciality != null && !yearLevel.Equals(yearLevelSpeciality.YearLevel))
            {
                throw new IncompatibleEntityException(yearLevel, yearLevelSpeciality);
            }
            
            yearStudent = new YearStudent
            {
                YearLevel = yearLevel,
                YearLevelSpeciality = yearLevelSpeciality,
                Student = student
            };

            _dbContext.Add(yearStudent);

            return yearStudent;
        }

        public List<YearStudent> _AddStudents(List<Student> students, List<YearLevel> yearLevels,
            List<YearLevelSpeciality> yearLevelSpecialities)
        {
            List<YearStudent> yearStudents = new List<YearStudent>();

            foreach (Student student in students.FindAll(s => s.IsActive))
            {
                YearLevel yearLevel = yearLevels.Find(yl => yl.LevelId == student.LevelId);
                YearLevelSpeciality yearLevelSpeciality = yearLevelSpecialities
                    .Find(yl => yl.LevelSpecialityId == student.LevelSpecialityId);

                if (yearLevel != null && !Contains(student, yearLevel))
                {
                    YearStudent yearStudent = _AddYearStudent(student, yearLevel, yearLevelSpeciality);
                    yearStudents.Add(yearStudent);
                }
            }

            return yearStudents;
        }

        public YearStudent First(Student student, YearLevel yearLevel)
        {
            return _dbContext.Set<YearStudent>()
                .FirstOrDefault(ys => ys.StudentId == student.Id && ys.YearLevelId == yearLevel.Id);
        }
        
        public bool Contains(Student student, YearLevel yearLevel)
        {
            return _dbContext.Set<YearStudent>()
                .Any(ys => ys.StudentId == student.Id && ys.YearLevelId == yearLevel.Id);
        }
        
        public bool Contains(Student student, Year year)
        {
            return _dbContext.Set<YearStudent>()
                .Any(ys => ys.StudentId == student.Id && year.Equals(ys.YearLevel.YearDepartment.Year));
        }
    }
}