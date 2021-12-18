using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using Exam.Entities;
using Exam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace Exam.Controllers
{
    [Route("api/users")]
    public class UserController
    {
        private DbContext _dbContext;

        public UserController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("{userId}/model")]
        public UserModel GetModel(string userId)
        {
            UserModel model = new UserModel();

            model.Papers = Papers(userId);

            model.Students = Students(userId);
            model.Applications = Applications(userId);


            model.TestGroups = Groups(userId);

            model.Correctors = Correctors(userId);
            model.Supervisors = Supervisors(userId);
            model.Secretaries = Secretaries(userId);

            model.TestGroupCorrectors = TestGroupCorrectors(userId);
            model.TestGroupSecretaries = TestGroupSecretaries(userId);
            model.TestGroupSupervisors = TestGroupSupervisors(userId);

            //List<Examination> examinations = new List<Examination>();

//            examinations.AddRange(model.Correctors.ConvertAll(c => c.));
//            examinations.AddRange(model.Supervisors.ConvertAll(s => s.Examination));
//            examinations.AddRange(model.Secretaries.ConvertAll(s => s.Examination));
//            examinations.AddRange(model.Students.ConvertAll(s => s.Examination));

            // model.Examinations = examinations.Distinct().Where(e => e != null).ToList();

            model.Schools = model.Examinations.ConvertAll(e => e.Semester.Year.School)
                .Distinct().ToList();


            SetTests(model);
            return model;
        }

        public void SetTests(UserModel model)
        {
            model.Tests = model.Students.ConvertAll(GetStudentTests).SelectMany(t => t).ToList();

            model.Tests.AddRange(
                model.TestGroupCorrectors.ConvertAll(c => c.TestGroup.Test).ToList()
            );

            model.Tests.AddRange(
                model.TestGroupSupervisors.ConvertAll(c => c.TestGroup.Test).ToList()
            );

            model.Tests.AddRange(
                model.TestGroupSecretaries.ConvertAll(c => c.TestGroup.Test).ToList()
            );
            model.Tests = model.Tests.Distinct().OrderByDescending(t => t.ExpectedStartDate).ToList();
        }

        [HttpGet("{userId}/tests")]
        public List<Test> StudentTests(string userId)
        {
            List<Student> students = Students(userId);
            return students.ConvertAll(GetStudentTests).SelectMany(t => t).Distinct().ToList();
        }

        public List<Test> GetStudentTests(Student student)
        {
            List<Test> tests = new List<Test>();

            tests.AddRange(
                _dbContext.Set<Test>().Where(t =>
                    t.ExaminationLevel.SemesterLevel.YearLevel.LevelId == student.LevelId).ToList()
            );
            return tests;
        }


        [HttpGet("{userId}/papers")]
        public List<Paper> Papers(string userId)
        {
            return _dbContext.Set<Paper>()
                .Where(t => userId == t.ExaminationStudent.SemesterStudent.YearStudent.Student.UserId).ToList();
        }

        [HttpGet("{userId}/groups")]
        public List<TestGroup> Groups(string userId)
        {
            return Papers(userId).ConvertAll(s => s.TestGroup).Distinct().Where(s => s != null).ToList();
        }


        [HttpGet("{userId}/students")]
        public List<Student> Students(string userId)
        {
            return _dbContext.Set<Student>().Where(t => userId == t.UserId).ToList();
        }

        [HttpGet("{userId}/applications")]
        public List<Application> Applications(string userId)
        {
            return _dbContext.Set<Application>().Where(t => userId == t.UserId).ToList();
        }

        [HttpGet("{userId}/secretaries")]
        public List<Secretary> Secretaries(string userId)
        {
            return _dbContext.Set<Secretary>().Where(t => userId == t.UserId).ToList();
        }

        [HttpGet("{userId}/correctors")]
        public List<Corrector> Correctors(string userId)
        {
            return _dbContext.Set<Corrector>().Where(t => userId == t.UserId).ToList();
        }

        [HttpGet("{userId}/supervisors")]
        public List<Supervisor> Supervisors(string userId)
        {
            return _dbContext.Set<Supervisor>().Where(t => userId == t.UserId).ToList();
        }


        [HttpGet("{userId}/testGroupSecretaries")]
        public List<TestGroupSecretary> TestGroupSecretaries(string userId)
        {
            return _dbContext.Set<TestGroupSecretary>().Where(t => userId == t.Secretary.UserId).ToList();
        }

        [HttpGet("{userId}/testGroupCorrectors")]
        public List<TestGroupCorrector> TestGroupCorrectors(string userId)
        {
            return _dbContext.Set<TestGroupCorrector>().Where(t => userId == t.Corrector.UserId).ToList();
        }

        [HttpGet("{userId}/testGroupSupervisors")]
        public List<TestGroupSupervisor> TestGroupSupervisors(string userId)
        {
            return _dbContext.Set<TestGroupSupervisor>().Where(t => userId == t.Supervisor.UserId).ToList();
        }
    }
}