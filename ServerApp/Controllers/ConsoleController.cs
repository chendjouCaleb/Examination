using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Exam.Controllers
{
    [Route("api/console")]
    public class ConsoleController
    {

        [HttpGet("clear")]
        public void Clear()
        {
            Console.Clear();
        }
    }
}