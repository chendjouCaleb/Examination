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
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    [Route("api/papers")]
    public class PaperController : Controller
    {
        private IRepository<Paper, long> _paperRepository;
        private IRepository<Score, long> _scoreRepository;
        private IRepository<ScorePaper, long> _scorePaperRepository;


        public PaperController(IRepository<Paper, long> paperRepository, 
            IRepository<Score, long> scoreRepository, 
            IRepository<ScorePaper, long> scorePaperRepository)
        {
            _paperRepository = paperRepository;
            _scoreRepository = scoreRepository;
            _scorePaperRepository = scorePaperRepository;
        }

        [HttpGet("{paperId}")]
        [LoadPaper]
        public Paper Find(long paperId) => _paperRepository.Find(paperId);


        [HttpGet]
        public IEnumerable<Paper> List(
            [FromQuery] long? secretaryId,
            [FromQuery] long? testGroupId,
            [FromQuery] long? correctorId,
            [FromQuery] long? studentId,
            [FromQuery] long? supervisorId,
            [FromQuery] int skip = 0, [FromQuery] int take = 20)
        {
            IQueryable<Paper> queryable = _paperRepository.Set;

            if (secretaryId != null)
            {
                queryable = queryable.Where(p =>
                    p.TestGroupSecretary != null && p.TestGroupSecretary.SecretaryId == secretaryId.Value
                );
            }

            if (testGroupId != null)
            {
                queryable = queryable.Where(p => p.TestGroupId == testGroupId.Value);
            }

            if (correctorId != null)
            {
                queryable = queryable.Where(p =>
                    p.TestGroupCorrector != null && p.TestGroupCorrector.CorrectorId == correctorId.Value
                );
            }

            if (studentId != null)
            {
                queryable = queryable.Where(p => p.StudentId == studentId.Value);
            }

            if (supervisorId != null)
            {
                queryable = queryable.Where(p =>
                    p.TestGroupSupervisor != null && p.TestGroupSupervisor.SupervisorId == supervisorId.Value
                );
            }

            queryable = queryable.Skip(skip).Take(take);

            return queryable.ToList();
        }


        [HttpPost]
        [RequireQueryParameter("studentId")]
        [RequireQueryParameter("testGroupId")]
        [LoadStudent(Source = ParameterSource.Query)]
        [LoadTestGroup(Source = ParameterSource.Query)]
        [AuthorizeTestGroupSupervisor]
        public CreatedAtActionResult Add(TestGroup testGroup, Student student, User user)
        {
            Assert.RequireNonNull(student, nameof(student));
            Assert.RequireNonNull(testGroup, nameof(testGroup));
            
            if (testGroup.Test.State == PeriodState.FINISHED)
            {
                throw new InvalidOperationException("{paper.constraints.addBeforeFinish}");
            }

            if (!testGroup.Group.Equals(student.Group))
            {
                throw new IncompatibleEntityException<Student, TestGroup>(student, testGroup);
            }
            

            Paper paper = new Paper
            {
                Student = student,
                TestGroup = testGroup,
                SupervisorUserId = user.Id,
                StartDate = DateTime.Now
            };

            paper = _paperRepository.Save(paper);

            return CreatedAtAction("Find", new {paper.Id}, paper);
        }


        public StatusCodeResult AddAll(TestGroup testGroup, User user)
        {
            Assert.RequireNonNull(testGroup, nameof(testGroup));
            if (testGroup.Test.State == PeriodState.FINISHED)
            {
                throw new InvalidOperationException("{paper.constraints.addBeforeFinish}");
            }

            testGroup.Group.Students.ForEach(student =>
            {
                Paper paper = new Paper
                {
                    Student = student,
                    TestGroup = testGroup,
                    SupervisorUserId = user.Id,
                };
                _paperRepository.Save(paper);
            });

            return StatusCode(StatusCodes.Status201Created);
        }


        [HttpPut("{paperId}/dates")]
        [LoadPaper(TestGroupItemName = "testGroup")]
        [AuthorizeTestGroupSupervisor]
        public StatusCodeResult ChangeDate(Paper paper,[FromBody] PeriodForm form)
        {
            Assert.RequireNonNull(paper, nameof(paper));
            Assert.RequireNonNull(form, nameof(form));

            paper.StartDate = form.StartDate;
            paper.EndDate = form.EndDate;
            _paperRepository.Update(paper);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{paperId}/collect")]
        [LoadPaper(TestGroupItemName = "testGroup")]
        [AuthorizeTestGroupSupervisor]
        public StatusCodeResult Collect(Paper paper, [FromBody] PaperCollectForm form, User user)
        {
            Assert.RequireNonNull(paper, nameof(paper));
            Assert.RequireNonNull(form, nameof(form));
            Assert.RequireNonNull(user, nameof(user));
            paper.EndDate = form.EndDate;
            paper.SupervisorComment = form.Comment;
            paper.CollectorUserId = user.Id;

            _paperRepository.Update(paper);
            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{paperId}/report")]
        [LoadPaper(TestGroupItemName = "testGroup")]
        [AuthorizeTestGroupSecretary]
        public AcceptedResult Report(Paper paper, TestGroupSecretary testGroupSecretary, User user, PaperReportForm form)
        {
            Assert.RequireNonNull(paper, nameof(paper));
            Assert.RequireNonNull(testGroupSecretary, nameof(testGroupSecretary));
            Assert.RequireNonNull(form, nameof(form));

            if (_paperRepository.Exists(p => p.Anonymity != null 
                                             && p.Anonymity == form.Anonymity
                                             && p.TestGroup.Equals(paper.TestGroup)
                                             && !p.Equals(paper)))
            {
                throw new InvalidOperationException("{paper.constraints.uniqueAnonymity}");
            }

            paper.TestGroupSecretary = testGroupSecretary;
            paper.SecretaryUserId = user.Id;
            paper.Anonymity = form.Anonymity;
            paper.SecretaryComment = form.Comment;

            _paperRepository.Update(paper);
            return Accepted(paper);
        }

        [HttpPut("{paperId}/score")]
        [LoadPaper(TestItemName = "test", TestGroupItemName = "testGroup")]
        [PeriodNotClosed(ItemName = "test")]
        [AuthorizeTestGroupCorrector]
        public StatusCodeResult Score(Paper paper, [FromQuery] decimal value)
        {
            Assert.RequireNonNull(paper, nameof(paper));

            if (paper.TestGroup.Test.MultipleScore)
            {
                throw new InvalidOperationException("{paper.constraints.multipleScore}");
            }

            if (paper.TestGroup.Test.Radical < value)
            {
                throw new InvalidValueException("{paper.constraints.scoreLowerOrEqualThanTestRadical}");
            }

            paper.Score = value;
            _paperRepository.Update(paper);

            return StatusCode(StatusCodes.Status202Accepted);
        } 
        
        
        [HttpPut("{paperId}/scores")]
        [LoadPaper(TestItemName = "test", TestGroupItemName = "testGroup")]
        [PeriodNotClosed(ItemName = "test")]
        [AuthorizeTestGroupCorrector]
        public StatusCodeResult Scores(Paper paper, [FromBody] List<ScorePaperForm> form)
        {
            Assert.RequireNonNull(paper, nameof(paper));
            Assert.RequireNonNull(form, nameof(form));
            
            if (!paper.TestGroup.Test.MultipleScore)
            {
                throw new InvalidOperationException("{paper.constraints.singleScore}");
            }
            if (paper.TestGroup.Test.Radical < form.Sum(i => i.Value))
            {
                throw new InvalidValueException("{paper.constraints.scoresLowerOrEqualThanTestRadical}");
            }
            
            List<ScorePaper> scorePapers = new List<ScorePaper>(form.Count);

            foreach (var paperForm in form)
            {
                Score score = _scoreRepository.Find(paperForm.ScoreId);
                if (!score.Test.Equals(paper.TestGroup.Test))
                {
                    throw new IncompatibleEntityException<Score, Paper>(score, paper);
                }

                ScorePaper scorePaper = new ScorePaper
                {
                    Score = score,
                    Paper = paper,
                    Value = paperForm.Value
                };
                scorePapers.Add(scorePaper);
            }
            
            scorePapers.ForEach(s => _scorePaperRepository.Save(s));
            
            return StatusCode(StatusCodes.Status202Accepted);
        } 

        [HttpDelete("{paperId}")]
        [LoadPaper(ExaminationItemName = "examinationId")]
        [AuthorizeExaminationAdmin]
        public NoContentResult Delete(Paper paper)
        {
            _paperRepository.Delete(paper);
            return NoContent();
        }


        public NoContentResult DeleteAll(TestGroup testGroup)
        {
            IEnumerable<Paper> papers = _paperRepository.List(p => testGroup.Equals(p.TestGroup));

            foreach (var paper in papers)
            {
                _paperRepository.Delete(paper);
            }

            return NoContent();
        }
    }
}