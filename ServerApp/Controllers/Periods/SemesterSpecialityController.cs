using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities.Periods;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers.Periods
{
    [Route("api/semesterSpecialities")]
    public class SemesterSpecialityController
    {
        private IRepository<SemesterSpeciality, long> _semesterSpecialityRepository;

        public SemesterSpecialityController(IRepository<SemesterSpeciality, long> semesterSpecialityRepository)
        {
            _semesterSpecialityRepository = semesterSpecialityRepository;
        }


        [HttpGet("{semesterSpecialityId}")]
        public SemesterSpeciality Get(long semesterSpecialityId)
        {
            return _semesterSpecialityRepository.Find(semesterSpecialityId);
        }

        [HttpGet]
        public IEnumerable<SemesterSpeciality> List([FromQuery] long? specialityId, 
            [FromQuery] long? yearSpecialityId,
            [FromQuery] long? semesterDepartmentId, int take = 50, int skip = 0)
        {
            var query = _semesterSpecialityRepository.Set;

            if (specialityId != null)
            {
                query = query.Where(yd => yd.YearSpeciality.SpecialityId == specialityId);
            }
            
            if (yearSpecialityId != null)
            {
                query = query.Where(yd => yd.YearSpecialityId == yearSpecialityId);
            }

            if (semesterDepartmentId != null)
            {
                query = query.Where(yd => yd.SemesterDepartmentId == semesterDepartmentId);
            }

            query = query.Skip(skip).Take(take);

            return query.ToList();
        }
    }
}