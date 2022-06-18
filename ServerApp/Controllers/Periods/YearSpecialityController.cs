using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities.Periods;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            return _yearSpecialityRepository.Set
                .Include(y => y.Speciality)
                .First(y => y.Id == yearSpecialityId);
        }

        [HttpGet]
        public IEnumerable<YearSpeciality> List([FromQuery] long? specialityId, 
            [FromQuery] long? yearDepartmentId, 
            [FromQuery] long? yearId,
            int take = 50, int skip = 0)
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
            
            if (yearId != null)
            {
                query = query.Where(yd => yd.YearDepartment.YearId == yearId);
            }

            query = query.Include(y => y.Speciality).Skip(skip).Take(take);

            return query.ToList();
        }
    }
}