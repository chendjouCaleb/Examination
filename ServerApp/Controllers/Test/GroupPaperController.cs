using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Persistence.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers
{
    [Route("api")]
    public class GroupPaperController
    {
        private ITestGroupRepository _testGroupRepository;
        private ITestRepository _testRepository;
        private IRepository<Paper, long> _paperRepository;
        private DbContext _dbContext;

        public GroupPaperController(ITestGroupRepository testGroupRepository,
            ITestRepository testRepository,
            DbContext dbContext,
            IRepository<Paper, long> paperRepository)
        {
            _testGroupRepository = testGroupRepository;
            _testRepository = testRepository;
            _paperRepository = paperRepository;
            _dbContext = dbContext;
        }


        [HttpGet("papers/countNonGroupedPapers")]
        [RequireQueryParameter("testId")]
        [LoadTest(Source = ParameterSource.Query)]
        public long CountNonGroupedPapers(Test test) => _paperRepository
            .Count(s => test.Equals(s.Test) && s.TestGroup == null);


        [HttpPut("papers/group")]
        [RequireQueryParameter("testId")]
        [LoadTest(SchoolItemName = "school", Source = ParameterSource.Query)]
        [IsPlanner]
        public int GroupByTest(Test test)
        {
            return Group(test);
        }

        [HttpPut("tests/{testId}/group")]
        [LoadTest(SchoolItemName = "school")]
        [IsPlanner]
        public int Group(Test test)
        {
//            if (CanGroupPapers(test) < 0)
//            {
//                return false;
//            }

            List<Paper> papers = _paperRepository.Set
                .Where(p => test.Equals(p.Test))
                .OrderBy(p => p.ExaminationStudent.SemesterStudent.YearStudent.Student.FullName).ToList();
            
            List<TestGroup> testGroups = _testGroupRepository.Set
                .Where(g => test.Equals(g.Test))
                .OrderBy(s => s.Index).ToList();

            int count = GroupPapers(testGroups, papers);

            test.LastGroupingDate = DateTime.Now;
            test.Grouped = true;
            test.NotGroupedStudentCount = test.PaperCount - (uint)count;
            _testRepository.Update(test);

            return count;
        }


        [HttpPut("tests/{testId}/ungroup")]
        [LoadTest(SchoolItemName = "school")]
        [IsPlanner]
        public void UnGroup(Test test)
        {
            Assert.RequireNonNull(test, nameof(test));
            var testGroups = _testGroupRepository.List(t => test.Equals(t.Test));
            foreach (var testGroup in testGroups)
            {
                UnGroup(testGroup);
            }

            _dbContext.SaveChanges();
        }


        [HttpPut("testGroups/{testGroupId}/ungroup")]
        [LoadTestGroup(SchoolItemName = "school")]
        [IsPlanner]
        public void UnGroup(TestGroup testGroup)
        {
            Assert.RequireNonNull(testGroup, nameof(testGroup));
            IList<Paper> papers = _paperRepository.List(s => testGroup.Equals(s.TestGroup));

            foreach (var paper in papers)
            {
                paper.TestGroup = null;
                paper.TestGroupId = null;
                paper.GroupIndex = 0;
                _dbContext.Update(paper);
            }

            testGroup.PaperCount = 0;
            _dbContext.Update(testGroup);
        }


        public int GroupPapers(IEnumerable<TestGroup> testGroups, List<Paper> papers)
        {
            int index = 0;
            int count = 0;
            foreach (TestGroup testGroup in testGroups)
            {
                int capacity = (int) testGroup.Room.Capacity;
                Console.WriteLine("Capacity:" + capacity);

                if (capacity > papers.Count - index)
                {
                    capacity = papers.Count - index;
                }

                List<Paper> groupPapers = papers.GetRange(index, capacity);
                for (int i = 0; i < groupPapers.Count; i++)
                {
                    Paper paper = groupPapers[i];

                    paper.TestGroup = testGroup;
                    paper.GroupIndex = i;
                    _dbContext.Set<Paper>().Update(paper);
                    count++;
                }

                testGroup.PaperCount = (uint)groupPapers.Count;
                _dbContext.Update(testGroup);

                index += (int) testGroup.Room.Capacity;
                if (index >= papers.Count)
                {
                    break;
                }
            }

            _dbContext.SaveChanges();
            return count;
        }

        void Group(TestGroup testGroup, List<Paper> papers)
        {
            for (int i = 0; i < papers.Count; i++)
            {
                Paper paper = papers[i];

                paper.TestGroup = testGroup;
                paper.GroupIndex = i;
                _paperRepository.Update(paper);
            }
        }

        [HttpGet("tests/{testId}/canGroupPapers")]
        [LoadTest(SchoolItemName = "school")]
        [IsPlanner]
        public int CanGroupPapers(Test test)
        {
            long testCapacity = _paperRepository.Count(p => test.Equals(p.Test));
            long available = _testGroupRepository.List(t => test.Equals(t.Test)).Sum(t => t.Room.Capacity);

            return (int) (available - testCapacity);
        }
    }
}