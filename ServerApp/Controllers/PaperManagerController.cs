using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
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
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    [Route("api/paperManagers")]
    public class PaperManagerController : Controller
    {
        private readonly IRepository<PaperManager, long> _paperManagerRepository;
        private readonly ILogger<PaperManagerController> _logger;


        public PaperManagerController(IRepository<PaperManager, long> paperManagerRepository, 
            ILogger<PaperManagerController> logger)
        {
            _paperManagerRepository = paperManagerRepository;
            _logger = logger;
        }


        [HttpGet("{paperManagerId}")]
        [LoadPaperManager]
        public PaperManager Find(PaperManager paperManager) => paperManager;

        [HttpGet]
        [LoadExamination(Source = ParameterSource.Query)]
        public IEnumerable<PaperManager> List(Test test, TestGroup testGroup, int skip = 0, int take = 20)
        {
            IQueryable<PaperManager> queryable = _paperManagerRepository.Set;
            
            if (test != null)
            {
                queryable = queryable.Where(p => test.Equals(p.TestGroup.Test));
            }
            if (testGroup != null)
            {
                queryable = queryable.Where(p => testGroup.Equals(p.TestGroup));
            }

            queryable = queryable.Skip(skip).Take(take);
            return queryable.ToList();
        }


        [HttpPost]
        [LoadExamination(Source = ParameterSource.Query)]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished}")]
        public CreatedAtActionResult Add(TestGroup testGroup, User user, [FromQuery] string userId)
        {
            if (_paperManagerRepository.Exists(p => testGroup.Equals(p.TestGroup) && p.UserId == userId))
            {
                throw new InvalidValueException("{paperManager.constraints.uniqueUserId}");
            }

            PaperManager paperManager = new PaperManager
            {
                UserId = userId,
                TestGroup = testGroup
            };

            paperManager = _paperManagerRepository.Save(paperManager);

            _logger.LogInformation($"New paperManager: {paperManager}");
            return CreatedAtAction("Find", new {paperManager.Id}, paperManager);
        }


        [HttpDelete("{paperManagerId}")]
        [LoadPaperManager(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished}")]
        public NoContentResult Delete(PaperManager paperManager)
        {
            Assert.RequireNonNull(paperManager, nameof(paperManager));
            _paperManagerRepository.Delete(paperManager);
            return NoContent();
        }
    }
}