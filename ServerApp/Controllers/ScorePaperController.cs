using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Filters;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    
    [Route("api/papers")]
    public class ScorePaperController:Controller
    {
        private IRepository<ScorePaper, long> _scorePaperRepository;
        private IRepository<Paper, long> _paperRepository;
        private IRepository<Score, long> _scoreRepository;

        public ScorePaperController(IRepository<ScorePaper, long> scorePaperRepository, 
            IRepository<Paper, long> paperRepository, 
            IRepository<Score, long> scoreRepository)
        {
            _scorePaperRepository = scorePaperRepository;
            _paperRepository = paperRepository;
            _scoreRepository = scoreRepository;
        }

        

        [HttpGet("{paperId}/scores")]
        [LoadPaper]
        public IList<ScorePaper> Scores(Paper paper)
        {
            if (paper == null)
            {
                throw new ArgumentNullException(nameof(paper));
            }
            return _scorePaperRepository.List(s => paper.Equals(s.Paper) );
        }
        
        [HttpPut("{paperId}/scores")]
        [LoadPaper(TestItemName = "test", TestGroupItemName = "testGroup")]
        [PeriodNotClosed(ItemName = "test")]
        [AuthorizeTestGroupCorrector]
        public OkObjectResult Scores(Paper paper, TestGroupCorrector testGroupCorrector, [FromBody] List<ScorePaperForm> form)
        {
            Assert.RequireNonNull(paper, nameof(paper));
            Assert.RequireNonNull(form, nameof(form));
            
            if (!paper.TestGroup.Test.MultipleScore)
            {
                throw new InvalidOperationException("{paper.constraints.singleScore}");
            }
            
            
            List<ScorePaper> scorePapers = new List<ScorePaper>(form.Count);

            foreach (var item in form)
            {
                scorePapers.Add(AddOrUpdatePaperScore(paper, _scoreRepository.Find(item.ScoreId), item.Value));
            }
            
            paper.TestGroupCorrector = testGroupCorrector;
            paper.CorrectorUserId = testGroupCorrector.Corrector.UserId;
            _paperRepository.Update(paper);

            return Ok(scorePapers);
        }
        
        
        public ScorePaper AddOrUpdatePaperScore(Paper paper, Score score, double value)
        {
            if (!score.Test.Equals(paper.TestGroup.Test))
            {
                throw new IncompatibleEntityException<Score, Paper>(score, paper);
            }

            if (value > score.Radical)
            {
                throw new InvalidValueException("{paperScore.constraints.valueLowerOrEqualThanRadical}");
            }
            
            ScorePaper paperScore = _scorePaperRepository.First(s => paper.Equals(s.Paper) && score.Equals(s.Score));

            if (paperScore == null)
            {
                paperScore = _scorePaperRepository.Save(new ScorePaper
                {
                    Score = score,
                    Paper = paper,
                    Value = value
                });
            }
            else
            {
                paperScore.Value = value;
                _scorePaperRepository.Update(paperScore);
            }

            return paperScore;
        }
    }
}