using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities.Periods;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers.Periods
{
    [Route("api/semesterDepartments")]
    public class SemesterDepartmentController
    {
        private IRepository<SemesterDepartment, long> _semesterDepartmentRepository;

        public SemesterDepartmentController(IRepository<SemesterDepartment, long> semesterDepartmentRepository)
        {
            _semesterDepartmentRepository = semesterDepartmentRepository;
        }


        [HttpGet("{semesterDepartmentId}")]
        public SemesterDepartment Get(long semesterDepartmentId)
        {
            return _semesterDepartmentRepository.Find(semesterDepartmentId);
        }

        [HttpGet]
        public IEnumerable<SemesterDepartment> List([FromQuery] long? departmentId,
            [FromQuery] long? yearDepartmentId,
            [FromQuery] long? semesterId, int take = 50, int skip = 0)
        {
            var query = _semesterDepartmentRepository.Set;

            if (departmentId != null)
            {
                query = query.Where(yd => yd.YearDepartment.DepartmentId == departmentId);
            }
            
            if (yearDepartmentId != null)
            {
                query = query.Where(yd => yd.YearDepartmentId == yearDepartmentId);
            }

            if (semesterId != null)
            {
                query = query.Where(yd => yd.SemesterId == semesterId);
            }

            query = query.Skip(skip).Take(take);

            return query.ToList();
        }
    }
}