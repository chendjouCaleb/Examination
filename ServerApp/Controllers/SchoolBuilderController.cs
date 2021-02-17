﻿using System;
using Exam.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    [Route("api/schoolBuilder")]
    public class SchoolBuilderController : Controller
    {
        private SchoolBuilder _schoolBuilder;

        public SchoolBuilderController(IServiceProvider serviceProvider)
        {
            _schoolBuilder = new SchoolBuilder(serviceProvider);
        }

        [HttpGet]
        public School Build()
        {
            Console.Clear();
            return _schoolBuilder.CreateSchool();
        }
    }
}