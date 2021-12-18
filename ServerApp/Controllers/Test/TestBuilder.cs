using System;
using System.Collections.Generic;
using System.Linq;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Entities.Periods;
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


        public Test Add(
            SemesterCourse semesterCourse,
            ExaminationLevel examinationLevel,
            TestForm form,
            Planner planner)
        {
            Test test = _testController._Add(semesterCourse, examinationLevel, form, planner);
            _dbContext.Set<Test>().Add(test);

            var testLevelSpecialities = _testLevelSpecialityController._AddAll(test);
            _dbContext.AddRange(testLevelSpecialities);

            if (semesterCourse.Course.MultipleScore)
            {
                var testScores = _testScoreController.Copy(test, semesterCourse.Course);
                _dbContext.Set<TestScore>().AddRange(testScores);
            }

            _dbContext.SaveChanges();

            return test;
        }
    }
}