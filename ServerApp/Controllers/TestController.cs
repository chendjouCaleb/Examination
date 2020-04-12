﻿using System;
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

        public TestController(IRepository<Test, long> testRepository, IRepository<Examination, long> examinationRepository)
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
        public CreatedAtActionResult Add(Examination examination, Speciality speciality, User user, TestForm form)
        {
            Assert.RequireNonNull(examination, nameof(examination));
            Assert.RequireNonNull(user, nameof(user));
            Assert.RequireNonNull(form, nameof(form));

            if (_testRepository.Exists(t => examination.Equals(t.Examination) && t.Code == form.Code))
            {
                throw new InvalidOperationException("{test.constraints.uniqueCode}");
            }
            

            if (speciality != null && examination.Equals(speciality.Examination))
            {
                throw new IncompatibleEntityException<Examination, Speciality> (examination, speciality);
            }

            if (examination.RequireSpeciality && speciality == null)
            {
                throw new InvalidOperationException("{test.constraints.requireSpeciality");
            }

            Test overlap = form.ExpectedOverlap(examination.Tests);
            if(overlap.Equals(default))
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
                Coefficient = form.Coefficient,
                UseAnonymity = form.UseAnonymity,
                IsPublished = form.IsPublished,
                ExpectedStartDate = form.ExpectedStartDate,
                ExpectedEndDate = form.ExpectedEndDate
            };

            _testRepository.Save(test);

            examination.TestCount += 1;
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
            if(overlap.Equals(default))
            {
                throw new OverlapPeriodException<Test,ExpectedPeriod>(overlap, form);
            }

            test.ExpectedStartDate = form.ExpectedStartDate;
            test.ExpectedEndDate = form.ExpectedEndDate;
            _testRepository.Update(test);

            return StatusCode(StatusCodes.Status202Accepted);
        }

        public StatusCodeResult ChangeCode(Test test, string code)
        {
            if (!string.IsNullOrWhiteSpace(code))
            {
                throw new ArgumentNullException(nameof(code));
            }
            if (_testRepository.Exists(t => test.Examination.Equals(t.Examination) && t.Code == code))
            {
                throw new InvalidOperationException("{test.constraints.uniqueCode}");
            }

            test.Code = code;
            _testRepository.Update(test);

            return StatusCode(StatusCodes.Status202Accepted);
        }
        
        
        public StatusCodeResult ChangeName(Test test, string name)
        {
            if (!string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentNullException(nameof(name));
            }
            if (_testRepository.Exists(t => test.Examination.Equals(t.Examination) && t.Name == name))
            {
                throw new InvalidOperationException("{test.constraints.uniqueName}");
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
            test.UseAnonymity = test.UseAnonymity;
            _testRepository.Update(test);
            return StatusCode(StatusCodes.Status202Accepted);
        }
        
        public StatusCodeResult ChangePublicationState(Test test)
        {
            test.IsPublished = !test.IsPublished;

            if (test.IsPublished)
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
            test.IsClosed = !test.IsClosed;

            if (test.IsClosed)
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
    }
}