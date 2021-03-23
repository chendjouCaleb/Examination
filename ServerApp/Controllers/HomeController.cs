using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace Exam.Controllers
{
    public class HomeController : Controller
    {
        private IWebHostEnvironment env;
        public HomeController(IWebHostEnvironment env)
        {
            this.env = env;
        }
        public IActionResult Index()
        {
            if (env.IsDevelopment())
            {
                Console.WriteLine("Dev mode");
                return View("Index");
            }
            return View("Placeholder");  
        }
    }
}