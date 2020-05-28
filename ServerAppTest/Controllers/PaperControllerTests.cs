using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
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
        private IRepository<Group, long> _groupRepository;
        private IRepository<Room, long> _roomRepository;
        private IRepository<Organisation, long> _organisationRepository;
        private IRepository<Examination, long> _examinationRepository;

        private IRepository<Score, long> _scoreRepository;
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

        private Room _room;
        private Group _group;
        private TestGroup _testGroup;
        private Student _student;
        private Test _test;
        private Examination _examination;
        private Organisation _organisation;


        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<PaperController>();


            _organisationRepository = serviceProvider.GetRequiredService<IRepository<Organisation, long>>();
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();
            _groupRepository = serviceProvider.GetRequiredService<IRepository<Group, long>>();
            _roomRepository = serviceProvider.GetRequiredService<IRepository<Room, long>>();
            _testGroupRepository = serviceProvider.GetRequiredService<IRepository<TestGroup, long>>();

            _testGroupCorrectorRepository = serviceProvider.GetRequiredService<IRepository<TestGroupCorrector, long>>();
            _testGroupSecretaryRepository = serviceProvider.GetRequiredService<IRepository<TestGroupSecretary, long>>();
            _testGroupSupervisorRepository =
                serviceProvider.GetRequiredService<IRepository<TestGroupSupervisor, long>>();

            _correctorRepository = serviceProvider.GetRequiredService<IRepository<Corrector, long>>();
            _secretaryRepository = serviceProvider.GetRequiredService<IRepository<Secretary, long>>();
            _supervisorRepository = serviceProvider.GetRequiredService<IRepository<Supervisor, long>>();

            _scoreRepository = serviceProvider.GetRequiredService<IRepository<Score, long>>();
            _scorePaperRepository = serviceProvider.GetRequiredService<IRepository<ScorePaper, long>>();

            _studentRepository = serviceProvider.GetRequiredService<IRepository<Student, long>>();
            _examinationRepository = serviceProvider.GetRequiredService<IRepository<Examination, long>>();
            _paperRepository = serviceProvider.GetRequiredService<IRepository<Paper, long>>();

            _organisation = _organisationRepository.Save(new Organisation
            {
                Name = "Org name"
            });

            _room = _roomRepository.Save(new Room
            {
                Organisation = _organisation,
                Name = "ABC"
            });

            _examination = _examinationRepository.Save(new Examination
            {
                Organisation = _organisation,
                Name = "Exam name",
                StartDate = DateTime.Now.AddMonths(1),
                ExpectedEndDate = DateTime.Now.AddMonths(4)
            });

            _group = _groupRepository.Save(new Group
            {
                Examination = _examination,
                Name = "A1",
                Index = 1,
                Room = _room
            });

            _student = _studentRepository.Save(new Student
            {
                UserId = _user.Id,
                Examination = _examination,
                Group = _group
            });

            _test = _testRepository.Save(
                new Test
                {
                    Examination = _examination,
                    Name = "test name",
                    Code = "ABC 32",
                    Coefficient = 5,
                    Radical = 20,
                    UseAnonymity = false,
                    ExpectedStartDate = _examination.ExpectedStartDate.AddHours(1),
                    ExpectedEndDate = _examination.ExpectedEndDate.AddHours(3)
                }
            );

            _testGroup = _testGroupRepository.Save(new TestGroup
            {
                Test = _test,
                Group = _group,
                Room = _room
            });

            _corrector = _correctorRepository.Save(new Corrector
                {UserId = _correctorUser.Id, Examination = _examination});

            _supervisor = _supervisorRepository.Save(new Supervisor
                {UserId = _supervisorUser.Id, Examination = _examination});

            _secretary = _secretaryRepository.Save(new Secretary
                {UserId = _secretaryUser.Id, Examination = _examination});

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
        }

        [Test]
        public void Add()
        {
            Paper paper = _controller.Add(_testGroup, _student, _testGroupSupervisor).Value as Paper;

            _paperRepository.Refresh(paper);

            Assert.NotNull(paper);
            Assert.AreEqual(_testGroup, paper.TestGroup);
            Assert.AreEqual(_student, paper.Student);
            Assert.AreEqual(_testGroupSupervisor, paper.TestGroupSupervisor);

            Assert.NotNull(paper.StartDate);

            Assert.AreEqual(_testGroupSupervisor.Supervisor.UserId, paper.SupervisorUserId);
            Assert.True(DateTimeAssert.EqualsAtMinute(DateTime.Now, paper.StartDate.Value));
        }

        [Test]
        public void TryAdd_SameStudentTwoTime_ShouldThrowError()
        {
            _controller.Add(_testGroup, _student, _testGroupSupervisor);

            Exception ex = Assert.Throws<InvalidOperationException>(
                () => _controller.Add(_testGroup, _student, _testGroupSupervisor)
            );

            Assert.AreEqual("{paper.constraints.uniqueStudent}", ex.Message);
        }

        [Test]
        public void ChangePaperDates()
        {
            PeriodForm form = new PeriodForm
            {
                StartDate = DateTime.Now.AddMilliseconds(1),
                EndDate = DateTime.Now.AddHours(1)
            };

            Paper paper = _controller.Add(_testGroup, _student, _testGroupSupervisor).Value as Paper;

            _controller.ChangeDate(paper, form);
            _paperRepository.Refresh(paper);

            Assert.NotNull(paper);
            Assert.AreEqual(paper.StartDate, form.StartDate);
            Assert.AreEqual(paper.EndDate, form.EndDate);
        }

        [Test]
        public void CollectPaper_WithEndDate()
        {
            Paper paper = _controller.Add(_testGroup, _student, _testGroupSupervisor).Value as Paper;
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
            Paper paper = _controller.Add(_testGroup, _student, _testGroupSupervisor).Value as Paper;
            _controller.Collect(paper, _supervisorUser);
            _paperRepository.Refresh(paper);

            Assert.NotNull(paper);
            Assert.NotNull(paper.EndDate);
            Assert.True(DateTimeAssert.EqualsAtMinute(DateTime.Now, paper.EndDate.Value));
        }


        [Test]
        public void SetSupervisorComment()
        {
            Paper paper = _controller.Add(_testGroup, _student, _testGroupSupervisor).Value as Paper;
            string comment = "supervisor comment";

            _controller.SupervisorComment(paper, comment);
            _paperRepository.Refresh(paper);

            Assert.NotNull(paper);
            Assert.AreEqual(comment, paper.SupervisorComment);
        }


        [Test]
        public void SetCorrectorComment()
        {
            Paper paper = _controller.Add(_testGroup, _student, _testGroupSupervisor).Value as Paper;
            string comment = "corrector comment";

            _controller.CorrectorComment(paper, comment);
            _paperRepository.Refresh(paper);

            Assert.NotNull(paper);
            Assert.AreEqual(comment, paper.CorrectorComment);
        }

        [Test]
        public void ReportPaper()
        {
            Paper paper = _controller.Add(_testGroup, _student, _testGroupSupervisor).Value as Paper;

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
            Paper paper = _controller.Add(_testGroup, _student, _testGroupSupervisor).Value as Paper;
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
        public void TrySetScore_WhenTestHaveMultipleScore_ShouldThrowError()
        {
            Paper paper = _controller.Add(_testGroup, _student, _testGroupSupervisor).Value as Paper;

            _scoreRepository.Save(new Score {Test = _test, Radical = 1});
            _testRepository.Refresh(_test);

            Exception ex = Assert.Throws<InvalidOperationException>(
                () => _controller.Score(paper, _testGroupCorrector, 12)
            );

            Assert.AreEqual("{paper.constraints.multipleScore}", ex.Message);
        }

        [Test]
        public void AddPaperScore()
        {
            Paper paper = _controller.Add(_testGroup, _student, _testGroupSupervisor).Value as Paper;
            Score score = _scoreRepository.Save(new Score {Test = _test, Name = "Exercise1", Radical = 5});

            ScorePaper scorePaper = _controller.AddOrUpdatePaperScore(paper, score, 5);
            _scorePaperRepository.Refresh(scorePaper);

            Assert.NotNull(scorePaper);
            Assert.AreEqual(paper, scorePaper.Paper);
            Assert.AreEqual(score, scorePaper.Score);
            Assert.AreEqual(5, scorePaper.Value);
        }

        [Test]
        public void AddExistingScorePaper_ShouldUpdateIt()
        {
            Paper paper = _controller.Add(_testGroup, _student, _testGroupSupervisor).Value as Paper;
            Score score = _scoreRepository.Save(new Score {Test = _test, Name = "Exercise1", Radical = 5});

            ScorePaper scorePaper1 = _controller.AddOrUpdatePaperScore(paper, score, 5);
            ScorePaper scorePaper2 = _controller.AddOrUpdatePaperScore(paper, score, 1);
            _scorePaperRepository.Refresh(scorePaper1);
            _scorePaperRepository.Refresh(scorePaper2);

            Assert.NotNull(scorePaper1);
            Assert.NotNull(scorePaper2);
            Assert.AreEqual(scorePaper1, scorePaper2);
            Assert.AreEqual(1, scorePaper2.Value);
        }

        [Test]
        public void Try_AddOrUpdateScorePaper_WhichValueUpperThanRadical_ShouldThrow()
        {
            Paper paper = _controller.Add(_testGroup, _student, _testGroupSupervisor).Value as Paper;
            Score score = _scoreRepository.Save(new Score {Test = _test, Name = "Exercise1", Radical = 5});

            Exception ex = Assert.Throws<InvalidValueException>(
                () => _controller.AddOrUpdatePaperScore(paper, score, 6)
            );

            Assert.AreEqual("{paperScore.constraints.valueLowerOrEqualThanRadical}", ex.Message);
        }


        [Test]
        public void SetMultipleScore()
        {
            Paper paper = _controller.Add(_testGroup, _student, _testGroupSupervisor).Value as Paper;

            Score score1 = _scoreRepository.Save(new Score {Test = _test, Name = "Exercise1", Radical = 5});
            Score score2 = _scoreRepository.Save(new Score {Test = _test, Name = "Exercise2", Radical = 5});
            Score score3 = _scoreRepository.Save(new Score {Test = _test, Name = "Exercise3", Radical = 10});
            
            List<ScorePaperForm> form = new List<ScorePaperForm>(new []
            {
                new ScorePaperForm { ScoreId = score1.Id, Value = 1}, 
                new ScorePaperForm { ScoreId = score2.Id, Value = 2}, 
                new ScorePaperForm { ScoreId = score3.Id, Value = 3} 
            });
            
            _testRepository.Refresh(_test);

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
                Assert.AreEqual(paper, item.Paper);
                Assert.AreEqual(paper.TestGroup.Test, item.Score.Test);
            }

        }
        
        
        [Test]
        public void TrySetScorePapers_WhenTestHaveSingleScore_ShouldThrowError()
        {
            Paper paper = _controller.Add(_testGroup, _student, _testGroupSupervisor).Value as Paper;

            
            Exception ex = Assert.Throws<InvalidOperationException>(
                () => _controller.Scores(paper, _testGroupCorrector, new List<ScorePaperForm>())
            );

            Assert.AreEqual("{paper.constraints.singleScore}", ex.Message);
        }
    }
}