﻿using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities.Periods;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers.Periods
{
    [Route("api/yearLevels")]
    public class YearLevelController
    {
        private IRepository<YearLevel, long> _yearLevelRepository;

        public YearLevelController(IRepository<YearLevel, long> yearLevelRepository)
        {
            _yearLevelRepository = yearLevelRepository;
        }


        [HttpGet("{yearLevelId}")]
        public YearLevel Get(long yearLevelId)
        {
            return _yearLevelRepository.Set
                .Include(y => y.Level)
                .First(y => y.Id == yearLevelId);
        }

        [HttpGet]
        public IEnumerable<YearLevel> List([FromQuery] long? levelId, 
            [FromQuery] long? yearDepartmentId, 
            [FromQuery] long? yearId,
            int take = 50, int skip = 0)
        {
            var query = _yearLevelRepository.Set;

            if (levelId != null)
            {
                query = query.Where(yd => yd.LevelId == levelId);
            }

            if (yearDepartmentId != null)
            {
                query = query.Where(yd => yd.YearDepartmentId == yearDepartmentId);
            }
            
            if (yearId != null)
            {
                query = query.Where(yd => yd.YearDepartment.YearId == yearId);
            }

            query = query.Include(y => y.Level).Skip(skip).Take(take);

            return query.ToList();
        }
    }
}