using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
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
        private IRepository<Organisation, long> _organisationRepository;
        private ILogger<RoomController> _logger;

        public RoomController(IRepository<Room, long> roomRepository,
            IRepository<Organisation, long> organisationRepository,
            ILogger<RoomController> logger)
        {
            _roomRepository = roomRepository;
            _organisationRepository = organisationRepository;
            _logger = logger;
        }


        [HttpGet("{roomId}")]
        [LoadRoom]
        public Room Find(Room room) => room;


        [HttpGet]
        [RequireQueryParameter("organisationId")]
        [LoadOrganisation(Source = ParameterSource.Query)]
        public IEnumerable<Room> List(Organisation organisation, [FromQuery] int start = 0, [FromQuery] int take = 20)
        {
            IQueryable<Room> queryable = _roomRepository.Set;

            if (organisation != null)
            {
                queryable = queryable.Where(r => r.OrganisationId == organisation.Id);
            }

            queryable = queryable.Skip(start).Take(take);

            return queryable.ToList();
        }


        [HttpPost]
        [RequireQueryParameter("organisationId")]
        [LoadOrganisation(Source = ParameterSource.Query)]
        [AuthorizeOrganisationAdmin]
        public CreatedAtActionResult Add(Organisation organisation, [FromBody] RoomForm form)
        {
            if (_roomRepository.Exists(r => r.Name == form.Name && r.OrganisationId == organisation.Id))
            {
                throw new InvalidValueException("{room.constraints.uniqueName}");
            }

            Room room = new Room
            {
                Organisation = organisation,
                Name = form.Name,
                Capacity = form.Capacity,
                Address = form.Address
            };

            _roomRepository.Save(room);

            organisation.RoomCount += 1;
            _organisationRepository.Update(organisation);

            _logger.LogInformation($"New Room: {room}");

            return CreatedAtAction("Find", new {room.Id}, room);
        }


        [HttpPut("{roomId}/name")]
        [LoadRoom(OrganisationItemName = "organisation")]
        [AuthorizeOrganisationAdmin(OrganisationItemName = "organisation")]
        public StatusCodeResult ChangeName(Room room, [FromQuery] string name)
        {
            Assert.RequireNonNull(room, nameof(room));
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentNullException(nameof(name));
            }

            if (_roomRepository.Exists(e => e.Name == name && room.OrganisationId == e.OrganisationId))
            {
                throw new InvalidValueException("{room.constraints.uniqueName}");
            }

            room.Name = name;

            _roomRepository.Update(room);

            return StatusCode(StatusCodes.Status202Accepted);
        }
        
        
        [HttpPut("{roomId}")]
        [LoadRoom(OrganisationItemName = "organisation")]
        [AuthorizeOrganisationAdmin(OrganisationItemName = "organisation")]
        public AcceptedResult Update(Room room, [FromBody] RoomInfoForm form)
        {
            Assert.RequireNonNull(room, nameof(room));

            room.Capacity = form.Capacity;
            room.Address = form.Address;
            
            _roomRepository.Update(room);

            return Accepted(room);
        }
        
        
        [HttpDelete("{roomId}")]
        [LoadRoom(OrganisationItemName = "organisation")]
        [AuthorizeOrganisationAdmin(OrganisationItemName = "organisation")]
        public NoContentResult Delete(Room room)
        {
            room.Organisation.RoomCount -= 1;
            _organisationRepository.Update(room.Organisation);
            _roomRepository.Delete(room);

            return NoContent();
        }
        
    }
}