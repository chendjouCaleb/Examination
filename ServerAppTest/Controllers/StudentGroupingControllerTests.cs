using System;
using System.Collections.Generic;
using System.Linq;
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
    public class StudentGroupingControllerTests
    {
        private GroupStudentController _controller;
        private IRepository<Group, long> _groupRepository;
        private IRepository<Organisation, long> _organisationRepository;
        private IRepository<Room, long> _roomRepository;
        private IRepository<Examination, long> _examinationRepository;
        private IRepository<Speciality, long> _specialityRepository;
        private IRepository<Student, long> _studentRepository;

        private Speciality _speciality1;
        private Speciality _speciality2;
        private Examination _examination;
        private Room _room;
        private Organisation _organisation;

        private Group _group1;
        private Group _group2;
        private Group _group3;

        private Group _speciality1Group1;
        private Group _speciality1Group2;
        private Group _speciality1Group3;

        private Group _speciality2Group1;
        private Group _speciality2Group2;
        private Group _speciality2Group3;

        private List<Student> _speciality1Students = new List<Student>();
        private List<Student> _speciality2Students = new List<Student>();
        private List<Student> _noSpecialityStudents = new List<Student>();

        private User _user = new User
        {
            Id = Guid.NewGuid().ToString()
        };

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


            _controller = serviceProvider.GetRequiredService<GroupStudentController>();

            _organisationRepository = serviceProvider.GetRequiredService<IRepository<Organisation, long>>();
            _groupRepository = serviceProvider.GetRequiredService<IRepository<Group, long>>();
            _examinationRepository = serviceProvider.GetRequiredService<IRepository<Examination, long>>();
            _specialityRepository = serviceProvider.GetRequiredService<IRepository<Speciality, long>>();
            _roomRepository = serviceProvider.GetRequiredService<IRepository<Room, long>>();
            _studentRepository = serviceProvider.GetRequiredService<IRepository<Student, long>>();

            _studentRepository.DeleteAll();
            _organisation = _organisationRepository.Save(new Organisation
            {
                Name = "Org name"
            });

            _examination = _examinationRepository.Save(new Examination
            {
                Organisation = _organisation,
                Name = "Exam name",
                ExpectedStartDate = DateTime.Now.AddMonths(1),
                ExpectedEndDate = DateTime.Now.AddMonths(4)
            });

            _speciality1 = _specialityRepository.Save(new Speciality
            {
                Name = "speciality1 name",
                Examination = _examination
            });

            _speciality2 = _specialityRepository.Save(new Speciality
            {
                Name = "speciality1 name",
                Examination = _examination
            });

            _room = _roomRepository.Save(new Room
            {
                Organisation = _organisation,
                Name = "name",
                Capacity = 10
            });
            _group1 = _groupRepository.Save(new Group
            {
                Examination = _examination,
                Room = _roomRepository.Save(new Room {Organisation = _organisation, Capacity = 4})
            });

            _group2 = _groupRepository.Save(new Group
            {
                Examination = _examination,
                Room = _roomRepository.Save(new Room {Organisation = _organisation, Capacity = 5})
            });

            _group3 = _groupRepository.Save(new Group
            {
                Examination = _examination,
                Room = _roomRepository.Save(new Room {Organisation = _organisation, Capacity = 5})
            });

            _speciality1Group1 = _groupRepository.Save(new Group
            {
                Examination = _examination,
                Speciality = _speciality1,
                Room = _roomRepository.Save(new Room {Organisation = _organisation, Capacity = 5})
            });

            _speciality1Group2 = _groupRepository.Save(new Group
            {
                Examination = _examination,
                Speciality = _speciality1,
                Room = _roomRepository.Save(new Room {Organisation = _organisation, Capacity = 6})
            });

            _speciality1Group3 = _groupRepository.Save(new Group
            {
                Examination = _examination,
                Speciality = _speciality1,
                Room = _roomRepository.Save(new Room {Organisation = _organisation, Capacity = 6})
            });


            _speciality2Group1 = _groupRepository.Save(new Group
            {
                Examination = _examination,
                Speciality = _speciality2,
                Room = _roomRepository.Save(new Room {Organisation = _organisation, Capacity = 3})
            });

            _speciality2Group2 = _groupRepository.Save(new Group
            {
                Examination = _examination,
                Speciality = _speciality2,
                Room = _roomRepository.Save(new Room {Organisation = _organisation, Capacity = 3})
            });

            _speciality2Group3 = _groupRepository.Save(new Group
            {
                Examination = _examination,
                Speciality = _speciality2,
                Room = _roomRepository.Save(new Room {Organisation = _organisation, Capacity = 5})
            });

            
            _speciality1Students.Clear();
            _speciality2Students.Clear();
            _noSpecialityStudents.Clear();
            for (int i = 0; i < 10; i++)
            {
                _noSpecialityStudents.Add(_studentRepository.Save(new Student
                {
                    FullName = i + "Name",
                    Examination = _examination
                }));
            }

            
            for (int i = 0; i < 10; i++)
            {
                _speciality1Students.Add(_studentRepository.Save(new Student
                {
                    FullName = i + "Name",
                    Examination = _examination,
                    Speciality = _speciality1
                }));
            }

            
            for (int i = 0; i < 10; i++)
            {
                _speciality2Students.Add(_studentRepository.Save(new Student
                {
                    FullName = i + "Name",
                    Examination = _examination,
                    Speciality = _speciality2
                }));
            }
            
            
        }

        [Test]
        public void CanGroupStudentSpeciality()
        {
            int result = _controller.CanGroupStudentOfSpeciality(_speciality1);
            Assert.AreEqual(7, result);

            result = _controller.CanGroupStudentOfSpeciality(_speciality2);
            Assert.AreEqual(1, result);
        }

        [Test]
        public void CanGroupStudentWithoutSpeciality()
        {
            int result = _controller.CanGroupStudentWithoutSpeciality(_examination);
            Assert.AreEqual(4, result);
        }

        [Test]
        public void CanGroupStudent()
        {
            int result = _controller.CanGroupStudents(_examination);
            Assert.AreEqual(12, result);
        }
        

        [Test]
        public void GroupStudentWithoutSpeciality()
        {
            _controller.GroupStudentWithoutSpeciality(_examination);

            
            List <Student> students = _noSpecialityStudents.OrderBy(u => u.FullName).ToList();
            students.ForEach(s => _studentRepository.Refresh(s));
            
            for (int i = 0; i < 4; i++)
            {
                Assert.AreEqual(_group1, students[i].Group);
                Assert.AreEqual(i, students[i].GroupIndex);
            }

            for (int i = 4, j = 0; i < 9; i++, j++)
            {
                Assert.AreEqual(_group2, students[i].Group);
                Assert.AreEqual(j, students[i].GroupIndex);
            }
            
            for (int i = 9, j = 0; i < students.Count; i++, j++)
            {
                Assert.AreEqual(_group3, students[i].Group);
                Assert.AreEqual(j, students[i].GroupIndex);
            }
            
        }
        
        
        [Test]
        public void GroupStudentWithSpeciality()
        {
            _controller.Group(_speciality1);

            
            List <Student> students = _speciality1Students.OrderBy(u => u.FullName).ToList();
            students.ForEach(s => _studentRepository.Refresh(s));
            
            for (int i = 0; i < 5; i++)
            {
                Assert.AreEqual(_speciality1Group1, students[i].Group);
                Assert.AreEqual(i, students[i].GroupIndex);
            }

            for (int i = 5, j = 0; i < students.Count; i++, j++)
            {
                Assert.AreEqual(_speciality1Group2, students[i].Group);
                Assert.AreEqual(j, students[i].GroupIndex);
            }
            
        }
        
        [Test]
        public void GroupStudentWithSpeciality2()
        {
            _controller.Group(_speciality2);

            
            List <Student> students = _speciality2Students.OrderBy(u => u.FullName).ToList();
            students.ForEach(s => _studentRepository.Refresh(s));
            
            for (int i = 0; i < 3; i++)
            {
                Assert.AreEqual(_speciality2Group1, students[i].Group);
                Assert.AreEqual(i, students[i].GroupIndex);
            }

            for (int i = 3, j = 0; i < 6; i++, j++)
            {
                Assert.AreEqual(_speciality2Group2, students[i].Group);
                Assert.AreEqual(j, students[i].GroupIndex);
            }
            
            for (int i = 6, j = 0; i < students.Count; i++, j++)
            {
                Assert.AreEqual(_speciality2Group3, students[i].Group);
                Assert.AreEqual(j, students[i].GroupIndex);
            }
            
        }
        
        
    }
}