using System;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class CorrectorControllerTests
    {
        private CorrectorController _controller;
        private IRepository<Corrector, long> _correctorRepository;
        private IRepository<Examination, long> _examinationRepository;

        private string _userId = Guid.NewGuid().ToString();
        private Examination _examination;
        

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<CorrectorController>();
            _correctorRepository = serviceProvider.GetRequiredService<IRepository<Corrector, long>>();
            _examinationRepository = serviceProvider.GetRequiredService<IRepository<Examination, long>>();
            
            _examination = _examinationRepository.Save(new Examination 
            {
                Name = "MATH-L3-2015/2016-S2",
                ExpectedStartDate = DateTime.Now.AddMonths(1),
                ExpectedEndDate = DateTime.Now.AddMonths(3)
            });
            
        }

        [Test]
        public void Add()
        {
            Corrector corrector = _controller._Add(_examination, _userId);

            _correctorRepository.Refresh(corrector);
            _examinationRepository.Refresh(_examination);

            Assert.NotNull(corrector);
            Assert.AreEqual(_userId, corrector.UserId);
            Assert.AreEqual(_examination, corrector.Examination);
            Assert.AreEqual(1, _examination.CorrectorCount);
        }

        [Test]
        public void TryAdd_WithUsedUser_ShouldThrow()
        {
            _controller._Add(_examination, _userId);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller._Add(_examination, _userId));

            Assert.AreEqual("{corrector.constraints.uniqueUserByExamination}", ex.Message);
        }
        
        
        
        
        [Test]
        public void Delete()
        {
            Corrector corrector = _controller._Add(_examination, _userId);
            _controller.Delete(corrector);
            
            _examinationRepository.Refresh(_examination);
            Assert.AreEqual(0, _examination.CorrectorCount);
            
            Assert.False(_correctorRepository.Exists(corrector));
        }
    }
}