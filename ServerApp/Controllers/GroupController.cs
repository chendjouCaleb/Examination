using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Filters;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    [Route("api/groups")]
    public class GroupController : Controller
    {
        private IRepository<Examination, long> _examinationRepository;
        private IRepository<Speciality, long> _specialityRepository;
        private IRepository<Group, long> _groupRepository;
        private ILogger<GroupController> _logger;

        public GroupController(IRepository<Examination, long> examinationRepository,
            IRepository<Speciality, long> specialityRepository,
            IRepository<Group, long> groupRepository,
            ILogger<GroupController> logger)
        {
            _examinationRepository = examinationRepository;
            _specialityRepository = specialityRepository;
            _groupRepository = groupRepository;
            _logger = logger;
        }
        
        [HttpGet("find")]
        [RequireQueryParameter("examinationId")]
        [RequireQueryParameter("name")]
        [LoadExamination(Source = ParameterSource.Query)]
        public Group First(Examination examination, [FromQuery] string name)
        {
            return _groupRepository.First(a => examination.Equals(a.Examination) && name == a.Name);
        }


        [HttpGet("{groupId}")]
        [LoadGroup]
        public Group Find(Group group) => group;


        [HttpGet]
        [LoadExamination(Source = ParameterSource.Query)]
        
        public IEnumerable<Group> List(Examination examination, Speciality speciality, Room room,
            [FromQuery] int skip = 0, [FromQuery] int take = 20)
        {
            IQueryable<Group> set = _groupRepository.Set;
            if (examination != null && speciality != null)
            {
                set = set.Where(s => examination.Equals(s.Examination) && speciality.Equals(s.Speciality));
            }

            if (examination != null && room != null)
            {
                set = set.Where(s => examination.Equals(s.Examination) && room.Equals(s.Room));
            }

            if (examination != null)
            {
                set = set.Where(s => examination.Equals(s.Examination));
            }

            if (speciality != null)
            {
                set = set.Where(s => speciality.Equals(s.Speciality));
            }

            if (room != null)
            {
                set = set.Where(s => room.Equals(s.Room));
            }

            set = set.Skip(skip).Take(take);

            return set.ToList();
        }


        [HttpPost]
        [RequireQueryParameter("examinationId")]
        [RequireQueryParameter("roomId")]
        [LoadExamination(Source = ParameterSource.Query)]
        [LoadSpeciality(Source = ParameterSource.Query)]
        [LoadRoom(Source = ParameterSource.Query)]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished}")]
        [AuthorizeExaminationAdmin]
        public CreatedAtActionResult Add(Examination examination, Speciality speciality, Room room,
            [FromBody] GroupForm form, User user)
        {
            Assert.RequireNonNull(user, nameof(user));
            Assert.RequireNonNull(form, nameof(form));
            Assert.RequireNonNull(examination, nameof(examination));
            Assert.RequireNonNull(room, nameof(room));

            if (speciality != null && !examination.Equals(speciality.Examination))
            {
                throw new InvalidOperationException();
            }

            if (!examination.Organisation.Equals(room.Organisation))
            {
                throw new InvalidOperationException();
            }


            if (_groupRepository.Exists(s =>
                examination.Equals(s.Examination) && s.Name == form.Name))
            {
                throw new InvalidValueException("{group.constraints.uniqueName}");
            }

            Group group = new Group
            {
                Name = form.Name,
                Speciality = speciality,
                Examination = examination,
                Room = room,
                RegisterUserId = user.Id
            };
            group = _groupRepository.Save(group);
            _UpdateGroupIndex(examination);

            _logger.LogInformation($"New Group: {group}");

            return CreatedAtAction("Find", new {group.Id}, group);
        }


        [HttpPut("{groupId}/speciality")]
        [LoadGroup(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished}")]
        [LoadSpeciality(Source = ParameterSource.Query)]
        [AuthorizeExaminationAdmin]
        public StatusCodeResult ChangeSpeciality(Group group, Speciality speciality = null)
        {
            Assert.RequireNonNull(group, nameof(group));


            if (speciality != null && !group.Examination.Equals(speciality.Examination))
            {
                throw new InvalidOperationException();
            }

            group.Speciality = speciality;
            _groupRepository.Update(group);
            return StatusCode(StatusCodes.Status202Accepted);
        }
        
        [HttpPut("{groupId}/room")]
        [LoadGroup(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished}")]
        [LoadRoom(Source = ParameterSource.Query)]
        [AuthorizeExaminationAdmin]
        public StatusCodeResult ChangeRoom(Group group, Room room)
        {
            Assert.RequireNonNull(group, nameof(group));
            Assert.RequireNonNull(room, nameof(room));
            
            if (!group.Examination.Organisation.Equals(room.Organisation))
            {
                throw new InvalidOperationException();
            }

            group.Room = room;
            _groupRepository.Update(group);
            return StatusCode(StatusCodes.Status202Accepted);
        }


        [HttpPut("{groupId}/name")]
        [LoadGroup(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished}")]
        [LoadSpeciality(Source = ParameterSource.Query)]
        [AuthorizeExaminationAdmin]
        public StatusCodeResult ChangeName(Group group, [FromQuery] string name)
        {
            if (_groupRepository.Exists(s =>
                group.Examination.Equals(s.Examination) && s.Name == name))
            {
                throw new InvalidValueException("{group.constraints.uniqueName}");
            }

            group.Name = name;

            _groupRepository.Update(group);

            return StatusCode(StatusCodes.Status202Accepted);
        }
        
        
        [HttpDelete("{groupId}")]
        [LoadGroup(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished}")]
        [AuthorizeExaminationAdmin]
        public NoContentResult Delete(Group group)
        {
            Examination examination = group.Examination;
            _groupRepository.Delete(group);
            _UpdateGroupIndex(examination);
            return NoContent();
        }

        public void _UpdateGroupIndex(Examination examination)
        {
            var groups = _groupRepository.List(g => g.ExaminationId == examination.Id);
            for (int i = 0; i < groups.Count; i++)
            {
                if (groups[i].Index != i + 1)
                {
                    groups[i].Index = i + 1;
                    _groupRepository.Update(groups[i]);
                }
            }
        }
    }
}