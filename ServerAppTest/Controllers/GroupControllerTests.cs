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
    public class GroupControllerTests
    {
        private GroupController _controller;
        private IRepository<Group, long> _groupRepository;
        private IRepository<Organisation, long> _organisationRepository;
        private IRepository<Room, long> _roomRepository;
        private IRepository<Examination, long> _examinationRepository;
        private IRepository<Speciality, long> _specialityRepository;

        private Speciality _speciality;
        private Examination _examination;
        private Room _room;
        private Organisation _organisation;
        private GroupForm _model;


        private User _user = new User
        {
            Id = Guid.NewGuid().ToString()
        };

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<GroupController>();

            _organisationRepository = serviceProvider.GetRequiredService<IRepository<Organisation, long>>();
            _groupRepository = serviceProvider.GetRequiredService<IRepository<Group, long>>();
            _examinationRepository = serviceProvider.GetRequiredService<IRepository<Examination, long>>();
            _specialityRepository = serviceProvider.GetRequiredService<IRepository<Speciality, long>>();
            _roomRepository = serviceProvider.GetRequiredService<IRepository<Room, long>>();

            _organisation = _organisationRepository.Save(new Organisation
            {
                Name = "Org name"
            });

            _examination = _examinationRepository.Save(new Examination
            {
                Organisation = _organisation,
                Name = "Exam name",
                ExpectedStartDate = DateTime.Now.AddMonths(1),
                ExpectedEndDate = DateTime.Now.AddMonths(4)
            });

            _speciality = _specialityRepository.Save(new Speciality
            {
                Name = "speciality name",
                Examination = _examination
            });

            _room = _roomRepository.Save(new Room
            {
                Organisation = _organisation,
                Name = "name",
                Capacity = 20
            });
            _model = new GroupForm
            {
                Name = "Group Name"
            };
        }

        [Test]
        public void Add()
        {
            Group group = _controller.Add(_examination, _speciality, _room, _model, _user).Value as Group;

            _groupRepository.Refresh(group);

            Assert.NotNull(group);
            Assert.AreEqual(_model.Name, group.Name);

            Assert.AreEqual(_examination, group.Examination);
            Assert.AreEqual(_speciality, group.Speciality);
            Assert.AreEqual(_room, group.Room);
            Assert.AreEqual(_user.Id, group.RegisterUserId);
            Assert.AreEqual(1, group.Index);
        }


        [Test]
        public void TryAdd_WithUsedName_ShouldThrow()
        {
            _controller.Add(_examination, _speciality, _room, _model, _user);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.Add(_examination, _speciality, _room, _model, _user)
            );

            Assert.AreEqual("{group.constraints.uniqueName}", ex.Message);
        }


        [Test]
        public void ChangeName()
        {
            Group group = _controller.Add(_examination, _speciality, _room, _model, _user).Value as Group;
            string name = "new name";

            _controller.ChangeName(group, name);
            _groupRepository.Refresh(group);

            Assert.NotNull(group);
            Assert.AreEqual(name, group.Name);
        }

        [Test]
        public void TryChangeName_WithUsedName_ShouldThrow()
        {
            Group group = _controller.Add(_examination, _speciality, _room, _model, _user).Value as Group;

            string name = "new name";
            _model.Name = name;

            _controller.Add(_examination, _speciality, _room, _model, _user);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.ChangeName(group, name)
            );

            Assert.AreEqual("{group.constraints.uniqueName}", ex.Message);
        }


        [Test]
        public void ChangeSpeciality()
        {
            Group group = _controller.Add(_examination, _speciality, _room, _model, _user).Value as Group;

            Speciality speciality = _specialityRepository.Save(new Speciality
            {
                Examination = _examination,
                Name = "speciality name"
            });
            _specialityRepository.Refresh(speciality);

            _controller.ChangeSpeciality(group, speciality);

            _groupRepository.Refresh(group);

            Assert.NotNull(group);
            Assert.AreEqual(speciality, group.Speciality);
        }

        [Test]
        public void ChangeWithNullValue()
        {
            Group group = _controller.Add(_examination, _speciality, _room, _model, _user).Value as Group;

            _controller.ChangeSpeciality(group);

            _groupRepository.Refresh(group);

            Assert.NotNull(group);
            Assert.Null(group.Speciality);
        }
        
        
        [Test]
        public void ChangeRoom()
        {
            Group group = _controller.Add(_examination, _speciality, _room, _model, _user).Value as Group;

            Room room = _roomRepository.Save(new Room
            {
                Organisation = _organisation,
                Name = "room name"
            });
            _roomRepository.Refresh(room);

            _controller.ChangeRoom(group, room);

            _groupRepository.Refresh(group);

            Assert.NotNull(group);
            Assert.AreEqual(room, group.Room);
        }

        
        [Test]
        public void Delete()
        {
            Group group = _controller.Add(_examination, _speciality, _room, _model, _user).Value as Group;
            _controller.Delete(group);
            _groupRepository.Refresh(group);

            Assert.AreEqual(0, _examination.GroupCount);
            Assert.AreEqual(0, _speciality.GroupCount);
            Assert.False(_groupRepository.Exists(group));
        }
    }
}