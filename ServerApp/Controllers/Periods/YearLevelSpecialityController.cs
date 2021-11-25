using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities.Periods;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers.Periods
{
    [Route("api/yearLevelSpecialities")]
    public class YearLevelSpecialityController
    {
        private IRepository<YearLevelSpeciality, long> _yearLevelSpecialityRepository;

        public YearLevelSpecialityController(IRepository<YearLevelSpeciality, long> yearLevelSpecialityRepository)
        {
            _yearLevelSpecialityRepository = yearLevelSpecialityRepository;
        }


        [HttpGet("{yearLevelSpecialityId}")]
        public YearLevelSpeciality Get(long yearLevelSpecialityId)
        {
            return _yearLevelSpecialityRepository.Find(yearLevelSpecialityId);
        }

        [HttpGet]
        public IEnumerable<YearLevelSpeciality> List([FromQuery] long? levelSpecialityId, 
            [FromQuery] long? yearLevelId, 
            [FromQuery] long? yearSpecialityId, 
            int take = 50, int skip = 0)
        {
            var query = _yearLevelSpecialityRepository.Set;

            if (levelSpecialityId != null)
            {
                query = query.Where(yd => yd.LevelSpecialityId == levelSpecialityId);
            }

            if (yearSpecialityId != null)
            {
                query = query.Where(yd => yd.YearSpecialityId == yearSpecialityId);
            }
            
            if (yearLevelId != null)
            {
                query = query.Where(yd => yd.YearLevelId == yearLevelId);
            }

            query = query.Skip(skip).Take(take);

            return query.ToList();
        }
    }
}