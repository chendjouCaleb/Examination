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
    public class OrganisationControllerTests
    {
        private OrganisationController _controller;
        private IRepository<Organisation, long> _organisationRepository;

        private User _user = new User {Id = Guid.NewGuid().ToString()};
        private Organisation _organisation;
        private OrganisationForm _model;

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<OrganisationController>();

            _organisationRepository = serviceProvider.GetRequiredService<IRepository<Organisation, long>>();

            _organisation = _organisationRepository.Save(new Organisation
            {
                
            });
            _model = new OrganisationForm
            {
                Name = "Org name",
                Identifier = "OrgName",
                Address = "Cmr, Yaounde"
            };
        }

        [Test]
        public void Add()
        {
            Organisation organisation = _controller.Add(_model, _user).Value as Organisation;

            _organisationRepository.Refresh(organisation);

            Assert.NotNull(organisation);
            Assert.AreEqual(_model.Name, organisation.Name);
            Assert.AreEqual(_model.Identifier, organisation.Identifier);
            Assert.AreEqual(_model.Address, organisation.Address);
            
            Assert.AreEqual(_user.Id, organisation.UserId);
        }

        [Test]
        public void TryAdd_WithUsedIdentifier_ShouldThrow()
        {
            _controller.Add(_model, _user);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller.Add(_model, _user));

            Assert.AreEqual("{organisation.constraints.uniqueIdentifier}", ex.Message);
        }
        

        [Test]
        public void ChangeIdentifier()
        {
            Organisation organisation = _controller.Add(_model, _user).Value as Organisation;

            string identifier = "OrgIdentifier1";
            _controller.ChangeIdentifier(organisation, identifier);
            _organisationRepository.Refresh(organisation);
            
            Assert.NotNull(organisation);
            Assert.AreEqual(identifier, organisation.Identifier);
            
        }

        [Test]
        public void TryChangeIdentifier_WithUsedIdentifier_ShouldThrow()
        {
            Organisation organisation = _controller.Add(_model, _user).Value as Organisation;

            _model.Identifier = "OrgIdentifier1";
            _controller.Add(_model, _user);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.ChangeIdentifier(organisation, _model.Identifier)
            );

            Assert.AreEqual("{organisation.constraints.uniqueIdentifier}", ex.Message);
        }

        [Test]
        public void ChangeInfo()
        {
            OrganisationInfoForm form = new OrganisationInfoForm
            {
                Name = "org new name",
                Address = "org address"
            };
            
            Organisation organisation = _controller.Add(_model, _user).Value as Organisation;

            _controller.Update(organisation, form);
            _organisationRepository.Refresh(organisation);

            Assert.AreEqual(form.Address, organisation.Address);
            Assert.AreEqual(form.Name, organisation.Name);
        }
        
        
        [Test]
        public void Delete()
        {
            Organisation organisation = _controller.Add(_model, _user).Value as Organisation;
            _controller.Delete(organisation);
            _organisationRepository.Refresh(_organisation);
            
            Assert.False(_organisationRepository.Exists(organisation));
        }
    }
}