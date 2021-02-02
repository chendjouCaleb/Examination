using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Infrastructure;
using Exam.Authorizers;
using Exam.Destructors;
using Exam.Entities;
using Exam.Filters;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Models;
using Exam.Persistence.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using ServerApp.Hubs;

namespace Exam.Controllers
{
    [Route("api/tests")]
    public class TestController : Controller
    {
        private ITestRepository _testRepository;
        private IServiceProvider _serviceProvider;
        private readonly IHubContext<TestHub, ITestHub> _testHub;


        public TestController(ITestRepository testRepository,
            IServiceProvider serviceProvider,
            IHubContext<TestHub, ITestHub> testHub)
        {
            _serviceProvider = serviceProvider;
            _testRepository = testRepository;
            _testHub = testHub;
        }


        [HttpGet("{testId}")]
        [LoadTest]
        public Test Find(Test test)
        {
            return test;
        }
        
        
        [HttpGet("{testId}/statistics")]
        [LoadTest]
        public TestStatistics GetStatistics(Test test)
        {
            return _testRepository.GetStatistics(test);
        }

        [HttpGet("find")]
        public Test Find([FromQuery] long courseId, [FromQuery] long examinationLevelId)
        {
            return _testRepository.First(t => t.CourseId == courseId && t.ExaminationLevelId == examinationLevelId);
        }

        public Test Find(Course course, ExaminationLevel examinationLevel)
        {
            return _testRepository.First(t => course.Equals(t.Course) && examinationLevel.Equals(t.ExaminationLevel));
        }

        void _Update(Test test)
        {
            test.TestGroupCount = (uint)test.Groups.Count;
            test.CorrectedPaperCount = (uint)test.Papers.Count(p => p.Score != null);
            test.PresentPaperCount = (uint)test.Papers.Count(p => p.IsPresent);
            test.PaperCount = (uint) test.Papers.Count;
            test.ConsignedPaperCount = (uint)test.Papers.Count(p => p.SecretaryUserId != null);
            
            _testRepository.Update(test);
        }

        [HttpGet]
        public IEnumerable<Test> List(
            [FromQuery] long? courseId,
            [FromQuery] long? examinationLevelId,
            [FromQuery] long? examinationDepartmentId,
            [FromQuery] long? examinationId,
            [FromQuery] string state,
            int take = 100,
            int skip = 0)
        {
            IQueryable<Test> tests = _testRepository.Set;
            
            tests.ToList().ForEach(_Update);

            if (courseId != null)
            {
                tests = tests.Where(t => t.CourseId == courseId);
            }

            if (examinationLevelId != null)
            {
                tests = tests.Where(t => t.ExaminationLevelId == examinationLevelId);
            }


            if (examinationDepartmentId != null)
            {
                tests = tests.Where(t => t.ExaminationLevel.ExaminationDepartmentId == examinationDepartmentId);
            }

            if (examinationId != null)
            {
                tests = tests.Where(t => t.ExaminationLevel.ExaminationDepartment.ExaminationId == examinationId);
            }

            if (!string.IsNullOrWhiteSpace(state))
            {
                tests = tests.Where(t => t.State == state);
            }

            var collection = tests.Skip(skip).Take(take);

            return collection.ToList();
        }

        public Test GetOverlapTest(ExaminationLevel examinationLevel, [FromBody] ExpectedPeriod period)
        {
            return period.ExpectedOverlap(examinationLevel.Tests);
        }


        [HttpPost]
        [ValidModel]
        [RequireQueryParameters(new[] {"courseId", "examinationLevelId"})]
        [LoadCourse(Source = ParameterSource.Query, SchoolItemName = "school")]
        [LoadExaminationLevel(Source = ParameterSource.Query, ExaminationItemName = "examination")]
        [IsPlanner]
        [IsNotFinished(ItemName = "examination")]
        public CreatedAtActionResult Add(
            Course course,
            ExaminationLevel examinationLevel,
            [FromBody] TestForm form,
            Planner planner)
        {
            var builder = new TestBuilder(_serviceProvider);
            Test test = builder.Add(course, examinationLevel, form, planner);
            _testHub.Clients?.All.TestCreated(test);
            return CreatedAtAction("Find", new {test.Id}, test);
        }


        /// <summary>
        /// Pour ajouter un nouveau test à un examen.
        /// Pour des raisons de performances, le test de chevauchement n'est pas fait pas le serveur.
        /// Ce soin est laissé à l'application cliente.
        /// </summary>
        /// <param name="course">Le cours du test.</param>
        /// <param name="examinationLevel"> Le niveau de l'examen.</param> 
        /// <param name="form">Les informations du test.</param>
        /// <param name="planner">Le planificateur qui ajoute le test.</param>
        /// <returns>Le test nouvellement crée</returns>
        /// <exception cref="IncompatibleEntityException"></exception>
        /// <exception cref="InvalidOperationException"></exception>
        public Test _Add(Course course, ExaminationLevel examinationLevel,
            TestForm form,
            Planner planner)
        {
            Assert.RequireNonNull(course, nameof(course));
            Assert.RequireNonNull(examinationLevel, nameof(examinationLevel));
            Assert.RequireNonNull(form, nameof(form));
            Assert.RequireNonNull(planner, nameof(planner));

            if (examinationLevel.LevelId != course.LevelId)
            {
                throw new IncompatibleEntityException(examinationLevel, course);
            }

            if (_testRepository.Exists(course, examinationLevel))
            {
                throw new InvalidOperationException("{test.constraints.uniqueCourse}");
            }

            Test test = new Test
            {
                RegisterUserId = planner.UserId,
                ExaminationLevel = examinationLevel,
                Course = course,
                Coefficient = form.Coefficient != 0 ? form.Coefficient : course.Coefficient,
                Radical = form.Radical != 0 ? form.Radical : course.Radical,
                UseAnonymity = form.UseAnonymity,
                IsGeneral = course.IsGeneral,
                ExpectedStartDate = form.ExpectedStartDate,
                ExpectedEndDate = form.ExpectedEndDate
            };
            return test;
        }

        public IEnumerable<Test> GetOverlaps(ExaminationLevel examinationLevel,
            ExaminationLevelSpeciality examinationLevelSpeciality, IExpectedPeriod form)
        {
            Assert.RequireNonNull(examinationLevelSpeciality, nameof(examinationLevelSpeciality));
            Assert.RequireNonNull(form, nameof(form));

            var tests = _testRepository.List(t => examinationLevel.Equals(t.ExaminationLevel)
                                                  && t.IsGeneral);
            return form.ExpectedOverlaps(tests);
        }


        [HttpPut("{testId}/dates")]
        [LoadTest(ExaminationItemName = "examination", SchoolItemName = "school")]
        [IsPlanner]
        [PeriodHaveState(State = "PENDING", ItemName = "test")]
        public StatusCodeResult ChangeDates(Test test, [FromBody] ExpectedPeriod form)
        {
            Assert.RequireNonNull(test, nameof(test));
            Assert.RequireNonNull(test.ExaminationLevel, nameof(test.ExaminationLevel));
            Assert.RequireNonNull(form, nameof(form));

            var tests = _testRepository.List(t => t.ExaminationLevelId == test.ExaminationLevelId &&
                                                  t.IsGeneral);

            var overlap = form.ExpectedOverlap(tests);
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
        [LoadTest(ExaminationItemName = "examination", SchoolItemName = "school")]
        [IsPlanner]
        [PeriodHaveState(State = "PENDING", ItemName = "test")]
        public StatusCodeResult Start(Test test)
        {
            Assert.RequireNonNull(test, nameof(test));
            test.StartDate = DateTime.Now;
            _testRepository.Update(test);

            _testHub.Clients?.All.TestStarted(test);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{testId}/end")]
        [LoadTest(ExaminationItemName = "examination", SchoolItemName = "school")]
        [IsPlanner]
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

            _testHub.Clients?.All.TestEnded(test);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{testId}/restart")]
        [LoadTest(ExaminationItemName = "examination", SchoolItemName = "school")]
        [IsPlanner]
        [PeriodHaveState(State = "FINISHED", ItemName = "test")]
        [IsOpen(ItemName = "test")]
        public StatusCodeResult Restart(Test test)
        {
            Assert.RequireNonNull(test, nameof(test));

            if (test.GetState() != PeriodState.FINISHED)
            {
                throw new InvalidOperationException("{test.constraints.restartAfterEnd}");
            }

            test.EndDate = null;
            _testRepository.Update(test);
            _testHub.Clients?.All.TestRestarted(test);
            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpPut("{testId}")]
        [LoadTest(ExaminationItemName = "examination", SchoolItemName = "school")]
        [IsPlanner]
        [ValidModel]
        public Test Edit(Test test, [FromBody] TestEditForm form)
        {
            Assert.RequireNonNull(test, nameof(test));
            Assert.RequireNonNull(form, nameof(form));
            if (form.Coefficient == 0)
            {
                form.Coefficient = 1;
            }

            test.Coefficient = form.Coefficient;

            _testRepository.Update(test);
            return test;
        }


        [HttpPut("{testId}/coefficient")]
        [LoadTest(ExaminationItemName = "examination", SchoolItemName = "school")]
        [RequireQueryParameter("coefficient")]
        [IsPlanner]
        [PeriodDontHaveState(State = "FINISHED", ItemName = "test")]
        [IsOpen(ItemName = "test")]
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
        [LoadTest(ExaminationItemName = "examination", SchoolItemName = "school")]
        [IsPlanner]
        [PeriodDontHaveState(State = "FINISHED", ItemName = "test")]
        [IsOpen(ItemName = "test")]
        public StatusCodeResult ChangeAnonymityState(Test test)
        {
            test.UseAnonymity = !test.UseAnonymity;
            _testRepository.Update(test);
            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{testId}/published")]
        [LoadTest(ExaminationItemName = "examination", SchoolItemName = "school")]
        [IsPlanner]
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

            if (_testHub.Clients != null)
            {
                var unused = test.IsClosed
                    ? _testHub.Clients.All.TestPublished(test)
                    : _testHub.Clients.All.TestUnPublished(test);
            }

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{testId}/closed")]
        [LoadTest(ExaminationItemName = "examination", SchoolItemName = "school")]
        [IsPlanner]
        //[PeriodHaveState(State = "FINISHED", ItemName = "test")]
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
            if (_testHub.Clients != null)
            {
                var unused = test.IsClosed
                    ? _testHub.Clients.All.TestClosed(test)
                    : _testHub.Clients.All.TestOpened(test);
            }

            return StatusCode(StatusCodes.Status202Accepted);
        }

        [HttpDelete("{testId}")]
        [LoadTest(ExaminationItemName = "examination", SchoolItemName = "school")]
        [IsPlanner]
        [PeriodHaveState(State = "PENDING", ItemName = "test")]
        [PeriodDontHaveState(State = "FINISHED", ItemName = "examination")]
        public NoContentResult Delete(Test test)
        {
            var destructor = new TestDestructor(_serviceProvider);
            destructor.Destroy(test);
            _testHub.Clients?.All.TestDeleted(test);
            return NoContent();
        }
    }
}