using System;
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
    public class ScoreControllerTests
    {
        private ScoreController _controller;
        private IRepository<Score, long> _scoreRepository;
        private IRepository<Examination, long> _examinationRepository;
        private IRepository<Test, long> _testRepository;

        private ScoreForm _model;
        private Examination _examination;
        private Test _test;
            
        

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<ScoreController>();
            _scoreRepository = serviceProvider.GetRequiredService<IRepository<Score, long>>();
            _examinationRepository = serviceProvider.GetRequiredService<IRepository<Examination, long>>();
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();
            
            _examination = _examinationRepository.Save(new Examination 
            {
                Name = "MATH-L3-2015/2016-S2",
                ExpectedStartDate = DateTime.Now.AddMonths(1),
                ExpectedEndDate = DateTime.Now.AddMonths(3)
            });
            
            _test = _testRepository.Save(new Test
            {
                Examination = _examination,
                Name = "Mathematics",
                ExpectedStartDate = DateTime.Now.AddMonths(1),
                ExpectedEndDate = DateTime.Now.AddMonths(3)
            });
            

            _model = new ScoreForm {Name = "Excercice1" };
        }

        [Test]
        public void Add()
        {
            Score score = _controller.Add(_test, _model).Value as Score;

            _scoreRepository.Refresh(score);
            
            Assert.NotNull(score);
            Assert.AreEqual(_model.Name, score.Name);
            Assert.AreEqual(_model.Radical, score.Radical);
            Assert.AreEqual(_test, score.Test);
            
        }

        [Test]
        public void TryAdd_WithUsedName_ShouldThrow()
        {
            _controller.Add(_test, _model);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller.Add(_test, _model));

            Assert.AreEqual("{test.score.constraints.uniqueName}", ex.Message);
        }
        
        [Test]
        public void ChangeName()
        {
            Score score = _controller.Add(_test, _model).Value as Score;

            string name = "Exercice-1";
            _controller.ChangeName(score, name);
            _scoreRepository.Refresh(score);
            
            Assert.NotNull(score);
            Assert.AreEqual(name, score.Name);
            
        }

        [Test]
        public void TryChangeName_WithUsedName_ShouldThrow()
        {
            Score score = _controller.Add(_test, _model).Value as Score;

            _model.Name = "Test-1";
            _controller.Add(_test, _model);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.ChangeName(score, _model.Name)
            );

            Assert.AreEqual("{test.score.constraints.uniqueName}", ex.Message);
        }
        
        
        [Test]
        public void Delete()
        {
            Score score = _controller.Add(_test, _model).Value as Score;
            _controller.Delete(score);
            
            Assert.False(_scoreRepository.Exists(score));
        }
    }
}