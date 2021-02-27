using System;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Models;
using Exam.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class TestScoreControllerTests
    {
        private TestScoreController _controller;
        private IRepository<TestScore, long> _testScoreRepository;
        private IRepository<Score, long> _scoreRepository;
        private IRepository<Level, long> _levelRepository;
        private IRepository<Test, long> _testRepository;
        private ICourseRepository _courseRepository;

        private TestScoreForm _model;
        private Level _level;
        private Test _test;


        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<TestScoreController>();
            _testScoreRepository = serviceProvider.GetRequiredService<IRepository<TestScore, long>>();
            _scoreRepository = serviceProvider.GetRequiredService<IRepository<Score, long>>();
            _levelRepository = serviceProvider.GetRequiredService<IRepository<Level, long>>();
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();
            _courseRepository = serviceProvider.GetRequiredService<ICourseRepository>();

            _level = _levelRepository.Save(new Level {Index = 1});

            _test = _testRepository.Save(new Test
            {
                Radical = 20
            });


            _model = new TestScoreForm {Name = "Exercise1", Radical = 8};
        }

        [Test]
        public void Add()
        {
            Assert.False(_test.MultipleScore);
            TestScore testScore = _controller.Add(_test, _model).Value as TestScore;

            _testScoreRepository.Refresh(testScore);
            _testRepository.Refresh(_test);

            Assert.NotNull(testScore);
            Assert.AreEqual(_model.Name, testScore.Name);
            Assert.AreEqual(_model.Radical, testScore.Radical);
            Assert.AreEqual(_test, testScore.Test);

            Assert.True(_test.MultipleScore);
        }

        [Test]
        public void TryAdd_WithUsedName_ShouldThrow()
        {
            _controller.Add(_test, _model);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller.Add(_test, _model));

            Assert.AreEqual("{testScore.constraints.uniqueName}", ex.Message);
        }

        [Test]
        public void CopyScoreFromCourse()
        {
            Course course = _courseRepository.Save(new Course {Name = "course name", Level = _level});
            for (int i = 0; i < 5; i++)
            {
                _scoreRepository.Save(new Score {Name = $"score {i}", Radical = i, Course = course});
            }

            Assert.False(_test.MultipleScore);

            var testScores = _controller.Copy(_test, course);
            Assert.True(_test.MultipleScore);

            Assert.AreEqual(5, testScores.Count);
            for (int i = 0; i < 5; i++)
            {
                Assert.AreEqual(testScores[i].Name, course.Scores[i].Name);
                Assert.AreEqual(testScores[i].Radical, course.Scores[i].Radical);
                Assert.AreEqual(testScores[i].Test, _test);
            }
        }

        [Test]
        public void ChangeName()
        {
            TestScore testScore = _controller.Add(_test, _model).Value as TestScore;

            string name = "Exercise-1";
            _controller.ChangeName(testScore, name);
            _testScoreRepository.Refresh(testScore);

            Assert.NotNull(testScore);
            Assert.AreEqual(name, testScore.Name);
        }

        [Test]
        public void TryChangeName_WithUsedName_ShouldThrow()
        {
            TestScore testScore = _controller.Add(_test, _model).Value as TestScore;

            _model.Name = "Test-1";
            _controller.Add(_test, _model);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.ChangeName(testScore, _model.Name)
            );

            Assert.AreEqual("{testScore.constraints.uniqueName}", ex.Message);
        }

        [Test]
        public void TryAddTestScore_SuchAsTotalTestScore_IsUpperThanTestRadical_ShouldThrowError()
        {
            _controller.Add(_test, _model);

            TestScoreForm model2 = new TestScoreForm {Name = "Exercise2", Radical = 15};

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.Add(_test, model2)
            );

            Assert.AreEqual("{testScore.constraints.totalLowerOrEqualsThanRadical}", ex.Message);
        }

        [Test]
        public void Delete()
        {
            TestScore testScore = _controller.Add(_test, _model).Value as TestScore;
            _controller.Delete(testScore);

            _testRepository.Refresh(_test);

            Assert.False(_testScoreRepository.Exists(testScore));
            Assert.False(_test.MultipleScore);
        }

        [Test]
        public void Delete_TestScoreOnTestWithTwoTestScore_ShouldNotUpdateMultipleTestScoreOnTest()
        {
            TestScore testScore = _controller.Add(_test, _model).Value as TestScore;
            _controller.Add(_test, new TestScoreForm {Name = "Exercise2", Radical = 8});
            _controller.Delete(testScore);

            _testRepository.Refresh(_test);

            Assert.False(_testScoreRepository.Exists(testScore));
            Assert.True(_test.MultipleScore);
        }
    }
}