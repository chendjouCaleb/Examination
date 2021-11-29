using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Infrastructure;
using Exam.Authorizers;
using Exam.Destructors;
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
        public Year Get(long yearId)
        {
            return _dbContext.Set<Year>()
                .Include(y => y.School)
                .First(y => y.Id == yearId);
        }


        [HttpGet]
        public IEnumerable<Year> List(long? schoolId)
        {
            IQueryable<Year> query = _dbContext.Set<Year>();

            if (schoolId != null)
            {
                query = query.Where(y => y.SchoolId == schoolId);
            }

            return query.Include(y => y.School).ToList();
        }


        [HttpPost]
        [ValidModel]
        [RequireQueryParameter("schoolId")]
        [LoadSchool(Source = ParameterSource.Query)]
        [IsDirector]
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


        [HttpPut("{yearId}/date")]
        [ValidModel]
        [LoadYear(SchoolItemName = "school")]
        [IsDirector]
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
        [IsDirector]
        public AcceptedResult Start(Year year)
        {
            Assert.RequireNonNull(year, nameof(year));

            if (year.StartDate != null)
            {
                throw new InvalidOperationException("YEAR_STARTED");
            }

            year.StartDate = DateTime.UtcNow;

            var yearDepartments = GetYearDepartments(year);
            var yearLevels = GetYearLevels(year);
            var yearSpecialities = GetYearSpecialities(year);
            var yearLevelSpecialties = GetYearLevelSpecialities(year);

            foreach (var yearDepartment in yearDepartments)
            {
                yearDepartment.Start();
            }

            foreach (YearLevel yearLevel in yearLevels)
            {
                yearLevel.Start();
            }

            foreach (var yearSpeciality in yearSpecialities)
            {
                yearSpeciality.Start();
            }

            foreach (var yearLevelSpeciality in yearLevelSpecialties)
            {
                yearLevelSpeciality.Start();
            }

            _dbContext.Update(year);
            _dbContext.SaveChanges();
            return Accepted();
        }

        [HttpPut("{yearId}/close")]
        [LoadYear(SchoolItemName = "school")]
        [IsDirector]
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
            
            foreach (var yearDepartment in GetYearDepartments(year))
            {
                yearDepartment.Close();
            }

            foreach (YearLevel yearLevel in GetYearLevels(year))
            {
                yearLevel.Close();
            }

            foreach (var yearSpeciality in GetYearSpecialities(year))
            {
                yearSpeciality.Close();
            }

            foreach (var yearLevelSpeciality in GetYearLevelSpecialities(year))
            {
                yearLevelSpeciality.Close();
            }
            
            _dbContext.SaveChanges();
            return Accepted();
        }


        [HttpPut("{yearId}/restart")]
        [LoadYear(SchoolItemName = "school")]
        [IsDirector]
        public AcceptedResult Restart(Year year)
        {
            Assert.RequireNonNull(year, nameof(year));

            if (year.StartDate == null)
            {
                throw new InvalidOperationException("YEAR_NOT_STARTED");
            }

            year.EndDate = null;
            _dbContext.Update(year);
            
            foreach (var yearDepartment in GetYearDepartments(year))
            {
                yearDepartment.Start();
            }

            foreach (YearLevel yearLevel in GetYearLevels(year))
            {
                yearLevel.Start();
            }

            foreach (var yearSpeciality in GetYearSpecialities(year))
            {
                yearSpeciality.Start();
            }

            foreach (var yearLevelSpeciality in GetYearLevelSpecialities(year))
            {
                yearLevelSpeciality.Start();
            }
            
            
            _dbContext.SaveChanges();
            return Accepted();
        }


        [HttpDelete("{yearId}")]
        [LoadYear(SchoolItemName = "school")]
        [IsDirector]
        public NoContentResult Delete(Year year)
        {
            Assert.RequireNonNull(year, nameof(year));
            var semesterDestructor = new SemesterDestructor(_dbContext);
            var yearDestructor = new YearDestructor(_dbContext);
            
            semesterDestructor.Destroy(year);
            yearDestructor.Destroy(year);

            return NoContent();
        }

        public List<YearDepartment> GetYearDepartments(Year year)
        {
            return _dbContext.Set<YearDepartment>().Where(y => y.YearId == year.Id).ToList();
        }

        public List<YearLevel> GetYearLevels(Year year)
        {
            return _dbContext.Set<YearLevel>().Where(y => y.YearDepartment.YearId == year.Id).ToList();
        }
        
        public List<YearSpeciality> GetYearSpecialities(Year year)
        {
            return _dbContext.Set<YearSpeciality>().Where(y => y.YearDepartment.YearId == year.Id).ToList();
        }

        public List<YearLevelSpeciality> GetYearLevelSpecialities(Year year)
        {
            return _dbContext.Set<YearLevelSpeciality>()
                .Where(y => y.YearLevel.YearDepartment.YearId == year.Id)
                .ToList();
        }
    }
}