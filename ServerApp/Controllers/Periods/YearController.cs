﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Infrastructure;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers.Periods
{
    [Route("api/years")]
    public class YearController : Controller
    {
        private DbContext _dbContext;

        public YearController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet("{yearId}")]
        [LoadYear]
        public Year Get(Year year)
        {
            return year;
        }


        [HttpGet]
        public IEnumerable<Year> List(long? schoolId)
        {
            IQueryable<Year> query = _dbContext.Set<Year>();

            if (schoolId != null)
            {
                query = query.Where(y => y.SchoolId == schoolId);
            }

            return query.ToList();
        }


        [HttpPost]
        [ValidModel]
        [RequireQueryParameter("schoolId")]
        [IsPrincipal]
        public CreatedAtActionResult Add(School school, [FromBody] YearForm form)
        {
            Assert.RequireNonNull(school, nameof(school));
            Assert.RequireNonNull(form, nameof(form));

            if (form.ExpectedStartDate >= form.ExpectedEndDate)
            {
                throw new InvalidOperationException("START_DATE_IS_AFTER_END_DATE");
            }

            Year year = new Year
            {
                ExpectedStartDate = form.ExpectedStartDate,
                ExpectedEndDate = form.ExpectedEndDate,
                School = school,
                SchoolId = school.Id
            };
            _dbContext.Set<Year>().Add(year);

            _CreateDepartmentYears(year);

            _dbContext.SaveChanges();

            return CreatedAtAction("Get", new {yearId = year.Id}, year);
        }

        public IEnumerable<YearDepartment> _CreateDepartmentYears(Year year)
        {
            IEnumerable<Department> departments = _dbContext.Set<Department>()
                .Where(d => d.SchoolId == year.School.Id);
            
            List<YearDepartment> yearDepartments = new List<YearDepartment>();

            foreach (Department department in departments)
            {
                YearDepartment yearDepartment = new YearDepartment
                {
                    Department = department,
                    Year = year
                };
                Console.WriteLine("yearc");

                _dbContext.Add(yearDepartment);

                var yearLevels = _CreateYearLevels(yearDepartment);
                var yearSpecialities = _CreateYearSpecialities(yearDepartment);

                _CreateYearLevelSpecialities(yearDepartment, yearLevels.ToList(), yearSpecialities.ToList());

                yearDepartments.Add(yearDepartment);
            }

            return yearDepartments;
        }


        public IEnumerable<YearLevel> _CreateYearLevels(YearDepartment yearDepartment)
        {
            IEnumerable<Level> levels = _dbContext.Set<Level>()
                .Where(d => d.DepartmentId == yearDepartment.Department.Id);

            return levels.ToList().ConvertAll(level =>
            {
                YearLevel yearLevel = new YearLevel
                {
                    Level = level,
                    YearDepartment = yearDepartment
                };
                Console.WriteLine("Year level");

                _dbContext.Add(yearLevel);
                return yearLevel;
            });
        }


        public IEnumerable<YearSpeciality> _CreateYearSpecialities(YearDepartment yearDepartment)
        {
            IEnumerable<Speciality> specialities = _dbContext.Set<Speciality>()
                .Where(d => d.DepartmentId == yearDepartment.Department.Id);

            return specialities.Select(speciality =>
            {
                YearSpeciality yearSpeciality = new YearSpeciality
                {
                    Speciality = speciality,
                    YearDepartment = yearDepartment
                };

                Console.WriteLine("Year speciality");

                _dbContext.Add(yearSpeciality);
                return yearSpeciality;
            });
        }


        public IEnumerable<YearLevelSpeciality> _CreateYearLevelSpecialities(YearDepartment yearDepartment,
            List<YearLevel> yearLevels, List<YearSpeciality> yearSpecialities)
        {
            IEnumerable<LevelSpeciality> levelSpecialities = _dbContext.Set<LevelSpeciality>()
                .Where(y => y.Level.DepartmentId == yearDepartment.Department.Id);

            List<YearLevelSpeciality> yearLevelSpecialities = new List<YearLevelSpeciality>();

            foreach (LevelSpeciality levelSpeciality in levelSpecialities)
            {
                YearLevel yearLevel = yearLevels.First(y => y.Level.Id == levelSpeciality.LevelId);
                YearSpeciality yearSpeciality =
                    yearSpecialities.First(y => y.Speciality.Id == levelSpeciality.SpecialityId);

                YearLevelSpeciality yearLevelSpeciality = new YearLevelSpeciality
                {
                    LevelSpeciality = levelSpeciality,
                    YearLevel = yearLevel,
                    YearSpeciality = yearSpeciality
                };
                _dbContext.Add(yearLevelSpeciality);
                yearLevelSpecialities.Add(yearLevelSpeciality);
            }

            return yearLevelSpecialities;
        }

        public YearLevelSpeciality _CreateYearLevelSpeciality(YearLevel yearLevel, YearSpeciality yearSpeciality,
            LevelSpeciality levelSpeciality)
        {
            Assert.RequireNonNull(yearLevel, nameof(yearLevel));
            Assert.RequireNonNull(yearSpeciality, nameof(yearSpeciality));
            Assert.RequireNonNull(levelSpeciality, nameof(levelSpeciality));

            if (yearLevel.YearDepartmentId != yearSpeciality.YearDepartmentId)
            {
                throw new InvalidOperationException("INCOMPATIBLE_ENTITIES");
            }

            if (!levelSpeciality.Level.Equals(yearLevel.Level))
            {
                throw new InvalidOperationException("INCOMPATIBLE_ENTITIES");
            }

            if (levelSpeciality.Speciality.Equals(yearSpeciality.Speciality))
            {
                throw new InvalidOperationException("INCOMPATIBLE_ENTITIES");
            }

            YearLevelSpeciality yearLevelSpeciality = new YearLevelSpeciality
            {
                LevelSpeciality = levelSpeciality,
                YearLevel = yearLevel,
                YearSpeciality = yearSpeciality
            };

            return yearLevelSpeciality;
        }


        [HttpPost]
        [ValidModel]
        [LoadYear(SchoolItemName = "school")]
        public AcceptedResult ChangeDate(Year year, [FromBody] YearForm form)
        {
            Assert.RequireNonNull(year, nameof(year));
            Assert.RequireNonNull(form, nameof(form));

            if (year.StartDate != null)
            {
                throw new InvalidOperationException("YEAR_STARTED");
            }

            year.ExpectedStartDate = form.ExpectedStartDate;
            year.ExpectedEndDate = form.ExpectedEndDate;

            _dbContext.Update(year);
            _dbContext.SaveChanges();
            return Accepted();
        }

        [HttpPut("{yearId}/start")]
        [LoadYear(SchoolItemName = "school")]
        [IsPrincipal]
        public AcceptedResult Start(Year year)
        {
            Assert.RequireNonNull(year, nameof(year));

            if (year.StartDate != null)
            {
                throw new InvalidOperationException("YEAR_STARTED");
            }

            year.StartDate = DateTime.UtcNow;

            _dbContext.Update(year);
            _dbContext.SaveChanges();
            return Accepted();
        }

        [HttpPut("{yearId}/close")]
        [LoadYear(SchoolItemName = "school")]
        [IsPrincipal]
        public AcceptedResult Close(Year year)
        {
            Assert.RequireNonNull(year, nameof(year));

            if (year.StartDate == null)
            {
                throw new InvalidOperationException("YEAR_NOT_STARTED");
            }

            if (year.EndDate != null)
            {
                throw new InvalidOperationException("YEAR_CLOSED");
            }

            year.EndDate = DateTime.UtcNow;

            _dbContext.Update(year);
            _dbContext.SaveChanges();
            return Accepted();
        }


        [HttpPut("{yearId}/restart")]
        [LoadYear(SchoolItemName = "school")]
        [IsPrincipal]
        public AcceptedResult Restart(Year year)
        {
            Assert.RequireNonNull(year, nameof(year));

            if (year.StartDate == null)
            {
                throw new InvalidOperationException("YEAR_NOT_STARTED");
            }

            year.EndDate = null;

            _dbContext.Update(year);
            _dbContext.SaveChanges();
            return Accepted();
        }


        public NoContentResult Delete(Year year)
        {
            Assert.RequireNonNull(year, nameof(year));

            throw new NotImplementedException();
        }
    }
}