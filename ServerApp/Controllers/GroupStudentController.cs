using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Loaders;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    [Route("api")]
    public class GroupStudentController
    {
        private IRepository<Student, long> _studentRepository;
        private IRepository<Group, long> _groupRepository;
        private IRepository<Speciality, long> _specialityRepository;
        private IRepository<Examination, long> _examinationRepository;

        public GroupStudentController(IRepository<Student, long> studentRepository, 
            IRepository<Group, long> groupRepository, IRepository<Speciality, long> specialityRepository,
            IRepository<Examination, long> examinationRepository)
        {
            _studentRepository = studentRepository;
            _groupRepository = groupRepository;
            _specialityRepository = specialityRepository;
            _examinationRepository = examinationRepository;
        }


        [HttpGet("examinations/{examinationId}/countNonGroupedStudents")]
        [LoadExamination]
        public long CountNonGroupedStudents(Examination examination) => _studentRepository
            .Count(s => examination.Equals(s.Examination) && s.Group == null);
        

        [HttpPut("examinations/{examinationId}/group")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        public void GroupStudents(Examination examination, [FromQuery] bool all)
        {
            GroupStudentWithoutSpeciality(examination);
            if (all)
            {
                examination.Specialities?.ForEach(Group);
            }
            
        }

        [HttpPut("examinations/{examinationId}/groupNonSpecialityStudents")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        public void GroupStudentWithoutSpeciality(Examination examination)
        {
            if (CanGroupStudentWithoutSpeciality(examination) < 0)
            {
                return;
            }

            List<Student> students = _studentRepository.Set
                .Where(s => examination.Equals(s.Examination) && s.Speciality == null)
                .OrderBy(s => s.FullName).ToList();

            List<Group> groups = _groupRepository.Set
                .Where(s => examination.Equals(s.Examination) && s.Speciality == null)
                .OrderBy(s => s.Index).ToList();

            GroupStudents(groups, students);

            examination.LastGroupingDate = DateTime.Now;
            examination.Grouped = true;
            _examinationRepository.Update(examination);
        }

        [HttpPut("examinations/{examinationId}/ungroup")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        public void UnGroup(Examination examination, [FromQuery] bool all)
        {
            IQueryable<Student> set = _studentRepository.Set.Where(s => examination.Equals(s.Examination));
            if (!all)
            {
                set = set.Where(s => s.Speciality == null);
            }
            
            foreach (var student in set.ToList())
            {
                student.GroupId = null;
                student.Group = null;
                student.GroupIndex = 0;
                _studentRepository.Update(student);
            }

            examination.Grouped = false;
            _examinationRepository.Update(examination);
        }

        [HttpPut("specialities/{specialityId}/group")]
        [LoadSpeciality( ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        public void Group(Speciality speciality)
        {
            if (CanGroupStudentOfSpeciality(speciality) < 0)
            {
                return;
            }

            List<Student> students = _studentRepository.Set
                .Where(s => speciality.Equals(s.Speciality))
                .OrderBy(s => s.FullName).ToList();

            List<Group> groups = _groupRepository.Set
                .Where(s => speciality.Equals(s.Speciality))
                .OrderBy(s => s.Index).ToList();

            GroupStudents(groups, students);
            
            speciality.LastGroupingDate = DateTime.Now;
            speciality.Grouped = true;
            _specialityRepository.Update(speciality);
            
            speciality.Examination.LastGroupingDate = DateTime.Now;
            speciality.Examination.Grouped = true;
            _examinationRepository.Update(speciality.Examination);
        }


        [HttpPut("specialities/{specialityId}/ungroup")]
        [LoadSpeciality(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        public void UnGroup(Speciality speciality)
        {
            Assert.RequireNonNull(speciality, nameof(speciality));
            IList<Student> students = _studentRepository.List(s => speciality.Equals(s.Speciality));

            foreach (var student in students)
            {
                student.Group = null;
                student.GroupId = null;
                student.GroupIndex = 0;
                _studentRepository.Update(student);
            }

            speciality.Grouped = false;
            _specialityRepository.Update(speciality);
        }


        [HttpPut("groups/{groupId}/ungroup")]
        [LoadGroup(ExaminationItemName = "examination")]
        [AuthorizeExaminationAdmin]
        public void UnGroup(Group group)
        {
            Assert.RequireNonNull(group, nameof(group));
            IList<Student> students = _studentRepository.List(s => group.Equals(s.Group));

            foreach (var student in students)
            {
                student.Group = null;
                student.GroupId = null;
                student.GroupIndex = 0;
                _studentRepository.Update(student);
            }
        }


        public void GroupStudents(IEnumerable<Group> groups, List<Student> students)
        {
            int index = 0;
            foreach (Group group in groups)
            {
                int capacity = (int) group.Capacity;
                if (capacity > students.Count - index)
                {
                    capacity = students.Count - index;
                }

                List<Student> groupStudents = students.GetRange(index, capacity);
                for (int i = 0; i < groupStudents.Count; i++)
                {
                    Student student = groupStudents[i];

                    student.Group = group;
                    student.GroupIndex = i;
                    _studentRepository.Update(student);
                }

                index += (int) group.Capacity;
                if (index >= students.Count)
                {
                    break;
                }
            }
        }

        [HttpGet("examinations/{examinationId}/canGroupStudents")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        public int CanGroupStudents(Examination examination)
        {
            int examinationCapacity = CanGroupStudentWithoutSpeciality(examination);


            if (examination.Specialities == null || examination.Specialities.Count == 0)
            {
                return examinationCapacity;
            }

            return examinationCapacity + examination.Specialities.Sum(CanGroupStudentOfSpeciality);
        }


        [HttpGet("examinations/{examinationId}/canGroupNonSpecialityStudents")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        public int CanGroupStudentWithoutSpeciality(Examination examination)
        {
            int capacity = _groupRepository.List(g => examination.Equals(g.Examination) && null == g.Speciality)
                .Sum(g => (int) g.Capacity);

            long studentCount =
                _studentRepository.Count(s => examination.Equals(s.Examination) && s.Speciality == null);

            return capacity - (int) studentCount;
        }

        [HttpGet("specialities/{specialityId}/canGroupStudents")]
        [LoadSpeciality(ExaminationItemName = "examination" )]
        [AuthorizeExaminationAdmin]
        public int CanGroupStudentOfSpeciality(Speciality speciality)
        {
            int capacity = _groupRepository.List(g => speciality.Equals(g.Speciality))
                .Sum(g => (int) g.Capacity);

            long studentCount = _studentRepository.Count(s => speciality.Equals(s.Speciality));

            return capacity - (int) studentCount;
        }
    }
}