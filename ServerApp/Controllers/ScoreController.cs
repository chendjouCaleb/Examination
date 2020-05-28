using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    [Route("api/tests/{testId}/scores")]
    public class ScoreController : Controller
    {
        private readonly IRepository<Score, long> _scoreRepository;


        public ScoreController(IRepository<Score, long> scoreRepository)
        {
            _scoreRepository = scoreRepository;
        }


        [HttpGet("{scoreId}")]
        [LoadScore]
        public Score Find(Score score) => score;


        [HttpGet]
        [LoadTest(ParameterName = "testId")]
        public IEnumerable<Score> List(Test test)
        {
            return _scoreRepository.Set.Where(g => test.Equals(g.Test)).ToList();
        }


        [HttpPost]
        [LoadTest(ParameterName = "testId")]
        public CreatedAtActionResult Add(Test test, [FromBody] ScoreForm form)
        {
            Assert.RequireNonNull(test, nameof(test));
            Assert.RequireNonNull(form, nameof(form));

            double totalRadical = _scoreRepository.List(g => test.Equals(g.Test))
                                   .Sum(e => e.Radical)
                               + form.Radical;

            if (_scoreRepository.Exists(t => test.Equals(t.Test) && t.Name == form.Name))
            {
                throw new InvalidValueException("{test.score.constraints.uniqueName}");
            }

            if (totalRadical > test.Radical)
            {
                throw new InvalidValueException("{test.score.constraints.totalLowerOrEqualsThanRadical}");
            }

            Score score = new Score
            {
                Name = form.Name,
                Radical = form.Radical,
                Test = test
            };

            _scoreRepository.Save(score);

            return CreatedAtAction("Find", new {score.Id}, score);
        }


        public StatusCodeResult ChangeName(Score score, string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentNullException(nameof(name));
            }

            if (_scoreRepository.Exists(t => score.Test.Equals(t.Test) && t.Name == name))
            {
                throw new InvalidValueException("{test.score.constraints.uniqueName}");
            }

            score.Name = name;
            _scoreRepository.Update(score);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [LoadScore]
        [HttpDelete("{scoreId}")]
        public NoContentResult Delete(Score score)
        {
            _scoreRepository.Delete(score);
            return NoContent();
        }
    }
}