using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Infrastructure;
using Exam.Authorizers;
using Exam.Destructors;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers.Periods
{
    [Route("api/semesters")]
    public class SemesterController : Controller
    {
        private DbContext _dbContext;

        public SemesterController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet("{semesterId}")]
        [LoadSemester]
        public Semester Get(Semester semester)
        {
            return semester;
        }


        [HttpGet]
        public IEnumerable<Semester> List(long? schoolId, long? yearId)
        {
            IQueryable<Semester> query = _dbContext.Set<Semester>();

            if (schoolId != null)
            {
                query = query.Where(y => y.Year.SchoolId == schoolId);
            }

            if (yearId != null)
            {
                query = query.Where(y => y.YearId == yearId);
            }

            return query.ToList();
        }


        [HttpPost]
        [ValidModel]
        [RequireQueryParameter("yearId")]
        [LoadYear(SchoolItemName = "school", Source = ParameterSource.Query)]
        [IsDirector]
        public CreatedAtActionResult Add(Year year, [FromBody] SemesterForm form)
        {
            Assert.RequireNonNull(year, nameof(year));
            Assert.RequireNonNull(form, nameof(form));

            if (form.ExpectedStartDate >= form.ExpectedEndDate)
            {
                throw new InvalidOperationException("START_DATE_IS_AFTER_END_DATE");
            }

            var semesters = _dbContext.Set<Semester>().Where(s => s.YearId == year.Id).ToList();

            Semester semester = new Semester
            {
                ExpectedStartDate = form.ExpectedStartDate,
                ExpectedEndDate = form.ExpectedEndDate,
                Year = year,
                Index = semesters.Count
            };
            _dbContext.Set<Semester>().Add(semester);
            semesters.Add(semester);
            _SetSemesterIndex(semesters);

            _CreateDepartmentSemesters(semester);

            _dbContext.SaveChanges();

            return CreatedAtAction("Get", new {semesterId = semester.Id}, semester);
        }

        public IEnumerable<SemesterDepartment> _CreateDepartmentSemesters(Semester semester)
        {
            IEnumerable<YearDepartment> yearDepartments = _dbContext.Set<YearDepartment>()
                .Where(d => d.YearId == semester.Year.Id);
            
            List<SemesterDepartment> semesterDepartments = new List<SemesterDepartment>();

            foreach (YearDepartment yearDepartment in yearDepartments)
            {
                SemesterDepartment semesterDepartment = new SemesterDepartment
                {
                    YearDepartment = yearDepartment,
                    Semester = semester
                };

                _dbContext.Add(semesterDepartment);

                var semesterLevels = _CreateSemesterLevels(semesterDepartment);
                var semesterSpecialities = _CreateSemesterSpecialities(semesterDepartment);

                _CreateSemesterLevelSpecialities(semesterDepartment, semesterLevels.ToList(), semesterSpecialities.ToList());

                semesterDepartments.Add(semesterDepartment);
            }

            return semesterDepartments;
        }


        public IEnumerable<SemesterLevel> _CreateSemesterLevels(SemesterDepartment semesterDepartment)
        {
            IEnumerable<YearLevel> yearLevels = _dbContext.Set<YearLevel>()
                .Where(d => d.YearDepartmentId == semesterDepartment.YearDepartment.Id);

            return yearLevels.ToList().ConvertAll(yearLevel =>
            {
                SemesterLevel semesterLevel = new SemesterLevel
                {
                    YearLevel = yearLevel,
                    SemesterDepartment = semesterDepartment
                };
                _dbContext.Add(semesterLevel);
                return semesterLevel;
            });
        }


        public IEnumerable<SemesterSpeciality> _CreateSemesterSpecialities(SemesterDepartment semesterDepartment)
        {
            IEnumerable<YearSpeciality> yearSpecialities = _dbContext.Set<YearSpeciality>()
                .Where(d => d.YearDepartmentId == semesterDepartment.YearDepartment.Id);

            return yearSpecialities.Select(yearSpeciality =>
            {
                SemesterSpeciality semesterSpeciality = new SemesterSpeciality
                {
                    YearSpeciality = yearSpeciality,
                    SemesterDepartment = semesterDepartment
                };

                Console.WriteLine("Semester speciality");

                _dbContext.Add(semesterSpeciality);
                return semesterSpeciality;
            });
        }


        public IEnumerable<SemesterLevelSpeciality> _CreateSemesterLevelSpecialities(SemesterDepartment semesterDepartment,
            List<SemesterLevel> semesterLevels, List<SemesterSpeciality> semesterSpecialities)
        {
            IEnumerable<YearLevelSpeciality> yearLevelSpecialities = _dbContext.Set<YearLevelSpeciality>()
                .Where(y => y.YearLevel.YearDepartmentId == semesterDepartment.YearDepartment.Id);

            List<SemesterLevelSpeciality> semesterLevelSpecialities = new List<SemesterLevelSpeciality>();

            foreach (YearLevelSpeciality yearLevelSpeciality in yearLevelSpecialities)
            {
                SemesterLevel semesterLevel = semesterLevels.First(y => y.YearLevel.Id == yearLevelSpeciality.YearLevelId);
                SemesterSpeciality semesterSpeciality =
                    semesterSpecialities.First(y => y.YearSpeciality.Id == yearLevelSpeciality.YearSpecialityId);

                SemesterLevelSpeciality semesterLevelSpeciality =
                    _CreateSemesterLevelSpeciality(semesterLevel, semesterSpeciality, yearLevelSpeciality);
                _dbContext.Add(semesterLevelSpeciality);
                semesterLevelSpecialities.Add(semesterLevelSpeciality);
            }

            return semesterLevelSpecialities;
        }

        public SemesterLevelSpeciality _CreateSemesterLevelSpeciality(SemesterLevel semesterLevel, SemesterSpeciality semesterSpeciality,
            YearLevelSpeciality yearLevelSpeciality)
        {
            Assert.RequireNonNull(semesterLevel, nameof(semesterLevel));
            Assert.RequireNonNull(semesterSpeciality, nameof(semesterSpeciality));
            Assert.RequireNonNull(yearLevelSpeciality, nameof(yearLevelSpeciality));

            if (semesterLevel.SemesterDepartmentId != semesterSpeciality.SemesterDepartmentId)
            {
                throw new InvalidOperationException("INCOMPATIBLE_ENTITIES");
            }

            if (!yearLevelSpeciality.YearLevel.Equals(semesterLevel.YearLevel))
            {
                throw new InvalidOperationException("INCOMPATIBLE_ENTITIES");
            }

            if (!yearLevelSpeciality.YearSpeciality.Equals(semesterSpeciality.YearSpeciality))
            {
                throw new InvalidOperationException("INCOMPATIBLE_ENTITIES");
            }

            SemesterLevelSpeciality semesterLevelSpeciality = new SemesterLevelSpeciality
            {
                YearLevelSpeciality = yearLevelSpeciality,
                SemesterLevel = semesterLevel,
                SemesterSpeciality = semesterSpeciality
            };

            return semesterLevelSpeciality;
        }


        [HttpPut("{semesterId}/date")]
        [ValidModel]
        [LoadSemester(SchoolItemName = "school")]
        [IsDirector]
        public AcceptedResult ChangeDate(Semester semester, [FromBody] SemesterForm form)
        {
            Assert.RequireNonNull(semester, nameof(semester));
            Assert.RequireNonNull(form, nameof(form));

            if (semester.Opened)
            {
                throw new InvalidOperationException("SEMESTER_STARTED");
            }

            semester.ExpectedStartDate = form.ExpectedStartDate;
            semester.ExpectedEndDate = form.ExpectedEndDate;

            _dbContext.Update(semester);
            _dbContext.SaveChanges();
            return Accepted();
        }

        [HttpPut("{semesterId}/start")]
        [LoadSemester(SchoolItemName = "school")]
        [IsDirector]
        public AcceptedResult Start(Semester semester)
        {
            Assert.RequireNonNull(semester, nameof(semester));

            if (!semester.Year.Opened)
            {
                throw new InvalidOperationException("YEAR_NOT_OPEN");
            }

            if (semester.Opened)
            {
                throw new InvalidOperationException("SEMESTER_STARTED");
            }

            semester.StartDate = DateTime.UtcNow;

            _dbContext.Update(semester);
            _dbContext.SaveChanges();
            return Accepted();
        }

        [HttpPut("{semesterId}/close")]
        [LoadSemester(SchoolItemName = "school")]
        [IsDirector]
        public AcceptedResult Close(Semester semester)
        {
            Assert.RequireNonNull(semester, nameof(semester));

            if (semester.StartDate == null)
            {
                throw new InvalidOperationException("SEMESTER_NOT_STARTED");
            }

            if (semester.EndDate != null)
            {
                throw new InvalidOperationException("SEMESTER_CLOSED");
            }

            semester.EndDate = DateTime.UtcNow;

            _dbContext.Update(semester);
            _dbContext.SaveChanges();
            return Accepted();
        }


        [HttpPut("{semesterId}/restart")]
        [LoadSemester(SchoolItemName = "school")]
        [IsDirector]
        public AcceptedResult Restart(Semester semester)
        {
            Assert.RequireNonNull(semester, nameof(semester));
            
            if (semester.Year.IsClosed)
            {
                throw new InvalidOperationException("YEAR_CLOSED");
            }

            if (semester.StartDate == null)
            {
                throw new InvalidOperationException("SEMESTER_NOT_STARTED");
            }

            semester.EndDate = null;

            _dbContext.Update(semester);
            _dbContext.SaveChanges();
            return Accepted();
        }


        [HttpDelete("{semesterId}")]
        [LoadSemester(SchoolItemName = "school")]
        [IsDirector]
        public NoContentResult Delete(Semester semester)
        {
            Assert.RequireNonNull(semester, nameof(semester));

            if (semester.Year.IsClosed)
            {
                throw new InvalidOperationException("YEAR_CLOSED");
            }
            
            SemesterDestructor destructor = new SemesterDestructor(_dbContext);
            destructor.Destroy(semester);

            IEnumerable<Semester> semesters = _dbContext.Set<Semester>().Where(s => s.YearId == semester.YearId)
                .ToImmutableList()
                .RemoveAll(s => s.Id == semester.Id);
            
            _SetSemesterIndex(semesters);

            _dbContext.SaveChanges();

            return NoContent();
        }

        private void _SetSemesterIndex(IEnumerable<Semester> values)
        {
            var semesters = values.OrderBy(s => s.ExpectedStartDate).ToList();;
            
            for (int i = 0; i < semesters.Count(); i++)
            {
                semesters[i].Index = i;
                _dbContext.Update(semesters[i]);
            }
        }
        
        
        public List<SemesterDepartment> GetSemesterDepartments(Semester semester)
        {
            return _dbContext.Set<SemesterDepartment>().Where(y => y.SemesterId == semester.Id).ToList();
        }

        public List<SemesterLevel> GetSemesterLevels(Semester semester)
        {
            return _dbContext.Set<SemesterLevel>().Where(y => y.SemesterDepartment.SemesterId == semester.Id).ToList();
        }
        
        public List<SemesterSpeciality> GetSemesterSpecialities(Semester semester)
        {
            return _dbContext.Set<SemesterSpeciality>().Where(y => y.SemesterDepartment.SemesterId == semester.Id).ToList();
        }

        public List<SemesterLevelSpeciality> GetSemesterLevelSpecialities(Semester semester)
        {
            return _dbContext.Set<SemesterLevelSpeciality>()
                .Where(y => y.SemesterLevel.SemesterDepartment.SemesterId == semester.Id)
                .ToList();
        }
    }
}