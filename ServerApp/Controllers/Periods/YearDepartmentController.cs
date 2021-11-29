using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities.Periods;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers.Periods
{
    [Route("api/yearDepartments")]
    public class YearDepartmentController
    {
        private IRepository<YearDepartment, long> _yearDepartmentRepository;

        public YearDepartmentController(IRepository<YearDepartment, long> yearDepartmentRepository)
        {
            _yearDepartmentRepository = yearDepartmentRepository;
        }


        [HttpGet("{yearDepartmentId}")]
        public YearDepartment Get(long yearDepartmentId)
        {
            return _yearDepartmentRepository.Set.Include(y => y.Department)
                .First(y => y.Id == yearDepartmentId);
        }

        [HttpGet]
        public IEnumerable<YearDepartment> List([FromQuery] long? departmentId, 
            [FromQuery] long? yearId, int take = 50, int skip = 0)
        {
            var query = _yearDepartmentRepository.Set;

            if (departmentId != null)
            {
                query = query.Where(yd => yd.DepartmentId == departmentId);
            }

            if (yearId != null)
            {
                query = query.Where(yd => yd.YearId == yearId);
            }

            query = query.Include(y => y.Department).Skip(skip).Take(take);

            return query.ToList();
        }
    }
}