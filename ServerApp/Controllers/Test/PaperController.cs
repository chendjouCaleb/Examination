using System;
using System.Collections.Generic;
using System.Linq;
using Castle.Core.Internal;
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
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers
{
    [Route("api/papers")]
    public class PaperController : Controller
    {
        private readonly IRepository<Paper, long> _paperRepository;
        private readonly IRepository<ScorePaper, long> _scorePaperRepository;
        private readonly IRepository<ExaminationStudent, long> _examinationStudentRepository;
        private readonly ScorePaperController _scorePaperController;
        private readonly DbContext _dbContext;


        public PaperController(IRepository<Paper, long> paperRepository,
            IRepository<ScorePaper, long> scorePaperRepository,
            DbContext dbContext,
            IRepository<ExaminationStudent, long> examinationStudentRepository,
            ScorePaperController scorePaperController)
        {
            _dbContext = dbContext;
            _paperRepository = paperRepository;
            _scorePaperRepository = scorePaperRepository;
            _examinationStudentRepository = examinationStudentRepository;
            _scorePaperController = scorePaperController;
        }

        [HttpGet("{paperId}")]
        [LoadPaper]
        public Paper Find(long paperId) => _paperRepository.Find(paperId);


        [HttpGet]
        public IEnumerable<Paper> List(User user,
            [FromQuery] long? testId,
            [FromQuery] long? testGroupId,
            [FromQuery] long? secretaryId,
            [FromQuery] long? supervisorId,
            [FromQuery] long? correctorId,
            [FromQuery] long? testGroupSecretaryId,
            [FromQuery] long? testGroupSupervisorId,
            [FromQuery] long? testGroupCorrectorId,
            [FromQuery] long? testLevelSpecialityId,
            [FromQuery] long? examinationStudentId, int take = 200, int skip = 0)
        {
            IQueryable<Paper> queryable = _paperRepository.Set;

            if (testId != null)
            {
                queryable = queryable.Where(p => p.TestId == testId.Value);
            }

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
                queryable = queryable.Where(p => p.TestGroupSecretaryId == testGroupSecretaryId.Value);
            }

            if (testGroupCorrectorId != null)
            {
                queryable = queryable.Where(p => p.TestGroupCorrectorId == testGroupCorrectorId.Value);
            }

            if (testGroupSupervisorId != null)
            {
                queryable = queryable.Where(p => p.TestGroupSupervisorId == testGroupSupervisorId.Value);
            }

            if (examinationStudentId != null)
            {
                queryable = queryable.Where(p => p.ExaminationStudentId == examinationStudentId);
            }
            
            if (testLevelSpecialityId != null)
            {
                queryable = queryable.Where(p => p.TestLevelSpecialityId == testLevelSpecialityId);
            }

            queryable = queryable.Include(p => p.ScorePapers);

            var collection = queryable.Take(take).Skip(skip).ToList();

            
            if (collection.Count == 0)
            {
                return collection;
            }
            //We take the test of the one item, because all items have the same test.
            Test test = collection[0].Test;

            if (test.IsPublished)
            {
                return collection;
            }

            bool isCorrector = _dbContext.Set<TestGroupCorrector>()
                .Any(c => c.Corrector.UserId == user.Id && test.Equals(c.TestGroup.Test));

            if (!isCorrector)
            {
                foreach (Paper paper in collection)
                {
                    paper.CorrectorComment = null;
                    paper.CorrectorUserId = null;
                    paper.TestGroupCorrectorId = null;
                    paper.Score = null;
                    paper.ScorePapers.ForEach(s => s.Value = 0);
                }
            }

            return collection;
            //return new ItemList<Paper>(queryable.ToList(), collection.Count(), take, skip);
        }

        [HttpGet("{paperId}/scores")]
        public IEnumerable<ScorePaper> ScorePapers(long paperId)
        {
            return _scorePaperRepository.List(s => paperId == s.PaperId);
        }

        public Paper _Add(Test test, ExaminationStudent examinationStudent)
        {
            return _Add(test, null, examinationStudent);
        }

        public Paper Add(Test test, ExaminationStudent examinationStudent)
        {
            Paper paper = _Add(test, examinationStudent);
            _dbContext.SaveChanges();
            return paper;
        }

        public Paper Add(Test test, TestLevelSpeciality testLevelSpeciality, ExaminationStudent examinationStudent)
        {
            Paper paper = _Add(test, testLevelSpeciality, examinationStudent);
            _dbContext.SaveChanges();
            return paper;
        }

        public Paper _Add(Test test, TestLevelSpeciality testLevelSpeciality, ExaminationStudent examinationStudent)
        {
            Assert.RequireNonNull(test, nameof(test));
            Assert.RequireNonNull(examinationStudent, nameof(examinationStudent));

            if (test.ExaminationLevelId != examinationStudent.ExaminationLevelId)
            {
                throw new IncompatibleEntityException(test, examinationStudent);
            }

            if (testLevelSpeciality != null && testLevelSpeciality.TestId != test.Id)
            {
                throw new IncompatibleEntityException(test, testLevelSpeciality);
            }

            Paper paper = _paperRepository
                .First(p => p.ExaminationStudentId == examinationStudent.Id && test.Equals(p.Test));
            if (paper != null)
            {
                return paper;
            }


            paper = new Paper
            {
                ExaminationStudent = examinationStudent,
                Test = test,
                TestLevelSpeciality = testLevelSpeciality
            };


            _dbContext.Set<Paper>().Add(paper);
            return paper;
        }


        [HttpPost]
        [RequireQueryParameter("testId")]
        [LoadTest(Source = ParameterSource.Query, SchoolItemName = "school")]
        [IsOpen(ItemName = "test")]
        [IsPlanner]
        public ObjectResult AddAll(Test test)
        {
            Assert.RequireNonNull(test, nameof(test));
            if (test.State == PeriodState.FINISHED)
            {
                throw new InvalidOperationException("{paper.constraints.addBeforeFinish}");
            }

            List<Paper> papers = new List<Paper>();
            if (test.IsGeneral)
            {
                papers = _examinationStudentRepository
                    .List(e => test.ExaminationLevel.Equals(e.ExaminationLevel))
                    .Select(s => _Add(test, null, s)).ToList();
            }
            else
            {
                test.TestLevelSpecialities.ForEach(t => papers.AddRange(AddAll(t)));
            }

            test.PaperCount = (uint)papers.Count;
            test.NotGroupedStudentCount = (uint)papers.Count;
            _dbContext.Update(test);

            _dbContext.SaveChanges();

            return StatusCode(StatusCodes.Status201Created, papers);
        }

        public List<Paper> AddAll(TestLevelSpeciality testLevelSpeciality)
        {
            return _examinationStudentRepository
                .List(e => testLevelSpeciality.ExaminationLevelSpecialityId == e.ExaminationLevelSpecialityId)
                .Select(s => _Add(testLevelSpeciality.Test, testLevelSpeciality, s)).ToList();
        }

        [HttpPut("{paperId}/present")]
        [LoadPaper(TestGroupItemName = "testGroup", TestItemName = "test")]
        [AuthorizeTestGroupSupervisor]
        [IsOpen(ItemName = "test")]
        public StatusCodeResult ChangePresenceState(Paper paper, TestGroupSupervisor testGroupSupervisor)
        {
            Assert.RequireNonNull(paper, nameof(paper));
            Assert.RequireNonNull(testGroupSupervisor, nameof(testGroupSupervisor));
            Assert.RequireNonNull(testGroupSupervisor.Supervisor, nameof(testGroupSupervisor.Supervisor));


            if (!paper.IsPresent)
            {
                paper.StartDate = DateTime.Now;
                paper.TestGroupSupervisor = testGroupSupervisor;
                paper.SupervisorUserId = testGroupSupervisor.Supervisor.UserId;
                testGroupSupervisor.PaperCount++;
                paper.Test.PresentPaperCount++;
                if (paper.TestGroup != null)
                {
                    paper.TestGroup.PresentPaperCount++;
                }
            }
            else
            {
                paper.StartDate = null;
                paper.Test.PresentPaperCount--;
                if (paper.TestGroup != null)
                {
                    paper.TestGroup.PresentPaperCount--;
                }
            }

            _dbContext.Update(paper);
            _dbContext.Update(paper.Test);
            _dbContext.Update(testGroupSupervisor);
            if (paper.TestGroup != null)
            {
                _dbContext.Update(paper.TestGroup);
            }

            _paperRepository.Update(paper);
            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{paperId}/dates")]
        [LoadPaper(TestGroupItemName = "testGroup", TestItemName = "test")]
        [AuthorizeTestGroupSupervisor]
        [IsOpen(ItemName = "test")]
        public StatusCodeResult ChangeDate(Paper paper, [FromBody] PeriodForm form)
        {
            Assert.RequireNonNull(paper, nameof(paper));
            Assert.RequireNonNull(form, nameof(form));

            paper.StartDate = form.StartDate;
            paper.EndDate = form.EndDate;
            _paperRepository.Update(paper);

            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpPut("{paperId}/supervisorComment")]
        [LoadPaper(TestGroupItemName = "testGroup", TestItemName = "test")]
        [AuthorizeTestGroupSupervisor]
        [IsOpen(ItemName = "test")]
        public StatusCodeResult SupervisorComment(Paper paper, [FromQuery] string comment)
        {
            Assert.RequireNonNull(paper, nameof(paper));
            paper.SupervisorComment = comment;

            _paperRepository.Update(paper);
            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{paperId}/collect")]
        [LoadPaper(TestGroupItemName = "testGroup", TestItemName = "test")]
        [AuthorizeTestGroupSupervisor]
        [IsOpen(ItemName = "test")]
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
        [LoadPaper(TestGroupItemName = "testGroup", TestItemName = "test")]
        [IsOpen(ItemName = "test")]
        [AuthorizeTestGroupSecretary]
        public AcceptedResult Report(Paper paper, TestGroupSecretary testGroupSecretary,
            [FromBody] PaperReportForm form)
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
        [AuthorizeTestGroupCorrector]
        [IsOpen(ItemName = "test")]
        public StatusCodeResult Score(Paper paper, TestGroupCorrector testGroupCorrector,
            [FromQuery] double score)
        {
            Assert.RequireNonNull(paper, nameof(paper));

            if (paper.Test.MultipleScore)
            {
                throw new InvalidOperationException("{paper.constraints.multipleScore}");
            }

            if (paper.Test.Radical < score)
            {
                throw new InvalidValueException("{paper.constraints.scoreLowerOrEqualThanTestRadical}");
            }

            testGroupCorrector.PaperCount++;
            paper.TestGroupCorrector = testGroupCorrector;
            paper.CorrectorUserId = testGroupCorrector.Corrector.UserId;
            paper.Score = score;
            _dbContext.Update(paper);
            _dbContext.Update(testGroupCorrector);

            _dbContext.SaveChanges();

            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpPut("{paperId}/scores")]
        [LoadPaper(TestItemName = "test", TestGroupItemName = "testGroup")]
        [AuthorizeTestGroupCorrector]
        [IsOpen(ItemName = "test")]
        public OkObjectResult Scores(Paper paper, TestGroupCorrector testGroupCorrector,
            [FromBody] List<ScorePaperForm> form)
        {
            return _scorePaperController.Scores(paper, testGroupCorrector, form);
        }

        public ScorePaper AddOrUpdatePaperScore(Paper paper, TestScore testScore, double value)
        {
            return _scorePaperController.AddOrUpdatePaperScore(paper, testScore, value);
        }


        [HttpPut("{paperId}/correctorComment")]
        [LoadPaper(TestGroupItemName = "testGroup", TestItemName = "test")]
        [AuthorizeTestGroupCorrector]
        [IsOpen(ItemName = "test")]
        public StatusCodeResult CorrectorComment(Paper paper, [FromQuery] string comment)
        {
            Assert.RequireNonNull(paper, nameof(paper));
            paper.CorrectorComment = comment;

            _paperRepository.Update(paper);
            return StatusCode(StatusCodes.Status202Accepted);
        }


        public NoContentResult Delete(Paper paper)
        {
            _paperRepository.Delete(paper);
            return NoContent();
        }
    }
}