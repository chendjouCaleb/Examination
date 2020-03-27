using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Loaders;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    [Route("api/tests")]
    public class TestController:Controller
    {
        private IRepository<Test, long> _testRepository;


        [HttpGet("{testId}")]
        [LoadTest]
        public Test Find(Test test) => test;
    }
}