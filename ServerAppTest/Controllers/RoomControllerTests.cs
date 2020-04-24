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
    public class RoomControllerTests
    {
        private RoomController _controller;
        private IRepository<Room, long> _roomRepository;
        private IRepository<Organisation, long> _organisationRepository;

        private Organisation _organisation;
        private RoomForm _model;
        private User _user = new User {Id = Guid.NewGuid().ToString()};

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<RoomController>();
            
            _organisationRepository = serviceProvider.GetRequiredService<IRepository<Organisation, long>>();
            _roomRepository = serviceProvider.GetRequiredService<IRepository<Room, long>>();

            _organisation = _organisationRepository.Save(new Organisation
            {
                Name = "Org name"
            });
            _model = new RoomForm
            {
                Capacity = 30,
                Name = "Room name",
                Address = "3r, state1"
            };
        }

        [Test]
        public void Add()
        {
            Room room = _controller.Add(_model, _organisation, _user).Value as Room;

            _roomRepository.Refresh(room);

            Assert.NotNull(room);
            Assert.AreEqual(_model.Name, room.Name);
            Assert.AreEqual(_model.Address, room.Address);
            Assert.AreEqual(_model.Capacity, room.Capacity);
            Assert.AreEqual(_user.Id, room.RegisterUserId);
            
            Assert.AreEqual(_organisation, room.Organisation);
            Assert.AreEqual(1, _organisation.RoomCount);
        }

        [Test]
        public void TryAdd_WithUsedName_ShouldThrow()
        {
            _controller.Add(_model, _organisation, _user);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller.Add(_model, _organisation, _user));

            Assert.AreEqual("{room.constraints.uniqueName}", ex.Message);
        }
        
        [Test]
        public void ChangeName()
        {
            Room room = _controller.Add(_model, _organisation, _user).Value as Room;

            string name = "roomName1";
            _controller.ChangeName(room, name);
            _roomRepository.Refresh(room);
            
            Assert.NotNull(room);
            Assert.AreEqual(name, room.Name);
            
        }

        [Test]
        public void TryChangeName_WithUsedName_ShouldThrow()
        {
            Room room = _controller.Add(_model, _organisation, _user).Value as Room;

            _model.Name = "new room name";
            _controller.Add(_model, _organisation, _user);

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.ChangeName(room, _model.Name)
            );

            Assert.AreEqual("{room.constraints.uniqueName}", ex.Message);
        }

        [Test]
        public void ChangeInfo()
        {
            RoomInfoForm form = new RoomInfoForm
            {
                Capacity = 20,
                Address = "new address"
            };
            Room room = _controller.Add(_model, _organisation, _user).Value as Room;
            _controller.Update(room, form);

            _organisationRepository.Update(_organisation);
            Assert.NotNull(room);
            Assert.AreEqual(form.Address, room.Address);
            Assert.AreEqual(form.Capacity, room.Capacity);
        }
        
        

        [Test]
        public void Delete()
        {
            Room room = _controller.Add(_model, _organisation, _user).Value as Room;
            _controller.Delete(room);
            _organisationRepository.Refresh(_organisation);
            
            Assert.AreEqual(0, _organisation.RoomCount);
            Assert.False(_roomRepository.Exists(room));
        }
    }
}