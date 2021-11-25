using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities.Periods;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers.Periods
{
    [Route("api/semesterLevelSpecialities")]
    public class SemesterLevelSpecialityController
    {
        private IRepository<SemesterLevelSpeciality, long> _semesterLevelSpecialityRepository;

        public SemesterLevelSpecialityController(IRepository<SemesterLevelSpeciality, long> semesterLevelSpecialityRepository)
        {
            _semesterLevelSpecialityRepository = semesterLevelSpecialityRepository;
        }


        [HttpGet("{semesterLevelSpecialityId}")]
        public SemesterLevelSpeciality Get(long semesterLevelSpecialityId)
        {
            return _semesterLevelSpecialityRepository.Find(semesterLevelSpecialityId);
        }

        [HttpGet]
        public IEnumerable<SemesterLevelSpeciality> List([FromQuery] long? levelSpecialityId, 
            [FromQuery] long? semesterLevelId, 
            [FromQuery] long? yearLevelSpecialityId,
            [FromQuery] long? semesterSpecialityId, 
            int take = 50, int skip = 0)
        {
            var query = _semesterLevelSpecialityRepository.Set;

            if (levelSpecialityId != null)
            {
                query = query.Where(yd => yd.YearLevelSpeciality.LevelSpecialityId == levelSpecialityId);
            }
            
            if (yearLevelSpecialityId != null)
            {
                query = query.Where(yd => yd.YearLevelSpecialityId == yearLevelSpecialityId);
            }

            if (semesterSpecialityId != null)
            {
                query = query.Where(yd => yd.SemesterSpecialityId == semesterSpecialityId);
            }
            
            if (semesterLevelId != null)
            {
                query = query.Where(yd => yd.SemesterLevelId == semesterLevelId);
            }

            query = query.Skip(skip).Take(take);

            return query.ToList();
        }
    }
}