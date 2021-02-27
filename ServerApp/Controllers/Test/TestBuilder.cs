using System;
using System.Collections.Generic;
using System.Linq;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Exam.Controllers
{
    public class TestBuilder
    {
        private DbContext _dbContext;
        private TestController _testController;
        private TestScoreController _testScoreController;
        private TestLevelSpecialityController _testLevelSpecialityController;

        public TestBuilder(IServiceProvider serviceProvider)
        {
            _dbContext = serviceProvider.GetService<DbContext>();
            _testController = serviceProvider.GetService<TestController>();
            _testScoreController = serviceProvider.GetService<TestScoreController>();
            _testLevelSpecialityController = serviceProvider.GetService<TestLevelSpecialityController>();
        }


        public Test Test { get; private set; }
        public List<TestLevelSpeciality> TestLevelSpecialities { get; private set; } = new List<TestLevelSpeciality>();


        public Test Add(
            Course course,
            ExaminationLevel examinationLevel,
            TestForm form,
            Planner planner)
        {
            Test = _testController._Add(course, examinationLevel, form, planner);

            if (!course.IsGeneral)
            {
                TestLevelSpecialities = _dbContext.Set<CourseLevelSpeciality>()
                    .Where(c => c.Course.Equals(course)).ToList()
                    .Select(c =>
                        _testLevelSpecialityController._Add(Test, c,
                            _dbContext.Set<ExaminationLevelSpeciality>()
                                .First(l => l.LevelSpecialityId == c.LevelSpecialityId &&
                                            l.ExaminationLevel.Equals(examinationLevel)))
                    ).ToList();
            }

            _dbContext.Set<Test>().Add(Test);

            if (course.MultipleScore)
            {
                var testScores = _testScoreController.Copy(Test, course);
                _dbContext.Set<TestScore>().AddRange(testScores);
            }
            
            _dbContext.Set<TestLevelSpeciality>().AddRange(TestLevelSpecialities);

            _dbContext.SaveChanges();

            return Test;
        }
    }
}