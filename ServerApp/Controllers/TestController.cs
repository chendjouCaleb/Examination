using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Loaders;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

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
        public CreatedAtActionResult Add(Examination examination, Speciality speciality, string userId)
        {
            throw new NotImplementedException();
        }


        public StatusCodeResult ChangeCode(Examination examination, string code)
        {
            throw new NotImplementedException();
        }
        

        public StatusCodeResult ChangeCoefficient(Examination examination, string coefficient)
        {
            throw new NotImplementedException();
        }


        public StatusCodeResult ChangePublicationState(Examination examination)
        {
            throw new NotImplementedException();
        }

        public StatusCodeResult ChangeCloseState(Examination examination)
        {
            throw new NotImplementedException();
        }
    }
}