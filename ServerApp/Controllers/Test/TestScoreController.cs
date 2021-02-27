using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    [Route("api/testScores")]
    public class TestScoreController : Controller
    {
        private readonly IRepository<TestScore, long> _testScoreRepository;
        private readonly IRepository<Test, long> _testRepository;

        public TestScoreController(IRepository<TestScore, long> testScoreRepository,
            IRepository<Test, long> testRepository)
        {
            _testScoreRepository = testScoreRepository;
            _testRepository = testRepository;
        }


        [HttpGet("{testScoreId}")]
        [LoadTestScore]
        public TestScore Find(TestScore testScore) => testScore;

        [HttpGet("find/name")]
        [RequireQueryParameters(new[] {"testScoreId", "name"})]
        public TestScore FindByName([FromQuery] long testId, [FromQuery] string name)
        {
            return _testScoreRepository.First(s => s.TestId == testId && s.Name == name);
        }


        [HttpGet]
        [LoadTest(ParameterName = "testId", Source = ParameterSource.Query)]
        [RequireQueryParameter("testId")]
        public IEnumerable<TestScore> List(Test test)
        {
            return _testScoreRepository.Set.Where(g => test.Equals(g.Test)).ToList();
        }

        public List<TestScore> Copy(Test test, Course course)
        {
            Assert.RequireNonNull(test, nameof(test));
            Assert.RequireNonNull(course, nameof(course));

            var scores = course.Scores;

            if (!test.MultipleScore && scores.Count > 0)
            {
                test.MultipleScore = true;
            }

            var testScores = new List<TestScore>();
            foreach (var score in scores)
            {
                TestScore testScore = new TestScore
                {
                    Name = score.Name,
                    Radical = score.Radical,
                    Test = test
                };

                testScores.Add(testScore);
            }

            return testScores;
        }

        [HttpPost]
        [ValidModel]
        [RequireQueryParameter("testId")]
        [LoadTest(SchoolItemName = "school", Source = ParameterSource.Query)]
        [IsPlanner]
        public CreatedAtActionResult Add(Test test, [FromBody] TestScoreForm form)
        {
            Assert.RequireNonNull(test, nameof(test));
            Assert.RequireNonNull(form, nameof(form));

            double totalRadical = _testScoreRepository.List(g => test.Equals(g.Test))
                                      .Sum(e => e.Radical)
                                  + form.Radical;

            if (_testScoreRepository.Exists(t => test.Equals(t.Test) && t.Name == form.Name))
            {
                throw new InvalidValueException("{testScore.constraints.uniqueName}");
            }

            if (totalRadical > test.Radical)
            {
                throw new InvalidValueException("{testScore.constraints.totalLowerOrEqualsThanRadical}");
            }

            TestScore testScore = new TestScore
            {
                Name = form.Name,
                Radical = form.Radical,
                Test = test
            };

            _testScoreRepository.Save(testScore);

            if (!test.MultipleScore)
            {
                test.MultipleScore = true;
                _testRepository.Update(test);
            }

            return CreatedAtAction("Find", new {testScore.Id}, testScore);
        }


        [HttpPut("{testScoreId}/name")]
        [LoadTestScore(SchoolItemName = "school")]
        [RequireQueryParameter("name")]
        [IsPlanner]
        public StatusCodeResult ChangeName(TestScore testScore, [FromQuery] string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentNullException(nameof(name));
            }

            if (_testScoreRepository.Exists(t => testScore.Test.Equals(t.Test) && t.Name == name))
            {
                throw new InvalidValueException("{testScore.constraints.uniqueName}");
            }

            testScore.Name = name;
            _testScoreRepository.Update(testScore);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpDelete("{testScoreId}")]
        [LoadTestScore(SchoolItemName = "school")]
        [IsPlanner]
        public NoContentResult Delete(TestScore testScore)
        {
            Test test = testScore.Test;
            _testScoreRepository.Delete(testScore);
            if (_testScoreRepository.Count(s => test.Equals(s.Test)) == 0)
            {
                test.MultipleScore = false;
                _testRepository.Update(test);
            }

            return NoContent();
        }
    }
}