using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Persistence.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    [Route("api/testLevelSpecialities")]
    public class TestLevelSpecialityController : Controller
    {
        private ITestLevelSpecialityRepository _testLevelSpecialityRepository;
        private ICourseLevelSpecialityRepository _courseLevelSpecialityRepository;
        private IRepository<ExaminationLevelSpeciality, long> _examinationLevelSpecialityRepository;


        public TestLevelSpecialityController(ITestLevelSpecialityRepository testLevelSpecialityRepository,
            ICourseLevelSpecialityRepository courseLevelSpecialityRepository,
            IRepository<ExaminationLevelSpeciality, long> examinationLevelSpecialityRepository)
        {
            _testLevelSpecialityRepository = testLevelSpecialityRepository;
            _courseLevelSpecialityRepository = courseLevelSpecialityRepository;
            _examinationLevelSpecialityRepository = examinationLevelSpecialityRepository;
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
            [FromQuery] long? examinationSpecialityId,
            [FromQuery] long? courseLevelSpecialityId)
        {
            if (testId != null)
            {
                return _testLevelSpecialityRepository.List(cls => cls.TestId == testId);
            }

            if (examinationLevelSpecialityId != null)
            {
                return _testLevelSpecialityRepository.List(t =>
                    t.ExaminationLevelSpecialityId == examinationLevelSpecialityId);
            }

            if (examinationSpecialityId != null)
            {
                return _testLevelSpecialityRepository.List(
                    t => t.ExaminationLevelSpeciality.ExaminationSpecialityId == examinationSpecialityId);
            }

            return _testLevelSpecialityRepository
                .List(cls => cls.CourseLevelSpecialityId == courseLevelSpecialityId);
        }

        public List<TestLevelSpeciality> _AddAll(Test test)
        {
            return _courseLevelSpecialityRepository.List(c => c.Course.Equals(test.Course))
                .Select(c =>
                    _Add(test, c,
                        _examinationLevelSpecialityRepository
                            .First(l => l.LevelSpecialityId == c.LevelSpecialityId))
                ).ToList();
        }

        public TestLevelSpeciality _Add(Test test, CourseLevelSpeciality courseLevelSpeciality,
            ExaminationLevelSpeciality examinationLevelSpeciality)
        {
            Assert.RequireNonNull(test, nameof(test));
            Assert.RequireNonNull(courseLevelSpeciality, nameof(courseLevelSpeciality));
            Assert.RequireNonNull(examinationLevelSpeciality, nameof(examinationLevelSpeciality));

            TestLevelSpeciality result = _testLevelSpecialityRepository
                .First(cls => test.Equals(cls.Test)
                              && courseLevelSpeciality.Equals(cls.CourseLevelSpeciality)
                              && examinationLevelSpeciality.Equals(cls.ExaminationLevelSpeciality));

            if (result != null)
            {
                return result;
            }

            if (!test.Course.Equals(courseLevelSpeciality.Course))
            {
                throw new IncompatibleEntityException(test, courseLevelSpeciality);
            }

            if (!courseLevelSpeciality.LevelSpeciality.Equals(examinationLevelSpeciality.LevelSpeciality))
            {
                throw new IncompatibleEntityException(courseLevelSpeciality, examinationLevelSpeciality);
            }

            if (!examinationLevelSpeciality.ExaminationLevel.Equals(test.ExaminationLevel))
            {
                throw new IncompatibleEntityException(test, examinationLevelSpeciality);
            }

            if (test.Course.IsGeneral)
            {
                throw new InvalidOperationException("{testLevelSpeciality.constraints.isNotGeneralTest}");
            }

            return new TestLevelSpeciality
            {
                Test = test,
                CourseLevelSpeciality = courseLevelSpeciality,
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
    }
}