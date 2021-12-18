using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Persistence.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers
{
    [Route("api/testLevelSpecialities")]
    public class TestLevelSpecialityController : Controller
    {
        private ITestLevelSpecialityRepository _testLevelSpecialityRepository;
        private ICourseLevelSpecialityRepository _courseLevelSpecialityRepository;
        private IRepository<ExaminationLevelSpeciality, long> _examinationLevelSpecialityRepository;
        private DbContext _dbContext;


        public TestLevelSpecialityController(ITestLevelSpecialityRepository testLevelSpecialityRepository,
            ICourseLevelSpecialityRepository courseLevelSpecialityRepository,
            IRepository<ExaminationLevelSpeciality, long> examinationLevelSpecialityRepository,
            DbContext dbContext)
        {
            _testLevelSpecialityRepository = testLevelSpecialityRepository;
            _courseLevelSpecialityRepository = courseLevelSpecialityRepository;
            _examinationLevelSpecialityRepository = examinationLevelSpecialityRepository;
            _dbContext = dbContext;
        }

        [HttpGet("{testLevelSpecialityId}")]
        [LoadTestLevelSpeciality]
        public TestLevelSpeciality Get(TestLevelSpeciality testLevelSpeciality)
        {
            return testLevelSpeciality;
        }


        [HttpGet("{testLevelSpecialityId}/statistics")]
        [LoadTestLevelSpeciality]
        public PapersStatistics GetStatistics(TestLevelSpeciality testLevelSpeciality)
        {
            return _testLevelSpecialityRepository.GetStatistics(testLevelSpeciality);
        }

        [HttpGet]
        public IEnumerable<TestLevelSpeciality> List([FromQuery] long? testId,
            [FromQuery] long? examinationLevelSpecialityId,
            [FromQuery] long? semesterLevelSpecialityId,
            [FromQuery] long? yearLevelSpecialityId,
            [FromQuery] long? examinationSpecialityId,
            [FromQuery] long? courseLevelSpecialityId,
            [FromQuery] long? semesterCourseLevelSpecialityId
        )
        {
            IQueryable<TestLevelSpeciality> query = _dbContext.Set<TestLevelSpeciality>();
            if (testId != null)
            {
                query = query.Where(cls => cls.TestId == testId);
            }

            if (examinationLevelSpecialityId != null)
            {
                query = query.Where(t => t.ExaminationLevelSpecialityId == examinationLevelSpecialityId);
            }

            if (semesterLevelSpecialityId != null)
            {
                query = query.Where(t =>
                    t.ExaminationLevelSpeciality.SemesterLevelSpecialityId == semesterLevelSpecialityId);
            }

            if (yearLevelSpecialityId != null)
            {
                query = query.Where(t =>
                    t.ExaminationLevelSpeciality.SemesterLevelSpeciality.YearLevelSpecialityId ==
                    yearLevelSpecialityId);
            }

            if (examinationSpecialityId != null)
            {
                query = query.Where(
                    t => t.ExaminationLevelSpeciality.ExaminationSpecialityId == examinationSpecialityId);
            }

            if (semesterCourseLevelSpecialityId != null)
            {
                query = query.Where(t => t.SemesterCourseLevelSpecialityId == semesterCourseLevelSpecialityId);
            }

            if (courseLevelSpecialityId != null)
            {
                query = query.Where(t =>
                    t.SemesterCourseLevelSpeciality.CourseLevelSpecialityId == courseLevelSpecialityId);
            }

            return query.ToList();
        }

        public List<TestLevelSpeciality> _AddAll(Test test)
        {
            if (test.IsGeneral)
            {
                throw new InvalidOperationException("TEST_IS_GENERAL");
            }

            var semesterCourseLevelSpecialities = _dbContext.Set<SemesterCourseLevelSpeciality>()
                .Where(c => c.SemesterCourse.Equals(test.SemesterCourse)).ToList();

            var testLevelSpecialities = new List<TestLevelSpeciality>();

            foreach (var semesterCourseLevelSpeciality in semesterCourseLevelSpecialities)
            {
                if (!Contains(test, semesterCourseLevelSpeciality))
                {
                    var testLevelSpeciality = _Add(test, semesterCourseLevelSpeciality);
                    testLevelSpecialities.Add(testLevelSpeciality);
                }
            }

            return testLevelSpecialities;
        }

        public TestLevelSpeciality _Add(Test test, SemesterCourseLevelSpeciality semesterCourseLevelSpeciality)
        {
            ExaminationLevelSpeciality examinationLevelSpeciality = _dbContext.Set<ExaminationLevelSpeciality>()
                .First(e => e.ExaminationLevel.Equals(test.ExaminationLevel) &&
                            e.SemesterLevelSpeciality.Equals(semesterCourseLevelSpeciality.SemesterLevelSpeciality));

            return _Add(test, semesterCourseLevelSpeciality, examinationLevelSpeciality);
        }

        public TestLevelSpeciality _Add(Test test, SemesterCourseLevelSpeciality semesterCourseLevelSpeciality,
            ExaminationLevelSpeciality examinationLevelSpeciality)
        {
            Assert.RequireNonNull(test, nameof(test));
            Assert.RequireNonNull(semesterCourseLevelSpeciality, nameof(semesterCourseLevelSpeciality));
            Assert.RequireNonNull(examinationLevelSpeciality, nameof(examinationLevelSpeciality));

            if (Contains(test, semesterCourseLevelSpeciality))
            {
                throw new DuplicateObjectException("DUPLICATE_TEST_LEVEL_SPECIALITY");
            }


            if (!test.SemesterCourse.Equals(semesterCourseLevelSpeciality.SemesterCourse))
            {
                throw new IncompatibleEntityException(test, semesterCourseLevelSpeciality);
            }

            if (!semesterCourseLevelSpeciality.SemesterLevelSpeciality.Equals(examinationLevelSpeciality
                .SemesterLevelSpeciality))
            {
                throw new IncompatibleEntityException(semesterCourseLevelSpeciality, examinationLevelSpeciality);
            }

            if (!examinationLevelSpeciality.ExaminationLevel.Equals(test.ExaminationLevel))
            {
                throw new IncompatibleEntityException(test, examinationLevelSpeciality);
            }

            if (test.SemesterCourse.IsGeneral)
            {
                throw new InvalidOperationException("{testLevelSpeciality.constraints.isNotGeneralTest}");
            }

            return new TestLevelSpeciality
            {
                Test = test,
                SemesterCourseLevelSpeciality = semesterCourseLevelSpeciality,
                ExaminationLevelSpeciality = examinationLevelSpeciality
            };
        }


        [HttpDelete("{testLevelSpecialityId}")]
        [LoadTestLevelSpeciality(DepartmentItemName = "department")]
        [IsPlanner]
        public NoContentResult Delete(TestLevelSpeciality testLevelSpeciality)
        {
            _testLevelSpecialityRepository.Delete(testLevelSpeciality);
            return NoContent();
        }

        [NonAction]
        public void DeleteAll(Test test)
        {
            _testLevelSpecialityRepository.DeleteAll(test);
        }

        public TestLevelSpeciality Find(Test test, SemesterCourseLevelSpeciality semesterCourseLevelSpeciality)
        {
            return _dbContext.Set<TestLevelSpeciality>()
                .FirstOrDefault(t => test.Equals(t.Test)
                                     && semesterCourseLevelSpeciality.Equals(t.SemesterCourseLevelSpeciality));
        }


        public bool Contains(Test test, SemesterCourseLevelSpeciality semesterCourseLevelSpeciality)
        {
            return _dbContext.Set<TestLevelSpeciality>()
                .Any(t => test.Equals(t.Test) && semesterCourseLevelSpeciality.Equals(t.SemesterCourseLevelSpeciality));
        }
    }
}