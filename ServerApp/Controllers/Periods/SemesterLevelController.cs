using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities.Periods;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers.Periods
{
    [Route("api/semesterLevels")]
    public class SemesterLevelController
    {
        private IRepository<SemesterLevel, long> _semesterLevelRepository;

        public SemesterLevelController(IRepository<SemesterLevel, long> semesterLevelRepository)
        {
            _semesterLevelRepository = semesterLevelRepository;
        }


        [HttpGet("{semesterLevelId}")]
        public SemesterLevel Get(long semesterLevelId)
        {
            return _semesterLevelRepository.Find(semesterLevelId);
        }

        [HttpGet]
        public IEnumerable<SemesterLevel> List([FromQuery] long? levelId, 
            [FromQuery] long? yearLevelId,
            [FromQuery] long? semesterDepartmentId, 
            [FromQuery] long? semesterId, 
            int take = 50, int skip = 0)
        {
            var query = _semesterLevelRepository.Set;

            if (levelId != null)
            {
                query = query.Where(yl => yl.YearLevel.LevelId == levelId);
            }
            
            if (yearLevelId != null)
            {
                query = query.Where(yl => yl.YearLevelId == yearLevelId);
            }

            if (semesterDepartmentId != null)
            {
                query = query.Where(yl => yl.SemesterDepartmentId == semesterDepartmentId);
            }
            
            if (semesterId != null)
            {
                query = query.Where(yl => yl.SemesterDepartment.SemesterId == semesterId);
            }

            query = query.Skip(skip).Take(take);

            return query.ToList();
        }
    }
}