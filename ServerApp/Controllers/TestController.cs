﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using Everest.AspNetStartup.Binding;
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
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace Exam.Controllers
{
    [Route("api/tests")]
    public class TestController : Controller
    {
        private IRepository<Test, long> _testRepository;
        private IRepository<Examination, long> _examinationRepository;
        private IRepository<Student, long> _studentRepository;
        private TestGroupController _testGroupController;


        public TestController(IRepository<Test, long> testRepository,
            IRepository<Student, long> studentRepository,
            TestGroupController testGroupController,
            IRepository<Examination, long> examinationRepository)
        {
            _studentRepository = studentRepository;
            _testGroupController = testGroupController;
            _testRepository = testRepository;
            _examinationRepository = examinationRepository;
        }


        [HttpGet("{testId}")]
        [LoadTest]
        public Test Find(Test test) => test;

        [HttpGet("find")]
        [LoadExamination(Source = ParameterSource.Query)]
        public Test Find(Examination examination, [FromQuery] string code, [FromQuery] string name)
        {
            IQueryable<Test> tests = _testRepository.Set;
            if (examination != null)
            {
                tests = tests.Where(t => t.Examination.Id == examination.Id);
            }
            if (!string.IsNullOrWhiteSpace(name))
            {
                tests = tests.Where(t => t.Name == name);
            }

            if (!string.IsNullOrWhiteSpace(code))
            {
                tests = tests.Where(t => t.Code == code);
            }

            return tests.FirstOrDefault();
        }


        [HttpGet]
        [LoadExamination(Source = ParameterSource.Query)]
        [LoadSpeciality(Source = ParameterSource.Query)]
        public IEnumerable<Test> List(Examination examination, Speciality speciality, [FromQuery] string state)
        {
            IQueryable<Test> tests = _testRepository.Set;
            if (examination != null)
            {
                tests = tests.Where(t => t.Examination.Id == examination.Id);
            }

            if (speciality != null)
            {
                tests = tests.Where(t => t.Speciality.Id == speciality.Id);
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
        [RequireQueryParameter("examinationId")]
        [LoadExamination(Source = ParameterSource.Query)]
        [LoadSpeciality(Source = ParameterSource.Query)]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(State = "FINISHED", ItemName = "examination")]
        [ValidModel]
        public CreatedAtActionResult Add(Examination examination, Speciality speciality, [FromBody] TestForm form, User user)
        {
            Assert.RequireNonNull(examination, nameof(examination));
            Assert.RequireNonNull(form, nameof(form));
            Assert.RequireNonNull(user, nameof(user));
            if (_studentRepository.Exists(s => examination.Equals(s.Examination) && s.Group == null))
            {
                //throw new InvalidOperationException("{test.constraints.groupedStudents}");
            }
            Test test = _Add(examination, speciality, form, user).Value as Test;
            if (test == null)
            {
                throw new ArgumentNullException(nameof(test));
            }

            foreach (Group  group in examination.Groups)
            {
                _testGroupController._Add(test,  group, group.Room);
            }
            return CreatedAtAction("Find", new {test.Id}, test);
        }


        [HttpPost("add")]
        [RequireQueryParameter("examinationId")]
        [LoadExamination(Source = ParameterSource.Query)]
        [LoadSpeciality(Source = ParameterSource.Query)]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(State = "FINISHED", ItemName = "examination")]
        
        public CreatedAtActionResult _Add(Examination examination, Speciality speciality, TestForm form, User user)
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


        [HttpPut("{testId}/dates")]
        [LoadTest(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        [PeriodHaveState(State = "PENDING", ItemName = "test")]
        public StatusCodeResult ChangeDates(Test test, [FromBody] ExpectedPeriod form)
        {
            Assert.RequireNonNull(test, nameof(test));
            Assert.RequireNonNull(test.Examination, nameof(test.Examination));
            Assert.RequireNonNull(form, nameof(form));

            IList<Test> otherTests = _testRepository.List(t => test.Examination.Equals(t.Examination) && !t.Equals(test));

            Console.WriteLine(otherTests.Count);

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
        [LoadTest(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        [PeriodHaveState(State = "PENDING", ItemName = "test")]
        public StatusCodeResult Start(Test test)
        {
            Assert.RequireNonNull(test, nameof(test));
            test.StartDate = DateTime.Now;
            _testRepository.Update(test);
            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{testId}/end")]
        [LoadTest(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        [PeriodHaveState(State = "PROGRESS", ItemName = "test")]
        public StatusCodeResult End(Test test)
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


        [HttpPut("{testId}/start")]
        [LoadTest(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        [PeriodHaveState(State = "FINISHED", ItemName = "test")]
        [PeriodNotClosed(ItemName = "test")]
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

        [HttpPut("{testId}")]
        [LoadTest(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        [ValidModel]
        public Test Edit(Test test, [FromBody]TestEditForm form)
        {
            if (_testRepository.Exists(t => test.Examination.Equals(t.Examination) && t.Code == form.Code && !t.Equals(test)))
            {
                throw new InvalidValueException("{test.constraints.uniqueCode}");
            }
            if (form.Coefficient == 0)
            {
                form.Coefficient = 1;
            }

            test.Coefficient = form.Coefficient;
            test.Name = form.Name;
            test.Radical = form.Radical;
            test.Code = form.Code;
            
            _testRepository.Update(test);

            return test;
        }

        [HttpPut("{testId}/code")]
        [RequireQueryParameter("code")]
        [LoadTest(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        public StatusCodeResult ChangeCode(Test test,[FromQuery] string code)
        {
            if (string.IsNullOrWhiteSpace(code))
            {
                throw new ArgumentNullException(nameof(code));
            }

            if (_testRepository.Exists(t => test.Examination.Equals(t.Examination) && t.Code == code && !t.Equals(test)))
            {
                throw new InvalidValueException("{test.constraints.uniqueCode}");
            }

            test.Code = code;
            _testRepository.Update(test);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{testId}/name")]
        [RequireQueryParameter("name")]
        [LoadTest(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        public StatusCodeResult ChangeName(Test test, [FromQuery] string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentNullException(nameof(name));
            }

            test.Name = name;
            _testRepository.Update(test);

            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpPut("{testId}/coefficient")]
        [LoadTest(ExaminationItemName = "examination")]
        [RequireQueryParameter("coefficient")]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(State = "FINISHED", ItemName = "test")]
        [PeriodNotClosed(ItemName = "test")]
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


        [HttpPut("{testId}/anonymous")]
        [LoadTest(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(State = "FINISHED", ItemName = "test")]
        [PeriodNotClosed(ItemName = "test")]
        public StatusCodeResult ChangeAnonymityState(Test test)
        {
            test.UseAnonymity = !test.UseAnonymity;
            _testRepository.Update(test);
            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{testId}/published")]
        [LoadTest(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
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


        [HttpPut("{testId}/closed")]
        [LoadTest(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        [PeriodHaveState(State = "FINISHED", ItemName = "test")]
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

        [HttpDelete("{testId}")]
        [LoadTest(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        [PeriodHaveState(State = "PENDING", ItemName = "test")]
        [PeriodDontHaveState(State = "FINISHED", ItemName = "examination")]
        public NoContentResult Delete(Test test)
        {
            _testRepository.Delete(test);
            return NoContent();
        }
    }
}