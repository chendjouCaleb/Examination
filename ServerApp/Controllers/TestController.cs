using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace Exam.Controllers
{
    [Route("api/tests")]
    public class TestController : Controller
    {
        private IRepository<Test, long> _testRepository;
        private IRepository<Examination, long> _examinationRepository;


        [HttpGet("{testId}")]
        [LoadTest]
        public Test Find(Test test) => test;


        [HttpGet]
        [LoadExamination]
        public IEnumerable<Test> List(Examination examination, [FromQuery] string state)
        {
            IQueryable<Test> tests = _testRepository.Set;
            if (examination != null)
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
        public CreatedAtActionResult Add(Examination examination, Speciality speciality, User user, TestForm form)
        {
            Assert.RequireNonNull(examination, nameof(examination));
            Assert.RequireNonNull(speciality, nameof(speciality));
            Assert.RequireNonNull(user, nameof(user));
            Assert.RequireNonNull(form, nameof(form));

            if (_testRepository.Exists(t => examination.Equals(t.Examination) && t.Code == form.Code))
            {
                throw new InvalidOperationException("{test.constraints.uniqueCode}");
            }
            
            if (_testRepository.Exists(t => examination.Equals(t.Examination) && t.Code == form.Name))
            {
                throw new InvalidOperationException("{test.constraints.uniqueName}");
            }

            Test test = new Test
            {
                RegisterUserId = user.Id,
                Examination = examination,
                Name = form.Name,
                Code = form.Code,
                Coefficient = form.Coefficient,
                ExpectedStartDate = form.ExpectedStartDate,
                ExpectedEndDate = form.ExpectedEndDate
            };

            _testRepository.Save(test);

            examination.TestCount += 1;
            _examinationRepository.Update(examination);


            return CreatedAtAction("Find", new {test.Id}, test);
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