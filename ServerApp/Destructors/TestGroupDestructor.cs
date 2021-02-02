using System.Collections.Generic;
using System.Linq;
using Exam.Entities;
using Microsoft.EntityFrameworkCore;

namespace Exam.Destructors
{
    public class TestGroupDestructor
    {
        private DbContext _dbContext;

        public TestGroupDestructor(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Destroy(TestGroup testGroup)
        {
            _Destroy(testGroup);
            
            List<TestGroup> testGroups = _dbContext.Set<TestGroup>()
                .Where(t => t.TestId == testGroup.TestId)
                .ToList()
                .FindAll(t => !t.Equals(testGroup));

            for (int i = 0; i < testGroups.Count; i++)
            {
                testGroups[i].Index = i;
                _dbContext.Update(testGroups[i]);
            }

            testGroup.Test.TestGroupCount--;
            _dbContext.Update(testGroup.Test);
            
            _dbContext.SaveChanges();
        }

        public void _Destroy(TestGroup testGroup)
        {
            DestroyTestGroupCorrectors(testGroup);
            DestroyTestGroupSecretaries(testGroup);
            DestroyTestGroupSupervisors(testGroup);
            UpdatePapers(testGroup);
            _dbContext.Remove(testGroup);
            
        }

        private void DestroyTestGroupSupervisors(TestGroup testGroup)
        {
            var items = _dbContext.Set<TestGroupSupervisor>().Where(t => testGroup.Equals(t.TestGroup));
            _dbContext.RemoveRange(items);
        }


        private void DestroyTestGroupCorrectors(TestGroup testGroup)
        {
            var items = _dbContext.Set<TestGroupCorrector>().Where(t => testGroup.Equals(t.TestGroup));
            _dbContext.RemoveRange(items);
        }

        private void DestroyTestGroupSecretaries(TestGroup testGroup)
        {
            var items = _dbContext.Set<TestGroupSecretary>().Where(t => testGroup.Equals(t.TestGroup));
            _dbContext.RemoveRange(items);
        }

        private void UpdatePapers(TestGroup testGroup)
        {
            var items = _dbContext.Set<Paper>().Where(t => testGroup.Equals(t.TestGroup));

            foreach (Paper paper in items)
            {
                paper.TestGroup = null;
                paper.TestGroupId = null;
            }
            
            _dbContext.UpdateRange(items);
        }
    }
}