using System;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace ServerAppTest.Controllers
{
    public class MemberControllerTests
    {
        private MemberController _controller;
        private IRepository<Member, long> _memberRepository;
        private IRepository<School, long> _schoolRepository;

        private School _school;
        private User _user = new User {Id = Guid.NewGuid().ToString()};

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<MemberController>();
            
            _schoolRepository = serviceProvider.GetRequiredService<IRepository<School, long>>();
            _memberRepository = serviceProvider.GetRequiredService<IRepository<Member, long>>();

            _school = _schoolRepository.Save(new School
            {
                Name = "Org name"
            });
            
        }

        [Test]
        public void Add()
        {
            Member member = _controller._Add(_school, _user.Id);

            _memberRepository.Refresh(member);

            Assert.NotNull(member);
            Assert.AreEqual(_school, member.School);
            Assert.AreEqual(_user.Id, member.UserId);
            
        }

        [Test]
        public void TryAdd_WithUsedUserId_ShouldReturnOldMember ()
        {
            Member member = _controller._Add(_school, _user.Id);
            Member member1 = _controller._Add(_school, _user.Id);

            Assert.AreEqual(member, member1);
        }
        

        [Test]
        public void Delete()
        {
            Member member = _controller._Add(_school, _user.Id);
            _controller.Delete(member);
            _schoolRepository.Refresh(_school);
            
            Assert.False(_memberRepository.Exists(member));
        }
    }
}