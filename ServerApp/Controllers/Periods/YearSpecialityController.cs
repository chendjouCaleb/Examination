using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities.Periods;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers.Periods
{
    [Route("api/yearSpecialities")]
    public class YearSpecialityController
    {
        private IRepository<YearSpeciality, long> _yearSpecialityRepository;

        public YearSpecialityController(IRepository<YearSpeciality, long> yearSpecialityRepository)
        {
            _yearSpecialityRepository = yearSpecialityRepository;
        }


        [HttpGet("{yearSpecialityId}")]
        public YearSpeciality Get(long yearSpecialityId)
        {
            return _yearSpecialityRepository.Find(yearSpecialityId);
        }

        [HttpGet]
        public IEnumerable<YearSpeciality> List([FromQuery] long? specialityId, 
            [FromQuery] long? yearDepartmentId, int take = 50, int skip = 0)
        {
            var query = _yearSpecialityRepository.Set;

            if (specialityId != null)
            {
                query = query.Where(yd => yd.SpecialityId == specialityId);
            }

            if (yearDepartmentId != null)
            {
                query = query.Where(yd => yd.YearDepartmentId == yearDepartmentId);
            }

            query = query.Skip(skip).Take(take);

            return query.ToList();
        }
    }
}