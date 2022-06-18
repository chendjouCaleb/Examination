using System.IO;
using System.Threading.Tasks;
using Everest.AspNetStartup.Infrastructure;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Exam.Controllers
{
    
    [Route("api/files")]
    public class FileController:Controller
    {

        private IConfiguration _configuration;

        public FileController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("images/{imageName}")]
        public async Task<IActionResult> DownloadImage(string imageName)
        {
            Assert.RequireNonNull(imageName, nameof(imageName));

            string path = Path.Combine(_configuration["File:Paths:Images"], imageName);
            Stream memory = new MemoryStream();

            await using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }

            memory.Position = 0;
            
            string mime = MimeTypes.GetMimeType(Path.GetExtension(path));
            return File(memory, mime);
        }
    }
}