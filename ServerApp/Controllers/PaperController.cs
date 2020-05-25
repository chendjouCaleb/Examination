using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    [Route("api/papers")]
    public class PaperController : Controller
    {
        private IRepository<Paper, long> _paperRepository;

        public PaperController(IRepository<Paper, long> paperRepository)
        {
            _paperRepository = paperRepository;
        }

        [HttpGet("{paperId}")]
        public Paper Find(long paperId) => _paperRepository.Find(paperId);


        [HttpGet]
        public IEnumerable<Paper> List(
            [FromQuery] long? paperManagerId,
            [FromQuery] long? testGroupId,
            [FromQuery] long? correctorId,
            [FromQuery] long? studentId,
            [FromQuery] long? testSupervisorId,
            [FromQuery] int skip = 0, [FromQuery] int take = 20)
        {
            IQueryable<Paper> queryable = _paperRepository.Set;

            if (paperManagerId != null)
            {
                queryable = queryable.Where(p => p.PaperManagerId == paperManagerId.Value);
            }

            if (testGroupId != null)
            {
                queryable = queryable.Where(p => p.TestGroupId == testGroupId.Value);
            }

            if (correctorId != null)
            {
                queryable = queryable.Where(p => p.CorrectorId == correctorId.Value);
            }

            if (studentId != null)
            {
                queryable = queryable.Where(p => p.StudentId == studentId.Value);
            }

            if (testSupervisorId != null)
            {
                queryable = queryable.Where(p => p.TestSupervisorId == testSupervisorId.Value);
            }

            queryable = queryable.Skip(skip).Take(take);

            return queryable.ToList();
        }


        public CreatedAtActionResult Add(Student student, TestGroup testGroup)
        {
            Assert.RequireNonNull(student, nameof(student));
            Assert.RequireNonNull(testGroup, nameof(testGroup));

            if (!testGroup.Group.Equals(student.Group))
            {
                throw new IncompatibleEntityException<Student, TestGroup>(student, testGroup);
            }

            if (testGroup.Test.State == PeriodState.FINISHED)
            {
                throw new InvalidOperationException("{paper.constraints.addBeforeFinish}");
            }

            Paper paper = new Paper
            {
                Student = student,
                TestGroup = testGroup
            };

            paper = _paperRepository.Save(paper);

            return CreatedAtAction("Find", new {paper.Id}, paper);
        }


        public StatusCodeResult AddAll(TestGroup testGroup)
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
                    TestGroup = testGroup
                };
                _paperRepository.Save(paper);
            });

            return StatusCode(StatusCodes.Status201Created);
        }


        public StatusCodeResult Register(Paper paper, [FromQuery] DateTime date, User user)
        {
            paper.ArrivalDate = date;
            paper.RegisterUserId = user.Id;
            _paperRepository.Update(paper);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        public StatusCodeResult Report(Paper paper, [FromBody] PaperReportForm form, User user)
        {
            Assert.RequireNonNull(paper, nameof(paper));
            Assert.RequireNonNull(form, nameof(form));
            Assert.RequireNonNull(user, nameof(user));
            paper.EndDate = form.EndDate;
            paper.Comment = form.Comment;
            paper.ReportUserId = user.Id;
            
            _paperRepository.Update(paper);
            return StatusCode(StatusCodes.Status202Accepted);
        }


        public AcceptedResult Manage(Paper paper, PaperManager paperManager, PaperManageForm form)
        {
            Assert.RequireNonNull(paper, nameof(paper));
            Assert.RequireNonNull(paperManager, nameof(paperManager));
            Assert.RequireNonNull(form, nameof(form));

            if (_paperRepository.Exists(p => p.Anonymity == form.Anonymity
                                             && p.TestGroup.Equals(paper.TestGroup)
                                             && !p.Equals(paper)))
            {
                throw new InvalidOperationException("{paper.constraints.uniqueAnonymity}");
            }
            
            paper.PaperManager = paperManager;
            paper.PaperManagerUserId = paperManager.UserId;
            paper.Anonymity = form.Anonymity;
            paper.Comment = form.Comment;
            
            _paperRepository.Update(paper);
            return Accepted(paper);
        }

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