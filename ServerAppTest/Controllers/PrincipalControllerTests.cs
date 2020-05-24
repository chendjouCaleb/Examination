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
    public class PrincipalControllerTests
    {
        private PrincipalController _controller;
        private IRepository<Principal, long> _principalRepository;
        private IRepository<Examination, long> _examinationRepository;

        private Examination _examination;
        private PrincipalForm _model;
        private User _user = new User {Id = Guid.NewGuid().ToString()};

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<PrincipalController>();
            
            _examinationRepository = serviceProvider.GetRequiredService<IRepository<Examination, long>>();
            _principalRepository = serviceProvider.GetRequiredService<IRepository<Principal, long>>();

            _examination = _examinationRepository.Save(new Examination
            {
                Name = "Org name"
            });
            _model = new PrincipalForm
            {
                Role = "Manage room",
                UserId = Guid.NewGuid().ToString() 
            };
        }

        [Test]
        public void Add()
        {
            Principal principal = _controller.Add(_examination, _user, _model).Value as Principal;

            _principalRepository.Refresh(principal);

            Assert.NotNull(principal);
            Assert.AreEqual(_model.Role, principal.Role);
            Assert.AreEqual(_model.UserId, principal.UserId);
            Assert.AreEqual(_user.Id, principal.RegisterUserId);

            Assert.AreEqual(_examination, principal.Examination);
        }

        [Test]
        public void TryAdd_WithUsedUserId_ShouldThrow()
        {
            _controller.Add(_examination, _user, _model);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller.Add(_examination, _user, _model));

            Assert.AreEqual("{principal.constraints.uniqueUserId}", ex.Message);
        }
        
        [Test]
        public void ChangeInfo()
        {
            PrincipalInfoForm form = new PrincipalInfoForm
            {
                Role = "new role" 
            };
            Principal principal = _controller.Add(_examination, _user, _model).Value as Principal;
            _controller.Update(principal, form);

            _examinationRepository.Update(_examination);
            Assert.NotNull(principal);
            Assert.AreEqual(form.Role, principal.Role);
        }
        

        

        [Test]
        public void Delete()
        {
            Principal principal = _controller.Add(_examination, _user, _model).Value as Principal;
            _controller.Delete(principal);
            _examinationRepository.Refresh(_examination);
            
            Assert.False(_principalRepository.Exists(principal));
        }
    }
}