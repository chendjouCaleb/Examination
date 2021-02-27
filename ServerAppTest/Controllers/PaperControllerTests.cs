using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Infrastructure;
using Exam.Models;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace ServerAppTest.Controllers
{
    public class PaperControllerTests
    {
        private PaperController _controller;
        private IRepository<Test, long> _testRepository;
        private IRepository<TestGroup, long> _testGroupRepository;
        private IRepository<TestGroupCorrector, long> _testGroupCorrectorRepository;
        private IRepository<TestGroupSupervisor, long> _testGroupSupervisorRepository;
        private IRepository<TestGroupSecretary, long> _testGroupSecretaryRepository;

        private IRepository<Corrector, long> _correctorRepository;
        private IRepository<Supervisor, long> _supervisorRepository;
        private IRepository<Secretary, long> _secretaryRepository;

        private IRepository<Student, long> _studentRepository;
        private IRepository<Paper, long> _paperRepository;

        private IRepository<Room, long> _roomRepository;
        private IRepository<Course, long> _courseRepository;
        private IRepository<School, long> _schoolRepository;
        private IRepository<Examination, long> _examinationRepository;

        private IRepository<TestScore, long> _testScoreRepository;
        private IRepository<ScorePaper, long> _scorePaperRepository;

        private User _user = new User();
        private User _secretaryUser = new User();
        private User _correctorUser = new User();
        private User _supervisorUser = new User();

        private Corrector _corrector;
        private Supervisor _supervisor;
        private Secretary _secretary;

        private TestGroupCorrector _testGroupCorrector;
        private TestGroupSupervisor _testGroupSupervisor;
        private TestGroupSecretary _testGroupSecretary;

        private ExaminationStudent _examinationStudent;

        private Course _course;
        private Room _room;
        private TestGroup _testGroup;
        private Student _student;
        private Test _test;
        private Examination _examination;
        private School _school;


        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<PaperController>();


            _schoolRepository = serviceProvider.GetRequiredService<IRepository<School, long>>();
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();

            _roomRepository = serviceProvider.GetRequiredService<IRepository<Room, long>>();
            _testGroupRepository = serviceProvider.GetRequiredService<IRepository<TestGroup, long>>();

            _testGroupCorrectorRepository = serviceProvider.GetRequiredService<IRepository<TestGroupCorrector, long>>();
            _testGroupSecretaryRepository = serviceProvider.GetRequiredService<IRepository<TestGroupSecretary, long>>();
            _testGroupSupervisorRepository =
                serviceProvider.GetRequiredService<IRepository<TestGroupSupervisor, long>>();

            _correctorRepository = serviceProvider.GetRequiredService<IRepository<Corrector, long>>();
            _secretaryRepository = serviceProvider.GetRequiredService<IRepository<Secretary, long>>();
            _supervisorRepository = serviceProvider.GetRequiredService<IRepository<Supervisor, long>>();

            _testScoreRepository = serviceProvider.GetRequiredService<IRepository<TestScore, long>>();
            _scorePaperRepository = serviceProvider.GetRequiredService<IRepository<ScorePaper, long>>();

            _studentRepository = serviceProvider.GetRequiredService<IRepository<Student, long>>();
            _examinationRepository = serviceProvider.GetRequiredService<IRepository<Examination, long>>();
            _paperRepository = serviceProvider.GetRequiredService<IRepository<Paper, long>>();

            _courseRepository = serviceProvider.GetRequiredService<IRepository<Course, long>>();
            var levelRepository = serviceProvider.GetRequiredService<IRepository<Level, long>>();
            var departmentRepository = serviceProvider.GetRequiredService<IRepository<Department, long>>();
            var examinationLevelRepository = serviceProvider.GetRequiredService<IRepository<ExaminationLevel, long>>();
            var examinationStudentRepository =
                serviceProvider.GetRequiredService<IRepository<ExaminationStudent, long>>();
            var examinationDepartmentRepository =
                serviceProvider.GetRequiredService<IRepository<ExaminationDepartment, long>>();


            _school = _schoolRepository.Save(new School
            {
                Name = "Org name"
            });

            var department = departmentRepository.Save(new Department {Name = "dept", School = _school});
            var level = levelRepository.Save(new Level {Index = 0, Department = department});
            _course = _courseRepository.Save(new Course {Code = "125", Level = level});

            _room = _roomRepository.Save(new Room
            {
                School = _school,
                Name = "ABC"
            });

            _examination = _examinationRepository.Save(new Examination
            {
                School = _school,
                Name = "Exam name",
                StartDate = DateTime.Now.AddMonths(1),
                ExpectedEndDate = DateTime.Now.AddMonths(4)
            });

            var examinationDepartment = examinationDepartmentRepository.Save(new ExaminationDepartment
            {
                Department = department,
                Examination = _examination
            });

            var examinationLevel = examinationLevelRepository.Save(new ExaminationLevel
            {
                ExaminationDepartment = examinationDepartment,
                Level = level
            });


            _student = _studentRepository.Save(new Student
            {
                UserId = _user.Id,
                Level = level
            });

            _test = _testRepository.Save(
                new Test
                {
                    Course = _course,
                    Coefficient = 5,
                    Radical = 20,
                    ExaminationLevel = examinationLevel,
                    UseAnonymity = false,
                    ExpectedStartDate = _examination.ExpectedStartDate.AddHours(1),
                    ExpectedEndDate = _examination.ExpectedEndDate.AddHours(3)
                }
            );

            _testGroup = _testGroupRepository.Save(new TestGroup
            {
                Test = _test,
                Room = _room
            });

            _corrector = _correctorRepository.Save(new Corrector
                {UserId = _correctorUser.Id, Department = department});

            _supervisor = _supervisorRepository.Save(new Supervisor
                {UserId = _supervisorUser.Id, Department = department});

            _secretary = _secretaryRepository.Save(new Secretary
                {UserId = _secretaryUser.Id, Department = department});

            _testGroupCorrector = _testGroupCorrectorRepository.Save(new TestGroupCorrector
            {
                Corrector = _corrector, TestGroup = _testGroup
            });

            _testGroupSupervisor = _testGroupSupervisorRepository.Save(new TestGroupSupervisor
            {
                Supervisor = _supervisor, TestGroup = _testGroup
            });

            _testGroupSecretary = _testGroupSecretaryRepository.Save(new TestGroupSecretary
            {
                Secretary = _secretary, TestGroup = _testGroup
            });

            _examinationStudent = examinationStudentRepository.Save(new ExaminationStudent
            {
                Student = _student,
                ExaminationLevel = examinationLevel
            });
        }

        [Test]
        public void Add()
        {
            Paper paper = _controller.Add(_test, _examinationStudent);

            _paperRepository.Refresh(paper);

            Assert.NotNull(paper);

            Assert.AreEqual(_examinationStudent, paper.ExaminationStudent);
            Assert.AreEqual(_test, paper.Test);
        }

        [Test]
        public void Check_If_Add_DontAddSameStudent_TwoTime()
        {
            Paper paper1 = _controller.Add(_test, _examinationStudent);
            Paper paper2 = _controller.Add(_test, _examinationStudent);

            Assert.AreEqual(paper1, paper2);
        }

        [Test]
        public void changePresenceState_WhenStudentIsAbsent_ShouldSetIt_AsPresent()
        {
            Paper paper = _controller.Add(_test, _examinationStudent);

            _controller.ChangePresenceState(paper, _testGroupSupervisor);
            _paperRepository.Refresh(paper);

            Assert.NotNull(paper.StartDate);
            Assert.True(DateTimeAssert.EqualsAtMinute(DateTime.Now, paper.StartDate.Value));
            Assert.AreEqual(paper.TestGroupSupervisor, _testGroupSupervisor);
            Assert.AreEqual(paper.SupervisorUserId, _testGroupSupervisor.Supervisor.UserId);
        }

        [Test]
        public void changePresenceState_WhenStudentIsPresent_ShouldSetIt_AsAbsent()
        {
            Paper paper = _controller.Add(_test, _examinationStudent);

            _controller.ChangePresenceState(paper, _testGroupSupervisor);
            _paperRepository.Refresh(paper);
            _controller.ChangePresenceState(paper, _testGroupSupervisor);
            _paperRepository.Refresh(paper);

            Assert.Null(paper.StartDate);
        }

        [Test]
        public void ChangePaperDates()
        {
            PeriodForm form = new PeriodForm
            {
                StartDate = DateTime.Now.AddMilliseconds(1),
                EndDate = DateTime.Now.AddHours(1)
            };

            Paper paper = _controller.Add(_test, _examinationStudent);

            _controller.ChangeDate(paper, form);
            _paperRepository.Refresh(paper);

            Assert.NotNull(paper);
            Assert.AreEqual(paper.StartDate, form.StartDate);
            Assert.AreEqual(paper.EndDate, form.EndDate);
        }

        [Test]
        public void CollectPaper_WithEndDate()
        {
            Paper paper = _controller.Add(_test, _examinationStudent);
            DateTime endDate = DateTime.Now.AddHours(2);

            _controller.Collect(paper, _supervisorUser, endDate);
            _paperRepository.Refresh(paper);

            Assert.NotNull(paper);
            Assert.AreEqual(endDate, paper.EndDate);
            Assert.AreEqual(_supervisorUser.Id, paper.CollectorUserId);
        }

        [Test]
        public void CollectPaper_WithoutEndDate()
        {
            Paper paper = _controller.Add(_test, _examinationStudent);
            _controller.Collect(paper, _supervisorUser);
            _paperRepository.Refresh(paper);

            Assert.NotNull(paper);
            Assert.NotNull(paper.EndDate);
            Assert.True(DateTimeAssert.EqualsAtMinute(DateTime.Now, paper.EndDate.Value));
        }


        [Test]
        public void SetSupervisorComment()
        {
            Paper paper = _controller.Add(_test, _examinationStudent);
            string comment = "supervisor comment";

            _controller.SupervisorComment(paper, comment);
            _paperRepository.Refresh(paper);

            Assert.NotNull(paper);
            Assert.AreEqual(comment, paper.SupervisorComment);
        }


        [Test]
        public void SetCorrectorComment()
        {
            Paper paper = _controller.Add(_test, _examinationStudent);
            string comment = "corrector comment";

            _controller.CorrectorComment(paper, comment);
            _paperRepository.Refresh(paper);

            Assert.NotNull(paper);
            Assert.AreEqual(comment, paper.CorrectorComment);
        }

        [Test]
        public void ReportPaper()
        {
            Paper paper = _controller.Add(_test, _examinationStudent);

            PaperReportForm form = new PaperReportForm
            {
                Anonymity = "15T963",
                Comment = "secretary comment"
            };

            _controller.Report(paper, _testGroupSecretary, form);
            _paperRepository.Refresh(paper);

            Assert.NotNull(paper);

            Assert.AreEqual(form.Comment, paper.SecretaryComment);
            Assert.AreEqual(form.Anonymity, form.Anonymity);
        }

        [Test]
        public void SetScore()
        {
            Paper paper = _controller.Add(_test, _examinationStudent);
            double score = 12;

            _controller.Score(paper, _testGroupCorrector, score);
            _paperRepository.Refresh(paper);

            Assert.NotNull(paper);
            Assert.AreEqual(_testGroupCorrector, paper.TestGroupCorrector);
            Assert.AreEqual(_testGroupCorrector.Corrector.UserId, paper.CorrectorUserId);
            Assert.AreEqual(score, paper.Score);
            Assert.AreEqual(score, paper.FinalScore);
        }

        [Test]
        public void TrySetScore_WhenCourseHaveMultipleScore_ShouldThrowError()
        {
            Paper paper = _controller.Add(_test, _examinationStudent);

            _test.MultipleScore = true;
            _testRepository.Update(_test);
            _testRepository.Refresh(_test);

            Exception ex = Assert.Throws<InvalidOperationException>(
                () => _controller.Score(paper, _testGroupCorrector, 12)
            );

            Assert.AreEqual("{paper.constraints.multipleScore}", ex.Message);
        }
        
        
        [Test]
        public void AddPaperScore()
        {
            Paper paper = _controller.Add(_test, _examinationStudent);
            TestScore score = _testScoreRepository.Save(new TestScore {Test = _test, Name = "Exercise1", Radical = 5});

            ScorePaper scorePaper = _controller.AddOrUpdatePaperScore(paper, score, 5);
            _scorePaperRepository.Refresh(scorePaper);

            Assert.NotNull(scorePaper);
            Assert.AreEqual(paper, scorePaper.Paper);
            Assert.AreEqual(score, scorePaper.TestScore);
            Assert.AreEqual(5, scorePaper.Value);
        }
        
        
        [Test]
        public void AddExistingScorePaper_ShouldUpdateIt()
        {
            Paper paper = _controller.Add(_test, _examinationStudent);
            TestScore score = _testScoreRepository.Save(new TestScore {Test=_test, Name = "Exercise1", Radical = 5});

            ScorePaper scorePaper1 = _controller.AddOrUpdatePaperScore(paper, score, 5);
            ScorePaper scorePaper2 = _controller.AddOrUpdatePaperScore(paper, score, 1);

            
            _scorePaperRepository.Refresh(scorePaper1);
            _scorePaperRepository.Refresh(scorePaper2);

            Assert.True(_scorePaperRepository.Exists(scorePaper1));
            Assert.NotNull(scorePaper1);
            Assert.NotNull(scorePaper2);
            Assert.AreEqual(scorePaper1.Id, scorePaper2.Id);
            Assert.AreEqual(1, scorePaper2.Value);
        }
        
        [Test]
        public void Try_AddOrUpdateScorePaper_WhichValueUpperThanRadical_ShouldThrow()
        {
            Paper paper = _controller.Add(_test, _examinationStudent);
            TestScore score = _testScoreRepository.Save(new TestScore {Test=_test, Name = "Exercise1", Radical = 5});

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.AddOrUpdatePaperScore(paper, score, 6)
            );

            Assert.AreEqual("{paperScore.constraints.valueLowerOrEqualThanRadical}", ex.Message);
        }
        
        
        
        [Test]
        public void SetMultipleScore()
        {
            Paper paper = _controller.Add(_test, _examinationStudent);
            
            TestScore score1 = _testScoreRepository.Save(new TestScore {Test=_test, Name = "Exercise1", Radical = 5});
            TestScore score2 = _testScoreRepository.Save(new TestScore {Test=_test, Name = "Exercise2", Radical = 5});
            TestScore score3 = _testScoreRepository.Save(new TestScore {Test=_test, Name = "Exercise3", Radical = 10});
            
            List<ScorePaperForm> form = new List<ScorePaperForm>(new []
            {
                new ScorePaperForm { TestScoreId = score1.Id, Value = 1}, 
                new ScorePaperForm { TestScoreId = score2.Id, Value = 2}, 
                new ScorePaperForm { TestScoreId = score3.Id, Value = 3} 
            });
            _test.MultipleScore = true;
            _testRepository.Update(_test); 
            _paperRepository.Refresh(paper);

            List<ScorePaper> scorePapers =
                _controller.Scores(paper, _testGroupCorrector, form).Value as List<ScorePaper>;
            
            _paperRepository.Refresh(paper);
            Assert.IsNotNull(paper);
            Assert.IsNotNull(scorePapers);
            Assert.AreEqual(3, scorePapers.Count);
            
            Assert.AreEqual(_testGroupCorrector, paper.TestGroupCorrector);
            Assert.AreEqual(_testGroupCorrector.Corrector.UserId, paper.CorrectorUserId);

            foreach (var item in scorePapers)
            {
                _scorePaperRepository.Refresh(item);
                Assert.IsNotNull(item);
                Assert.AreEqual( paper, item.Paper);
                Assert.AreEqual( paper.Test, item.TestScore.Test);
            }

        }
        
        
        [Test]
        public void TrySetScorePapers_WhenTestHaveSingleScore_ShouldThrowError()
        {
            Paper paper = _controller.Add(_test, _examinationStudent);
            
            Exception ex = Assert.Throws<InvalidOperationException>(
                () => _controller.Scores(paper, _testGroupCorrector, new List<ScorePaperForm>())
            );

            Assert.AreEqual("{paper.constraints.singleScore}", ex.Message);
        }
    }
}