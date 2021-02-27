using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace ServerAppTest.Controllers
{
    public class StudentGroupingControllerTests
    {
        private GroupPaperController _controller;

        private IRepository<School, long> _schoolRepository;
        private IRepository<Room, long> _roomRepository;
        private IRepository<Examination, long> _examinationRepository;
        private IRepository<ExaminationSpeciality, long> _specialityRepository;
        private IRepository<Student, long> _studentRepository;
        private IRepository<Test, long> _testRepository;
        private IRepository<TestGroup, long> _testGroupRepository;
        private IRepository<Paper, long> _paperRepository;

        private ExaminationSpeciality _speciality1;
        private ExaminationSpeciality _speciality2;
        private Examination _examination;
        private School _school;

        private Test _test;

        private TestGroup _testGroup0;
        private TestGroup _testGroup1;
        private TestGroup _testGroup2;


        private ExaminationLevel _examinationLevel;
        private List<Paper> _papers = new List<Paper>();
        

        [TearDown]
        public void AfterAll()
        {
            _studentRepository.DeleteAll();
        }

        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();


            _controller = serviceProvider.GetRequiredService<GroupPaperController>();

            _schoolRepository = serviceProvider.GetRequiredService<IRepository<School, long>>();
            _paperRepository = serviceProvider.GetRequiredService<IRepository<Paper, long>>();
            _examinationRepository = serviceProvider.GetRequiredService<IRepository<Examination, long>>();
            _testRepository = serviceProvider.GetRequiredService<IRepository<Test, long>>();
            _testGroupRepository = serviceProvider.GetRequiredService<IRepository<TestGroup, long>>();
            var examinationStudentRepository =
                serviceProvider.GetRequiredService<IRepository<ExaminationStudent, long>>();

            _roomRepository = serviceProvider.GetRequiredService<IRepository<Room, long>>();
            _studentRepository = serviceProvider.GetRequiredService<IRepository<Student, long>>();
            var examinationLevelRepository = serviceProvider.GetRequiredService<IRepository<ExaminationLevel, long>>();

            _paperRepository.DeleteAll();
            _papers.Clear();
            _school = _schoolRepository.Save(new School
            {
                Name = "Org name"
            });

            _examination = _examinationRepository.Save(new Examination
            {
                School = _school,
                Name = "Exam name",
                ExpectedStartDate = DateTime.Now.AddMonths(1),
                ExpectedEndDate = DateTime.Now.AddMonths(4)
            });

            _examinationLevel = examinationLevelRepository.Save(new ExaminationLevel
             ());

            
            _test = _testRepository.Save(new Test
            {
                ExaminationLevel = _examinationLevel
            });

            _testGroup0 = _testGroupRepository.Save(new TestGroup
            {
                Test = _test,
                Index = 0,
                Room = _roomRepository.Save(new Room {School = _school, Capacity = 4})
            });

            _testGroup1 = _testGroupRepository.Save(new TestGroup
            {
                Test = _test,
                Index = 1,
                Room = _roomRepository.Save(new Room {School = _school, Capacity = 5})
            });

            _testGroup2 = _testGroupRepository.Save(new TestGroup
            {
                Test = _test,
                Index = 2,
                Room = _roomRepository.Save(new Room {School = _school, Capacity = 5})
            });


            for (int i = 0; i < 10; i++)
            {
                Student student = _studentRepository.Save(new Student {FullName = i + "Name"});
                ExaminationStudent examinationStudent = examinationStudentRepository.Save(new ExaminationStudent
                {
                    Student = student
                });
                var paper = _paperRepository.Save(new Paper
                {
                    ExaminationStudent = examinationStudent,
                    Test = _test
                });
                
                _paperRepository.Refresh(paper);
                _papers.Add(paper);
            }

            
        }


        [Test]
        public void CanGroupStudent()
        {
            int result = _controller.CanGroupPapers(_test);
            Assert.AreEqual(4, result);
        }


        [Test]
        public void GroupStudent()
        {
            _controller.Group(_test);

            List<Paper> papers = _papers.OrderBy(u => u.ExaminationStudent.Student.FullName).ToList();
            papers.ForEach(s => _paperRepository.Refresh(s));
            

            for (int i = 0; i < 4; i++)
            {
                Assert.AreEqual(_testGroup0.Id, papers[i].TestGroup.Id);
                Assert.AreEqual(i, papers[i].GroupIndex);
            }

            for (int i = 4, j = 0; i < 9; i++, j++)
            {
                Assert.AreEqual(_testGroup1, papers[i].TestGroup);
                Assert.AreEqual(j, papers[i].GroupIndex);
            }

            for (int i = 9, j = 0; i < papers.Count; i++, j++)
            {
                Assert.AreEqual(_testGroup2, papers[i].TestGroup);
                Assert.AreEqual(j, papers[i].GroupIndex);
            }
        }

        [Test]
        public void UngroupTest()
        {
            _controller.Group(_test);
            _controller.UnGroup(_test);
            IList<Paper> papers = _paperRepository.List(p => p.Test.Equals(_test));
            foreach (var paper in papers)
            {
                Assert.Null(paper.TestGroup);
                Assert.Null(paper.TestGroupId);
            }
        }
    }
}