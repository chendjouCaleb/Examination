using System;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Exam.Exceptions;
using Exam.Infrastructure;
using Exam.Models;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace ServerAppTest.Controllers
{
    public class SchoolControllerTests
    {
        private SchoolController _controller;
        private IRepository<School, long> _schoolRepository;
        private IRepository<Member, long> _memberRepository;

        private User _user = new User {Id = Guid.NewGuid().ToString()};
        private School _school;
        private SchoolForm _model;

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<SchoolController>();

            _schoolRepository = serviceProvider.GetRequiredService<IRepository<School, long>>();
            _memberRepository = serviceProvider.GetRequiredService<IRepository<Member, long>>();

            
            _model = new SchoolForm
            {
                Name = "Org name",
                Identifier = "OrgName",
                Address = "Cmr, Yaounde",
                Acronym = "UY-1"
            };
        }

        [Test]
        public void Add()
        {
            School school = _controller.Add(_model, _user).Value as School;

            _schoolRepository.Refresh(school);

            Assert.NotNull(school);
            Assert.AreEqual(_model.Name, school.Name);
            Assert.AreEqual(_model.Identifier, school.Identifier);
            Assert.AreEqual(_model.Address, school.Address);
            Assert.AreEqual(_model.Acronym, school.Acronym);
            
            Assert.AreEqual(_user.Id, school.RegisterUserId);
            
            Assert.True(_memberRepository.Exists(school.Principal));
            Assert.AreEqual(_user.Id, school.Principal.UserId);
            Assert.AreEqual(school, school.Principal.School);
        }

        [Test]
        public void TryAdd_WithUsedIdentifier_ShouldThrow()
        {
            _controller.Add(_model, _user);
            Exception ex = Assert.Throws<UniqueValueException>(() => _controller.Add(_model, _user));

            Assert.AreEqual("{school.constraints.uniqueIdentifier}", ex.Message);
        }
        

        [Test]
        public void ChangeIdentifier()
        {
            School school = _controller.Add(_model, _user).Value as School;

            string identifier = "OrgIdentifier1";
            _controller.ChangeIdentifier(school, identifier);
            _schoolRepository.Refresh(school);
            
            Assert.NotNull(school);
            Assert.AreEqual(identifier, school.Identifier);
            
        }

        [Test]
        public void TryChangeIdentifier_WithUsedIdentifier_ShouldThrow()
        {
            School school = _controller.Add(_model, _user).Value as School;

            _model.Identifier = "OrgIdentifier1";
            _controller.Add(_model, _user);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.ChangeIdentifier(school, _model.Identifier)
            );

            Assert.AreEqual("{school.constraints.uniqueIdentifier}", ex.Message);
        }

        [Test]
        public void ChangeInfo()
        {
            SchoolInfoForm form = new SchoolInfoForm
            {
                Name = "org new name",
                Address = "org address",
                Acronym = "UY-1"
            };
            
            School school = _controller.Add(_model, _user).Value as School;

            _controller.Update(school, form);
            _schoolRepository.Refresh(school);

            Assert.NotNull(school);
            Assert.AreEqual(form.Acronym, school.Acronym);
            Assert.AreEqual(form.Address, school.Address);
            Assert.AreEqual(form.Name, school.Name);
        }
        
        
        [Test]
        public void Delete()
        {
            School school = _controller.Add(_model, _user).Value as School;
            _controller.Delete(school);
            
            Assert.False(_schoolRepository.Exists(school));
        }
    }
}