using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Filters;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers
{
    [Route("api/scorePapers")]
    public class ScorePaperController : Controller
    {
        private IRepository<ScorePaper, long> _scorePaperRepository;
        private IRepository<TestScore, long> _testScoreRepository;
        private DbContext _dbContext;

        public ScorePaperController(IRepository<ScorePaper, long> scorePaperRepository,
            DbContext dbContext,
            IRepository<TestScore, long> testScoreRepository)
        {
            _dbContext = dbContext;
            _scorePaperRepository = scorePaperRepository;
            _testScoreRepository = testScoreRepository;
        }

        [HttpGet("{scorePaperId}")]
        public ScorePaper Get(long scorePaperId) => _scorePaperRepository.Find(scorePaperId);

        [HttpGet]
        public IEnumerable<ScorePaper> List(long? paperId, int take = 100, int skip = 0)
        {
            IQueryable<ScorePaper> queryable = _scorePaperRepository.Set;

            if (paperId != null)
            {
                queryable = queryable.Where(s => s.PaperId == paperId);
            }

            var collection = queryable.Take(take).Skip(skip);

            return collection.ToList();
        }


        [HttpPut]
        [RequireQueryParameter("paperId")]
        [LoadPaper(TestItemName = "test", TestGroupItemName = "testGroup", Source = ParameterSource.Query)]
        [IsOpen(ItemName = "test")]
        [AuthorizeTestGroupCorrector]
        public OkObjectResult Scores(Paper paper, TestGroupCorrector testGroupCorrector,
            [FromBody] List<ScorePaperForm> form)
        {
            Assert.RequireNonNull(paper, nameof(paper));
            Assert.RequireNonNull(form, nameof(form));

            if (!paper.Test.MultipleScore)
            {
                throw new InvalidOperationException("{paper.constraints.singleScore}");
            }


            List<ScorePaper> scorePapers = new List<ScorePaper>(form.Count);

            foreach (var item in form)
            {
                scorePapers.Add(AddOrUpdatePaperScore(paper, _testScoreRepository.Find(item.TestScoreId), item.Value));
            }

            paper.Score = scorePapers.Sum(s => s.Value);
            paper.TestGroupCorrector = testGroupCorrector;
            paper.CorrectorUserId = testGroupCorrector.Corrector.UserId;
            testGroupCorrector.PaperCount++;
            
            _dbContext.Update(paper);
            _dbContext.Update(testGroupCorrector);
            _dbContext.SaveChanges();

            return Ok(scorePapers);
        }


        public ScorePaper AddOrUpdatePaperScore(Paper paper, TestScore testScore, double value)
        {
            if (!testScore.Test.Equals(paper.Test))
            {
                throw new IncompatibleEntityException<TestScore, Paper>(testScore, paper);
            }

            if (value > testScore.Radical)
            {
                throw new InvalidValueException("{paperScore.constraints.valueLowerOrEqualThanRadical}");
            }

            ScorePaper paperScore =
                _scorePaperRepository.First(s => paper.Equals(s.Paper) && testScore.Equals(s.TestScore));

            if (paperScore == null)
            {
                paperScore = new ScorePaper
                {
                    TestScore = testScore,
                    Paper = paper,
                    Value = value
                };
                _dbContext.Set<ScorePaper>().Add(paperScore);
            }
            else
            {
                paperScore.Value = value;
                _dbContext.Set<ScorePaper>().Update(paperScore);
            }

            return paperScore;
        }
    }
}