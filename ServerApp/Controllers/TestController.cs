﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using Everest.AspNetStartup.Exceptions;
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

        public TestController(IRepository<Test, long> testRepository,
            IRepository<Examination, long> examinationRepository)
        {
            _testRepository = testRepository;
            _examinationRepository = examinationRepository;
        }


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

        public Test GetOverlapTest(Examination examination, [FromBody] ExpectedPeriod period)
        {
            return period.ExpectedOverlap(examination.Tests);
        }


        [HttpPost]
        public CreatedAtActionResult Add(Examination examination, Speciality speciality, TestForm form, User user)
        {
            Assert.RequireNonNull(examination, nameof(examination));
            Assert.RequireNonNull(user, nameof(user));
            Assert.RequireNonNull(form, nameof(form));

            if (_testRepository.Exists(t => examination.Equals(t.Examination) && t.Code == form.Code))
            {
                throw new InvalidValueException("{test.constraints.uniqueCode}");
            }


            if (speciality != null && !examination.Equals(speciality.Examination))
            {
                throw new IncompatibleEntityException<Examination, Speciality>(examination, speciality);
            }
            
            Test overlap = form.ExpectedOverlap(examination.Tests);
            if (overlap != null)
            {
                throw new OverlapPeriodException<Test, TestForm>(overlap, form);
            }


            Test test = new Test
            {
                RegisterUserId = user.Id,
                Examination = examination,
                Speciality = speciality,
                Name = form.Name,
                Code = form.Code,
                Radical = form.Radical,
                Coefficient = form.Coefficient,
                UseAnonymity = form.UseAnonymity,
                ExpectedStartDate = form.ExpectedStartDate,
                ExpectedEndDate = form.ExpectedEndDate
            };

            _testRepository.Save(test);
            _examinationRepository.Update(examination);
            
            return CreatedAtAction("Find", new {test.Id}, test);
        }


        public StatusCodeResult ChangeDates(Test test, [FromBody] ExpectedPeriod form)
        {
            Assert.RequireNonNull(test, nameof(test));
            Assert.RequireNonNull(form, nameof(form));

            List<Test> otherTests = test.Examination.Tests;
            otherTests.RemoveAll(t => t.Equals(test));

            Test overlap = form.ExpectedOverlap(otherTests);
            if (overlap != null)
            {
                throw new OverlapPeriodException<Test, ExpectedPeriod>(overlap, form);
            }

            test.ExpectedStartDate = form.ExpectedStartDate;
            test.ExpectedEndDate = form.ExpectedEndDate;
            _testRepository.Update(test);

            return StatusCode(StatusCodes.Status202Accepted);
        }
        
        
        [HttpPut("{testId}/start")]
        public StatusCodeResult Start(Test test)
        {
            Assert.RequireNonNull(test, nameof(test));

            if (test.Examination.State != PeriodState.PROGRESS)
            {
                throw new InvalidOperationException("{test.constraints.startAfterExamination}");
            }
            
            test.StartDate = DateTime.Now;
            _testRepository.Update(test);
            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpPut("{testId}/close")]
        public StatusCodeResult Close(Test test)
        {
            Assert.RequireNonNull(test, nameof(test));

            if (test.GetState() != PeriodState.PROGRESS)
            {
                throw new InvalidOperationException("{test.constraints.endAfterStart}");
            }  
            test.EndDate = DateTime.Now;
            _testRepository.Update(test);
            return StatusCode(StatusCodes.Status202Accepted);
        }
        
        [HttpPut("{testId}/restart")]
        public StatusCodeResult Restart(Test test)
        {
            Assert.RequireNonNull(test, nameof(test));

            if (test.GetState() != PeriodState.FINISHED)
            {
                throw new InvalidOperationException("{test.constraints.restartAfterEnd}");
            }  
            
            test.EndDate = null;
            _testRepository.Update(test);
            return StatusCode(StatusCodes.Status202Accepted);
        }

        public StatusCodeResult ChangeCode(Test test, string code)
        {
            if (string.IsNullOrWhiteSpace(code))
            {
                throw new ArgumentNullException(nameof(code));
            }

            if (_testRepository.Exists(t => test.Examination.Equals(t.Examination) && t.Code == code))
            {
                throw new InvalidValueException("{test.constraints.uniqueCode}");
            }

            test.Code = code;
            _testRepository.Update(test);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        public StatusCodeResult ChangeName(Test test, string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentNullException(nameof(name));
            }
            
            test.Name = name;
            _testRepository.Update(test);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        public StatusCodeResult ChangeCoefficient(Test test, [FromQuery] uint coefficient)
        {
            if (coefficient == 0)
            {
                coefficient = 1;
            }

            test.Coefficient = coefficient;
            _testRepository.Update(test);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        public StatusCodeResult ChangeAnonymityState(Test test)
        {
            test.UseAnonymity = !test.UseAnonymity;
            _testRepository.Update(test);
            return StatusCode(StatusCodes.Status202Accepted);
        }

        public StatusCodeResult ChangePublicationState(Test test)
        {
            if (!test.IsPublished)
            {
                test.PublicationDate = DateTime.Now;
            }
            else
            {
                test.PublicationDate = null;
            }

            _testRepository.Update(test);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        public StatusCodeResult ChangeCloseState(Test test)
        {
            if (!test.IsClosed)
            {
                test.ClosingDate = DateTime.Now;
            }
            else
            {
                test.ClosingDate = null;
            }

            _testRepository.Update(test);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        public NoContentResult Delete(Test test)
        {
            _testRepository.Delete(test);
            return NoContent();
        }
    }
}