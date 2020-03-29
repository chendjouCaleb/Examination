using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Loaders;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    [Route("api/tests")]
    public class TestController : Controller
    {
        private IRepository<Test, long> _testRepository;


        [HttpGet("{testId}")]
        [LoadTest]
        public Test Find(Test test) => test;


        [HttpGet]
        [LoadExamination]
        public IEnumerable<Test> List([FromQuery] string userId, Examination examination, [FromQuery] string state)
        {
            IQueryable<Test> tests = _testRepository.Set;
            if (!string.IsNullOrWhiteSpace(userId))
            {
                tests = tests.Where(t => t.Examination.Id == examination.Id);
            }

            if (!string.IsNullOrWhiteSpace(state))
            {
                tests = tests.Where(t => t.State == state);
            }

            return tests.ToList();
        }


        [HttpPost]
        public CreatedAtActionResult Add(Examination examination, Speciality speciality, [FromQuery] long[] supervisorIds,
            [FromQuery] long[] correctorIds)
        {
            throw new NotImplementedException();
        }
    }
}