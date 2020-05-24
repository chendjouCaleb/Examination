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
    public class AdminControllerTests
    {
        private AdminController _controller;
        private IRepository<Admin, long> _adminRepository;
        private IRepository<Organisation, long> _organisationRepository;

        private Organisation _organisation;
        private AdminForm _model;
        private User _user = new User {Id = Guid.NewGuid().ToString()};

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<AdminController>();
            
            _organisationRepository = serviceProvider.GetRequiredService<IRepository<Organisation, long>>();
            _adminRepository = serviceProvider.GetRequiredService<IRepository<Admin, long>>();

            _organisation = _organisationRepository.Save(new Organisation
            {
                Name = "Org name"
            });
            _model = new AdminForm
            {
                Role = "Manage room",
                UserId = Guid.NewGuid().ToString() 
            };
        }

        [Test]
        public void Add()
        {
            Admin admin = _controller.Add(_organisation, _user, _model).Value as Admin;

            _adminRepository.Refresh(admin);

            Assert.NotNull(admin);
            Assert.AreEqual(_model.Role, admin.Role);
            Assert.AreEqual(_model.UserId, admin.UserId);
            Assert.AreEqual(_user.Id, admin.RegisterUserId);

            Assert.AreEqual(_organisation, admin.Organisation);
        }

        [Test]
        public void TryAdd_WithUsedUserId_ShouldThrow()
        {
            _controller.Add(_organisation, _user, _model);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller.Add(_organisation, _user, _model));

            Assert.AreEqual("{admin.constraints.uniqueUserId}", ex.Message);
        }
        
        [Test]
        public void ChangeInfo()
        {
            AdminInfoForm form = new AdminInfoForm
            {
                Role = "new role" 
            };
            Admin admin = _controller.Add(_organisation, _user, _model).Value as Admin;
            _controller.Update(admin, form);

            _organisationRepository.Update(_organisation);
            Assert.NotNull(admin);
            Assert.AreEqual(form.Role, admin.Role);
        }
        

        

        [Test]
        public void Delete()
        {
            Admin admin = _controller.Add(_organisation, _user, _model).Value as Admin;
            _controller.Delete(admin);
            _organisationRepository.Refresh(_organisation);
            
            Assert.False(_adminRepository.Exists(admin));
        }
    }
}