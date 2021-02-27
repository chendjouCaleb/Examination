using System;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers.Courses;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Models;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class ScoreControllerTests
    {
        private ScoreController _controller;
        private IRepository<Score, long> _scoreRepository;
        private IRepository<Level, long> _levelRepository;
        private IRepository<Course, long> _courseRepository;

        private ScoreForm _model;
        private Level _level;
        private Course _course;


        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<ScoreController>();
            _scoreRepository = serviceProvider.GetRequiredService<IRepository<Score, long>>();
            _levelRepository = serviceProvider.GetRequiredService<IRepository<Level, long>>();
            _courseRepository = serviceProvider.GetRequiredService<IRepository<Course, long>>();

            _level = _levelRepository.Save(new Level {Index = 1});

            _course = _courseRepository.Save(new Course
            {
                Level = _level,
                Name = "Mathematics",
                Radical = 20
            });


            _model = new ScoreForm {Name = "Exercise1", Radical = 8};
        }

        [Test]
        public void Add()
        {
            Assert.False(_course.MultipleScore);
            Score score = _controller.Add(_course, _model).Value as Score;

            _scoreRepository.Refresh(score);
            _courseRepository.Refresh(_course);

            Assert.NotNull(score);
            Assert.AreEqual(_model.Name, score.Name);
            Assert.AreEqual(_model.Radical, score.Radical);
            Assert.AreEqual(_course, score.Course);
            
            Assert.True(_course.MultipleScore);
        }

        [Test]
        public void TryAdd_WithUsedName_ShouldThrow()
        {
            _controller.Add(_course, _model);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller.Add(_course, _model));

            Assert.AreEqual("{score.constraints.uniqueName}", ex.Message);
        }

        [Test]
        public void ChangeName()
        {
            Score score = _controller.Add(_course, _model).Value as Score;

            string name = "Exercise-1";
            _controller.ChangeName(score, name);
            _scoreRepository.Refresh(score);

            Assert.NotNull(score);
            Assert.AreEqual(name, score.Name);
        }

        [Test]
        public void TryChangeName_WithUsedName_ShouldThrow()
        {
            Score score = _controller.Add(_course, _model).Value as Score;

            _model.Name = "Course-1";
            _controller.Add(_course, _model);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.ChangeName(score, _model.Name)
            );

            Assert.AreEqual("{score.constraints.uniqueName}", ex.Message);
        }

        [Test]
        public void TryAddScore_SuchAsTotalScore_IsUpperThanCourseRadical_ShouldThrowError()
        {
            _controller.Add(_course, _model);

            ScoreForm model2 = new ScoreForm {Name = "Exercise2", Radical = 15};

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.Add(_course, model2)
            );

            Assert.AreEqual("{score.constraints.totalLowerOrEqualsThanRadical}", ex.Message);
        }

        [Test]
        public void Delete()
        {
            Score score = _controller.Add(_course, _model).Value as Score;
            _controller.Delete(score);
            
            _courseRepository.Refresh(_course);

            Assert.False(_scoreRepository.Exists(score));
            Assert.False(_course.MultipleScore);
        }

        [Test]
        public void Delete_ScoreOnCourseWithTwoScore_ShouldNotUpdateMultipleScoreOnCourse()
        {
            Score score = _controller.Add(_course, _model).Value as Score;
            _controller.Add(_course, new ScoreForm {Name = "Exercise2", Radical = 8});
            _controller.Delete(score);
            
            _courseRepository.Refresh(_course);

            Assert.False(_scoreRepository.Exists(score));
            Assert.True(_course.MultipleScore);
        }
    }
}