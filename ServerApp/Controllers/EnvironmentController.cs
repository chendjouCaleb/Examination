using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Exam.Controllers
{
        [Route("api/environment")]
        public class Environment: Controller
        {
            private IConfiguration _configuration;

            public Environment(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            
            [HttpGet("database")]
            public async Task<ActionResult> GetDatabase()
            {
                string connectionString = _configuration["Data:SQLiteConnectionStrings"];
                if (string.IsNullOrWhiteSpace(connectionString))
                {
                    return BadRequest("Connection string not found!");
                }

                string[] parts = connectionString.Split('=');
                if (parts.Length != 2)
                {
                    return BadRequest("Malformed connection string");
                }
                string fileName = parts[1];
                string path = Path.Join(Directory.GetCurrentDirectory(), fileName);
                
                var memory = new MemoryStream();
                await using (var stream = new FileStream(path, FileMode.Open))
                {
                    await stream.CopyToAsync(memory);
                }
                memory.Position = 0;
                return File(memory, "application/octetstream", fileName);
            }

            [HttpGet("directory")]
            public string GetDirectory()
            {
                return Directory.GetCurrentDirectory();
            }
        }
}