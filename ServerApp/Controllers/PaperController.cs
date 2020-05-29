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
            [FromQuery] long? testGroupId,
            [FromQuery] long? secretaryId,
            [FromQuery] long? supervisorId,
            [FromQuery] long? correctorId,
            
            [FromQuery] long? testGroupSecretaryId,
            [FromQuery] long? testGroupSupervisorId,
            [FromQuery] long? testGroupCorrectorId,
            
            [FromQuery] long? studentId )
        {
            IQueryable<Paper> queryable = _paperRepository.Set;

            if (testGroupId != null)
            {
                queryable = queryable.Where(p => p.TestGroupId == testGroupId.Value);
            }
            
            if (secretaryId != null)
            {
                queryable = queryable.Where(p =>
                    p.TestGroupSecretary != null && p.TestGroupSecretary.SecretaryId == secretaryId.Value
                );
            }
            
            if (correctorId != null)
            {
                queryable = queryable.Where(p =>
                    p.TestGroupCorrector != null && p.TestGroupCorrector.CorrectorId == correctorId.Value
                );
            }
            
            if (supervisorId != null)
            {
                queryable = queryable.Where(p =>
                    p.TestGroupSupervisor != null && p.TestGroupSupervisor.SupervisorId == supervisorId.Value
                );
            }
            
            
            if (testGroupSecretaryId != null)
            {
                queryable = queryable.Where(p => p.TestGroupSecretaryId == testGroupSecretaryId.Value );
            }
            
            if (testGroupCorrectorId != null)
            {
                queryable = queryable.Where(p => p.TestGroupCorrectorId == testGroupCorrectorId.Value );
            }
            
            if (testGroupSupervisorId != null)
            {
                queryable = queryable.Where(p => p.TestGroupSupervisorId == testGroupSupervisorId.Value );
            }

            if (studentId != null)
            {
                queryable = queryable.Where(p => p.StudentId == studentId.Value);
            }
            

            return queryable.ToList();
        }


        [HttpPost]
        [RequireQueryParameter("studentId")]
        [RequireQueryParameter("testGroupId")]
        [LoadStudent(Source = ParameterSource.Query)]
        [LoadTestGroup(Source = ParameterSource.Query, TestItemName = "test")]
        [PeriodDontHaveState(ItemName = "test", State = "FINISHED")]
        [AuthorizeTestGroupSupervisor]
        public CreatedAtActionResult Add(TestGroup testGroup, Student student, TestGroupSupervisor testGroupSupervisor)
        {
            Assert.RequireNonNull(student, nameof(student));
            Assert.RequireNonNull(testGroup, nameof(testGroup));
            Assert.RequireNonNull(testGroupSupervisor, nameof(testGroupSupervisor));
            

            if (!testGroup.Group.Equals(student.Group))
            {
                throw new IncompatibleEntityException<Student, TestGroup>(student, testGroup);
            }

            if (_paperRepository.Exists(p => student.Equals(p.Student) && testGroup.Equals(p.TestGroup)))
            {
                throw new InvalidOperationException("{paper.constraints.uniqueStudent}");
            }
            

            Paper paper = new Paper
            {
                Student = student,
                TestGroup = testGroup,
                TestGroupSupervisor = testGroupSupervisor,
                SupervisorUserId = testGroupSupervisor.Supervisor.UserId,
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
        [LoadPaper(TestGroupItemName = "testGroup", TestItemName = "test")]
        [PeriodNotClosed(ItemName = "test")]
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

        [HttpPut("{paperId}/supervisorComment")]
        [LoadPaper(TestGroupItemName = "testGroup")]
        [PeriodHaveState(ItemName = "testGroup", State = "PROGRESS")]
        [AuthorizeTestGroupSupervisor]
        public StatusCodeResult SupervisorComment(Paper paper, [FromQuery] string comment)
        {
            Assert.RequireNonNull(paper, nameof(paper));
            paper.SupervisorComment = comment;

            _paperRepository.Update(paper);
            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpPut("{paperId}/collect")]
        [LoadPaper(TestGroupItemName = "testGroup")]
        [PeriodHaveState(ItemName = "testGroup", State = "PROGRESS")]
        [AuthorizeTestGroupSupervisor]
        public StatusCodeResult Collect(Paper paper, User user, [FromQuery] DateTime? endDate = null)
        {
            if (endDate == null)
            {
                endDate = DateTime.Now;
            }

            Assert.RequireNonNull(paper, nameof(paper));
            Assert.RequireNonNull(user, nameof(user));
            paper.EndDate = endDate;
            paper.CollectorUserId = user.Id;

            _paperRepository.Update(paper);
            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{paperId}/report")]
        [LoadPaper(TestGroupItemName = "testGroup")]
        [PeriodHaveState(ItemName = "testGroup", State = "FINISHED")]
        [PeriodNotClosed(ItemName = "testGroup")]
        [AuthorizeTestGroupSecretary]
        public AcceptedResult Report(Paper paper, TestGroupSecretary testGroupSecretary, PaperReportForm form)
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
            paper.SecretaryUserId = testGroupSecretary.Secretary.UserId;
            paper.Anonymity = form.Anonymity;
            paper.SecretaryComment = form.Comment;

            _paperRepository.Update(paper);
            return Accepted(paper);
        }

        [HttpPut("{paperId}/score")]
        [LoadPaper(TestItemName = "test", TestGroupItemName = "testGroup")]
        [PeriodNotClosed(ItemName = "test")]
        [AuthorizeTestGroupCorrector]
        public StatusCodeResult Score(Paper paper, TestGroupCorrector testGroupCorrector,
            [FromQuery] double score)
        {
            Assert.RequireNonNull(paper, nameof(paper));

            if (paper.TestGroup.Test.MultipleScore)
            {
                throw new InvalidOperationException("{paper.constraints.multipleScore}");
            }

            if (paper.TestGroup.Test.Radical < score)
            {
                throw new InvalidValueException("{paper.constraints.scoreLowerOrEqualThanTestRadical}");
            }

            paper.TestGroupCorrector = testGroupCorrector;
            paper.CorrectorUserId = testGroupCorrector.Corrector.UserId;
            paper.Score = score;
            _paperRepository.Update(paper);

            return StatusCode(StatusCodes.Status202Accepted);
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
        
        [HttpPut("{paperId}/correctorComment")]
        [LoadPaper(TestGroupItemName = "testGroup")]
        [PeriodHaveState(ItemName = "testGroup", State = "PROGRESS")]
        [AuthorizeTestGroupCorrector]
        public StatusCodeResult CorrectorComment(Paper paper, [FromQuery] string comment)
        {
            Assert.RequireNonNull(paper, nameof(paper));
            paper.CorrectorComment = comment;

            _paperRepository.Update(paper);
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