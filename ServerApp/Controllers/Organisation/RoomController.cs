using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Identity;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    [Route("api/rooms")]
    public class RoomController : Controller
    {
        private IRepository<Room, long> _roomRepository;
        private IRepository<School, long> _schoolRepository;
        private ILogger<RoomController> _logger;

        public RoomController(IRepository<Room, long> roomRepository,
            IRepository<School, long> schoolRepository,
            ILogger<RoomController> logger)
        {
            _roomRepository = roomRepository;
            _schoolRepository = schoolRepository;
            _logger = logger;
        }


        [HttpGet("{roomId}")]
        [LoadRoom]
        public Room Find(Room room) => room;

        [HttpGet("find/name")]
        [RequireQueryParameter("schoolId")]
        [RequireQueryParameter("name")]
        public Room FindByName([FromQuery] long schoolId, [FromQuery] string name)
        {
            return _roomRepository.First(a => schoolId == a.SchoolId && name == a.Name);
        }

        public Room First(School school, [FromQuery] string name)
        {
            return _roomRepository.First(a => school.Equals(a.School) && name == a.Name);
        }


        [HttpGet]
        public IEnumerable<Room> List([FromQuery] long? schoolId,
            [FromQuery] long? departmentId,
            [FromQuery] long? levelId)
        {
            if (schoolId != null)
            {
                return _roomRepository.List(r => r.SchoolId == schoolId.Value);
            }

            if (departmentId != null)
            {
                return _roomRepository.List(r => r.DepartmentId == departmentId.Value);
            }

            if (levelId != null)
            {
                return _roomRepository.List(r => r.LevelId == levelId);
            }

            return new Room[] { };
        }


        [HttpPost]
        [ValidModel]
        [LoadSchool(Source = ParameterSource.Query)]
        [LoadDepartment(Source = ParameterSource.Query, SchoolItemName = "school")]
        [LoadLevel(Source = ParameterSource.Query, SchoolItemName = "school")]
        [IsDirector]
        public CreatedAtActionResult Add([FromBody] RoomForm form, LoggedUser loggedUser,
            School school, Department department = null, Level level = null)
        {
            if (department != null)
            {
                school = department.School;
            }

            if (level != null)
            {
                department = level.Department;
                school = department.School;
            }

            Assert.RequireNonNull(school, nameof(school));
            if (_roomRepository.Exists(r => r.Name == form.Name && r.SchoolId == school.Id))
            {
                throw new InvalidValueException("{room.constraints.uniqueName}");
            }

            Room room = new Room
            {
                Name = form.Name,
                Capacity = form.Capacity,
                Address = form.Address,
                RegisterUserId = loggedUser.UserId,
                
                School = school,
                Department = department,
                Level = level
            };


            _roomRepository.Save(room);
            _logger.LogInformation($"New Room: {room}");

            return CreatedAtAction("Find", new {room.Id}, room);
        }


        [HttpPut("{roomId}/name")]
        [LoadRoom(SchoolItemName = "school")]
        [IsDirector]
        public StatusCodeResult ChangeName(Room room, [FromQuery] string name)
        {
            Assert.RequireNonNull(room, nameof(room));
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentNullException(nameof(name));
            }

            if (_roomRepository.Exists(e => e.Name == name && room.SchoolId == e.SchoolId))
            {
                throw new InvalidValueException("{room.constraints.uniqueName}");
            }

            room.Name = name;

            _roomRepository.Update(room);

            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{roomId}")]
        [ValidModel]
        [LoadRoom(SchoolItemName = "school")]
        [IsDirector]
        public AcceptedResult Update(Room room, [FromBody] RoomInfoForm form)
        {
            Assert.RequireNonNull(room, nameof(room));
            Assert.RequireNonNull(form, nameof(form));


            if (_roomRepository.Exists(e => e.Name == form.Name && room.SchoolId == e.SchoolId && !e.Equals(room)))
            {
                throw new InvalidValueException("{room.constraints.uniqueName}");
            }

            room.Name = form.Name;
            room.Capacity = form.Capacity;
            room.Address = form.Address;

            _roomRepository.Update(room);

            return Accepted(room);
        }


        [HttpDelete("{roomId}")]
        [LoadRoom(SchoolItemName = "school")]
        [IsDirector]
        public NoContentResult Delete(Room room)
        {
            _schoolRepository.Update(room.School);
            _roomRepository.Delete(room);

            return NoContent();
        }
    }
}