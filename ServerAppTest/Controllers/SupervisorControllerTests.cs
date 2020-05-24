using System;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers
{
    public class SupervisorControllerTests
    {
        private SupervisorController _controller;
        private IRepository<Supervisor, long> _supervisorRepository;
        private IRepository<Examination, long> _examinationRepository;

        private string _userId = Guid.NewGuid().ToString();
        private Examination _examination;
        

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<SupervisorController>();
            _supervisorRepository = serviceProvider.GetRequiredService<IRepository<Supervisor, long>>();
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
            Supervisor supervisor = _controller._Add(_examination, _userId);

            _supervisorRepository.Refresh(supervisor);
            _examinationRepository.Refresh(_examination);

            Assert.NotNull(supervisor);
            Assert.AreEqual(_userId, supervisor.UserId);
            Assert.AreEqual(_examination, supervisor.Examination);
        }

        [Test]
        public void TryAdd_WithUsedUser_ShouldThrow()
        {
            _controller._Add(_examination, _userId);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller._Add(_examination, _userId));

            Assert.AreEqual("{supervisor.constraints.uniqueUserByExamination}", ex.Message);
        }
        
        
        [Test]
        public void Delete()
        {
            Supervisor supervisor = _controller._Add(_examination, _userId);
            _controller.Delete(supervisor);

            _examinationRepository.Refresh(_examination);
            
            Assert.False(_supervisorRepository.Exists(supervisor));
        }
    }
}