using System.Collections.Generic;
using System.Linq;
using Exam.Authorizers;
using Exam.Entities.Periods;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers
{
    [Route("api/semesterGroups")]
    public class SemesterGroupController:Controller
    {
        private DbContext _dbContext;

        [HttpGet("{semesterGroupId}")]
        public SemesterGroup Get(long semesterGroupId)
        {
            return _dbContext.Set<SemesterGroup>().Find(semesterGroupId);
        }


        [HttpGet]
        public IEnumerable<SemesterGroup> List(long? semesterLevelId)
        {
            IQueryable<SemesterGroup> query = _dbContext.Set<SemesterGroup>();

            if (semesterLevelId != null)
            {
                query = query.Where(s => s.SemesterLevelId == semesterLevelId);
            }

            return query.ToList();
        }



        [HttpPost]
        public CreatedAtActionResult Add(SemesterLevel semesterLevel, [FromBody] SemesterGroupAddForm form)
        {
            Assert.RequireNonNull(semesterLevel, nameof(semesterLevel));
            Assert.RequireNonNull(form, nameof(form));

            if (Contains(semesterLevel, form.Name))
            {
                throw new DuplicateObjectException("DUPLICATE_GROUP_NAME");
            }
            
            SemesterGroup semesterGroup = new SemesterGroup
            {
                Name = form.Name,
                Capacity = form.Capacity,
                SemesterLevel = semesterLevel,
                Index = _dbContext.Set<SemesterGroup>().Count(c => c.SemesterLevel.Equals(semesterLevel))
            };

            _dbContext.Add(semesterGroup);
            _dbContext.SaveChanges();

            return CreatedAtAction("Get", new {semesterGroupId = semesterGroup.Id, semesterGroup});
        }


        [HttpGet("{semesterGroupId}")]
        [LoadSemesterGroup(SchoolItemName = "school")]
        [IsPlanner]
        public NoContentResult Delete(SemesterGroup semesterGroup)
        {
            Assert.RequireNonNull(semesterGroup, nameof(semesterGroup));
            _dbContext.Remove(semesterGroup);
            _dbContext.SaveChanges();
            return NoContent();
        }


        public bool Contains(SemesterLevel semesterLevel, string name)
        {
            return _dbContext.Set<SemesterGroup>()
                .Any(s => s.SemesterLevel.Equals(semesterLevel) && s.Name == name);
        }
    }
}