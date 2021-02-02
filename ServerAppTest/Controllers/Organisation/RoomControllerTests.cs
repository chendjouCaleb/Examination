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
        private IRepository<School, long> _schoolRepository;
        private IRepository<Department, long> _departmentRepository;
        private IRepository<Level, long> _levelRepository;
        
        private School _school;
        private Department _department;
        private Level _level;
        private RoomForm _model;
        private User _user = new User {Id = Guid.NewGuid().ToString()};

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<RoomController>();

            _schoolRepository = serviceProvider.GetRequiredService<IRepository<School, long>>();
            _departmentRepository = serviceProvider.GetRequiredService<IRepository<Department, long>>();
            _roomRepository = serviceProvider.GetRequiredService<IRepository<Room, long>>();
            _levelRepository = serviceProvider.GetRequiredService<IRepository<Level, long>>();

            _school = _schoolRepository.Save(new School
            {
                Name = "Org name"
            });
            _department = _departmentRepository.Save(new Department
            {
                Name = "department",
                School = _school
            });
            _level = _levelRepository.Save(new Level
            {
                Index = 0,
                Department = _department
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
            Room room = _controller.Add(_model, _user, _school).Value as Room;

            _roomRepository.Refresh(room);

            Assert.NotNull(room);
            Assert.AreEqual(_model.Name, room.Name);
            Assert.AreEqual(_model.Address, room.Address);
            Assert.AreEqual(_model.Capacity, room.Capacity);
            Assert.AreEqual(_user.Id, room.RegisterUserId);

            Assert.AreEqual(_school, room.School);
        }
        
        [Test]
        public void Add_WithDepartment()
        {
            Room room = _controller.Add(_model, _user, _school, _department).Value as Room;

            _roomRepository.Refresh(room);

            Assert.NotNull(room);
            
            Assert.AreEqual(_department, room.Department);
            Assert.AreEqual(_school, room.School);
        }
        
        [Test]
        public void Add_WithLevel()
        {
            Room room = _controller.Add(_model, _user, _school, null, _level).Value as Room;

            _roomRepository.Refresh(room);

            Assert.NotNull(room);
            
            Assert.AreEqual(_level.Department, room.Department);
            Assert.AreEqual(_level, room.Level);
            Assert.AreEqual(_school, room.School);
        }

        [Test]
        public void TryAdd_WithUsedName_ShouldThrow()
        {
            _controller.Add(_model, _user, _school);
            Exception ex = Assert.Throws<InvalidValueException>(() => _controller.Add(_model, _user, _school));

            Assert.AreEqual("{room.constraints.uniqueName}", ex.Message);
        }

        [Test]
        public void ChangeName()
        {
            Room room = _controller.Add(_model, _user, _school).Value as Room;

            string name = "roomName1";
            _controller.ChangeName(room, name);
            _roomRepository.Refresh(room);

            Assert.NotNull(room);
            Assert.AreEqual(name, room.Name);
        }

        [Test]
        public void TryChangeName_WithUsedName_ShouldThrow()
        {
            Room room = _controller.Add(_model, _user, _school).Value as Room;

            _model.Name = "new room name";
            _controller.Add(_model, _user, _school);

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
                Name = "new name",
                Capacity = 20,
                Address = "new address"
            };
            Room room = _controller.Add(_model, _user, _school).Value as Room;
            _controller.Update(room, form);

            _schoolRepository.Update(_school);
            Assert.NotNull(room);
            Assert.AreEqual(form.Name, room.Name);
            Assert.AreEqual(form.Address, room.Address);
            Assert.AreEqual(form.Capacity, room.Capacity);
        }
        
        [Test]
        public void TryChangeInformation_WithUsedName_ShouldThrow()
        {
            Room room1 = _controller.Add(_model, _user, _school).Value as Room;
            Room room2 = _controller.Add(new RoomForm
            {
                Capacity = 30,
                Name = "Room2 name",
                Address = "3r, state1"
            }, _user, _school).Value as Room;
            Assert.NotNull(room1);
            Assert.NotNull(room2);
            
            RoomInfoForm form = new RoomInfoForm
            {
                Name = room2.Name,
                Capacity = 20,
                Address = "new address"
            };
            

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.Update(room1, form)
            );

            Assert.AreEqual("{room.constraints.uniqueName}", ex.Message);
        }


        [Test]
        public void Delete()
        {
            Room room = _controller.Add(_model, _user, _school).Value as Room;
            _controller.Delete(room);
            _schoolRepository.Refresh(_school);

            Assert.False(_roomRepository.Exists(room));
        }
    }
}