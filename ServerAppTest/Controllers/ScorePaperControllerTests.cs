using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Models;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace ServerAppTest.Controllers
{
    public class ScorePaperControllerTests
    {
        private ScorePaperController _controller;
        private IRepository<Test, long> _testRepository;
        private IRepository<TestGroup, long> _testGroupRepository;
        private IRepository<TestGroupCorrector, long> _testGroupCorrectorRepository;

        private IRepository<Corrector, long> _correctorRepository;

        private IRepository<Paper, long> _paperRepository;
        private IRepository<Score, long> _scoreRepository;
        private IRepository<ScorePaper, long> _scorePaperRepository;
        private User _correctorUser = new User();


        private Corrector _corrector;
        private Paper _paper;
        private TestGroupCorrector _testGroupCorrector;


        private TestGroup _testGroup;
        private Test _test;


        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<ScorePaperController>();

            
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();
            _testGroupRepository = serviceProvider.GetRequiredService<IRepository<TestGroup, long>>();

            _testGroupCorrectorRepository = serviceProvider.GetRequiredService<IRepository<TestGroupCorrector, long>>();
            

            _correctorRepository = serviceProvider.GetRequiredService<IRepository<Corrector, long>>();
            
            _scoreRepository = serviceProvider.GetRequiredService<IRepository<Score, long>>();
            _scorePaperRepository = serviceProvider.GetRequiredService<IRepository<ScorePaper, long>>();

            
            _paperRepository = serviceProvider.GetRequiredService<IRepository<Paper, long>>();

            
            _test = _testRepository.Save(
                new Test
                {
                    Name = "test name",
                    Code = "ABC 32",
                    Coefficient = 5,
                    Radical = 20,
                    UseAnonymity = false
                }
            );
            _testGroup = _testGroupRepository.Save(new TestGroup {Test = _test});
            _corrector = _correctorRepository.Save(new Corrector {UserId = _correctorUser.Id});
            _testGroupCorrector = _testGroupCorrectorRepository.Save(new TestGroupCorrector
            {
                Corrector = _corrector, TestGroup = _testGroup
            });

            _paper = _paperRepository.Save(new Paper
            {
                TestGroup = _testGroup
            });

        }

        

        [Test]
        public void AddPaperScore()
        {
            Score score = _scoreRepository.Save(new Score {Test = _test, Name = "Exercise1", Radical = 5});

            ScorePaper scorePaper = _controller.AddOrUpdatePaperScore(_paper, score, 5);
            _scorePaperRepository.Refresh(scorePaper);

            Assert.NotNull(scorePaper);
            Assert.AreEqual(_paper, scorePaper.Paper);
            Assert.AreEqual(score, scorePaper.Score);
            Assert.AreEqual(5, scorePaper.Value);
        }

        [Test]
        public void AddExistingScorePaper_ShouldUpdateIt()
        {
            Score score = _scoreRepository.Save(new Score {Test = _test, Name = "Exercise1", Radical = 5});

            ScorePaper scorePaper1 = _controller.AddOrUpdatePaperScore(_paper, score, 5);
            ScorePaper scorePaper2 = _controller.AddOrUpdatePaperScore(_paper, score, 1);
            _scorePaperRepository.Refresh(scorePaper1);
            _scorePaperRepository.Refresh(scorePaper2);

            Assert.NotNull(scorePaper1);
            Assert.NotNull(scorePaper2);
            Assert.AreEqual(scorePaper1, scorePaper2);
            Assert.AreEqual(1, scorePaper2.Value);
        }

        [Test]
        public void Try_AddOrUpdateScorePaper_WhichValueUpperThanRadical_ShouldThrow()
        {
            Score score = _scoreRepository.Save(new Score {Test = _test, Name = "Exercise1", Radical = 5});

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.AddOrUpdatePaperScore(_paper, score, 6)
            );

            Assert.AreEqual("{paperScore.constraints.valueLowerOrEqualThanRadical}", ex.Message);
        }


        [Test]
        public void SetMultipleScore()
        {
            Score score1 = _scoreRepository.Save(new Score {Test = _test, Name = "Exercise1", Radical = 5});
            Score score2 = _scoreRepository.Save(new Score {Test = _test, Name = "Exercise2", Radical = 5});
            Score score3 = _scoreRepository.Save(new Score {Test = _test, Name = "Exercise3", Radical = 10});
            
            List<ScorePaperForm> form = new List<ScorePaperForm>(new []
            {
                new ScorePaperForm { ScoreId = score1.Id, Value = 1}, 
                new ScorePaperForm { ScoreId = score2.Id, Value = 2}, 
                new ScorePaperForm { ScoreId = score3.Id, Value = 3} 
            });
            
            _testRepository.Refresh(_test);

            List<ScorePaper> scorePapers =
                _controller.Scores(_paper, _testGroupCorrector, form).Value as List<ScorePaper>;
            
            _paperRepository.Refresh(_paper);
            Assert.IsNotNull(_paper);
            Assert.IsNotNull(scorePapers);
            Assert.AreEqual(3, scorePapers.Count);
            
            Assert.AreEqual(_testGroupCorrector, _paper.TestGroupCorrector);
            Assert.AreEqual(_testGroupCorrector.Corrector.UserId, _paper.CorrectorUserId);

            foreach (var item in scorePapers)
            {
                _scorePaperRepository.Refresh(item);
                Assert.IsNotNull(item);
                Assert.AreEqual(_paper, item.Paper);
                Assert.AreEqual(_paper.TestGroup.Test, item.Score.Test);
            }

        }
        
        
        [Test]
        public void TrySetScorePapers_WhenTestHaveSingleScore_ShouldThrowError()
        {
            Exception ex = Assert.Throws<InvalidOperationException>(
                () => _controller.Scores(_paper, _testGroupCorrector, new List<ScorePaperForm>())
            );

            Assert.AreEqual("{paper.constraints.singleScore}", ex.Message);
        }
    }
}