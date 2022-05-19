using System.Collections.Generic;
using System.IO;
using System.Linq;
using Exam.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Exam.Controllers
{
    [Route("api/schoolCodes/codes")]
    public class SchoolCodeController
    {
        private DbContext _dbContext;

        private List<string> _codes;

        public SchoolCodeController(DbContext dbContext)
        {
            _dbContext = dbContext;
            string text = File.ReadAllText(Path.Join(Directory.GetCurrentDirectory(), "codes.json"));
            _codes = JsonConvert.DeserializeObject<List<string>>(text);
        }

        [HttpGet]
        public List<string> Codes()
        {
            return _codes;
        }

        public bool IsValid(string code)
        {
           return _codes.Contains(code) && !_dbContext.Set<School>().Any(s => s.Code == code);
        }
        
        
    }
}