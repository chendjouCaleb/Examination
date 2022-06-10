using System;
using System.Threading.Tasks;
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
        public async Task<School> Build()
        {
            Console.Clear();
            School school = await _schoolBuilder.CreateSchool();
            return school;
        }
    }
}