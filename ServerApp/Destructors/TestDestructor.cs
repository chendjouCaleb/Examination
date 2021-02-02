using System;
using System.Collections.Generic;
using System.Linq;
using Exam.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Exam.Destructors
{
    public class TestDestructor
    {
        private ILogger<TestDestructor> _logger;
        private DbContext _dbContext;

        public TestDestructor(IServiceProvider serviceProvider)
        {
            _logger = serviceProvider.GetService<ILogger<TestDestructor>>();
            _dbContext = serviceProvider.GetService<DbContext>();
        }

        public void Destroy(Test test)
        {
            DestroyPaperScores(test);
            DestroyPapers(test);
            DestroyTestLevelSpecialities(test);
            DestroyTestGroups(test);
            _dbContext.Remove(test);
            _dbContext.SaveChanges();
            _logger.LogInformation($"Le test ID={test.Id} a été supprimé");
        }

        private void DestroyTestLevelSpecialities(Test test)
        {
            var items = _dbContext.Set<TestLevelSpeciality>().Where(tls => test.Equals(tls.Test));
            _dbContext.RemoveRange(items);
        }

        private void DestroyTestGroups(Test test)
        {
            IEnumerable<TestGroup> items = _dbContext.Set<TestGroup>().Where(tls => test.Equals(tls.Test));

            foreach (var testGroup in items)
            {
                TestGroupDestructor destructor = new TestGroupDestructor(_dbContext);
                destructor._Destroy(testGroup);
            }
        }
        
        private void DestroyPapers(Test test)
        {
            IEnumerable<Paper> items = _dbContext.Set<Paper>().Where(tls => test.Equals(tls.Test));

            _dbContext.RemoveRange(items);
        }
        
        private void DestroyPaperScores(Test test)
        {
            IEnumerable<ScorePaper> items = _dbContext.Set<ScorePaper>().Where(tls => test.Equals(tls.Paper.Test));

            _dbContext.RemoveRange(items);
        }
        
    }
}