using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers
{
    [Route("api/examinationStudents")]
    public class ExaminationStudentController
    {
        private readonly IRepository<ExaminationStudent, long> _repository;
        private readonly IRepository<Student, long> _studentRepository;
        private readonly IRepository<ExaminationLevelSpeciality, long> _examinationLevelSpecialityRepository;

        public ExaminationStudentController(IRepository<ExaminationStudent, long> repository,
            IRepository<Student, long> studentRepository,
            IRepository<ExaminationLevelSpeciality, long> examinationLevelSpecialityRepository)
        {
            _repository = repository;
            _studentRepository = studentRepository;
            _examinationLevelSpecialityRepository = examinationLevelSpecialityRepository;
        }


        [HttpGet("{examinationStudentId}")]
        public ExaminationStudent Get(long examinationStudentId)
        {
            return _repository.Find(examinationStudentId);
        }

        [HttpGet]
        public IEnumerable<ExaminationStudent> List(
            [FromQuery] long? studentId,
            [FromQuery] long? examinationId,
            [FromQuery] long? examinationLevelId,
            [FromQuery] long? examinationLevelSpecialityId,
            [FromQuery] long? examinationSpecialityId,
            [FromQuery] long? examinationDepartmentId)
        {
            IQueryable<ExaminationStudent> query = _repository.Set;
            if (studentId != null)
            {
                query = query.Where(e => studentId == e.StudentId);
            }

            if (examinationId != null)
            {
                query = query.Where(s => s.ExaminationLevel.ExaminationDepartment.ExaminationId == examinationId);
            }

            if (examinationLevelId != null)
            {
                query = query.Where(s => s.ExaminationLevelId == examinationLevelId);
            }

            if (examinationLevelSpecialityId != null)
            {
                query = query.Where(s => s.ExaminationLevelSpecialityId == examinationLevelSpecialityId);
            }

            if (examinationSpecialityId != null)
            {
                query = query.Where(
                    s => s.ExaminationLevelSpeciality.ExaminationSpecialityId == examinationSpecialityId);
            }

            if (examinationDepartmentId != null)
            {
                query = query.Where(s => s.ExaminationLevel.ExaminationDepartmentId == examinationDepartmentId);
            }

            return query.Include(e => e.Student)
                .Include(e => e.ExaminationLevel)
                .Include(e => e.ExaminationLevel.Level).ToList();
        }


        public List<ExaminationStudent> Add(ExaminationLevel examinationLevel)
        {
            return _studentRepository.List(s => examinationLevel.LevelId == s.LevelId)
                .Select(s => _Add(s, examinationLevel)).ToList();
        }

        public ExaminationStudent _Add(Student student, ExaminationLevel examinationLevel)
        {
            ExaminationLevelSpeciality examinationLevelSpeciality = _examinationLevelSpecialityRepository
                .First(e => e.LevelSpecialityId == student.LevelSpecialityId &&
                            e.ExaminationLevelId == examinationLevel.Id);

            return _Add(student, examinationLevel, examinationLevelSpeciality);
        }

        public ExaminationStudent _Add(Student student, ExaminationLevel examinationLevel,
            ExaminationLevelSpeciality examinationLevelSpeciality)
        {
            Assert.RequireNonNull(student, nameof(student));
            Assert.RequireNonNull(examinationLevel, nameof(examinationLevel));

            if (!student.Level.Equals(examinationLevel.Level))
            {
                throw new IncompatibleEntityException<Student, ExaminationLevel>(student, examinationLevel);
            }

            if (examinationLevelSpeciality != null &&
                !examinationLevelSpeciality.ExaminationLevel.Equals(examinationLevel))
            {
                throw new IncompatibleEntityException<ExaminationLevelSpeciality, ExaminationLevel>(
                    examinationLevelSpeciality, examinationLevel);
            }

            ExaminationStudent examinationStudent = _repository.First(s =>
                examinationLevel.Equals(s.ExaminationLevel) &&
                student.Equals(s.Student));


            if (examinationStudent == null)
            {
                examinationStudent = new ExaminationStudent
                {
                    Student = student,
                    ExaminationLevel = examinationLevel,
                    ExaminationLevelSpeciality = examinationLevelSpeciality
                };
                //_repository.Save(examinationStudent);
            }

            return examinationStudent;
        }

        public void ChangeExaminationLevel(
            ExaminationStudent examinationStudent, ExaminationLevel examinationLevel,
            ExaminationLevelSpeciality examinationLevelSpeciality)
        {
            Assert.RequireNonNull(examinationStudent, nameof(examinationStudent));
            Assert.RequireNonNull(examinationLevel, nameof(examinationLevel));

            if (examinationStudent.ExaminationLevel.ExaminationDepartmentId != examinationLevel.ExaminationDepartmentId)
            {
                throw new IncompatibleEntityException<ExaminationStudent, ExaminationLevel>(examinationStudent,
                    examinationLevel);
            }

            if (examinationLevelSpeciality != null &&
                examinationLevelSpeciality.ExaminationLevelId != examinationLevel.Id)
            {
                throw new IncompatibleEntityException<ExaminationLevelSpeciality, ExaminationLevel>(
                    examinationLevelSpeciality, examinationLevel);
            }

            examinationStudent.ExaminationLevel = examinationLevel;
            examinationStudent.ExaminationLevelSpeciality = examinationLevelSpeciality;
            _repository.Update(examinationStudent);
        }


        public void ChangeExaminationLevelSpeciality(
            ExaminationStudent examinationStudent,
            ExaminationLevelSpeciality examinationLevelSpeciality)
        {
            Assert.RequireNonNull(examinationStudent, nameof(examinationStudent));
            Assert.RequireNonNull(examinationLevelSpeciality, nameof(examinationLevelSpeciality));

            if (examinationLevelSpeciality.ExaminationLevelId != examinationStudent.ExaminationLevelId)
            {
                throw new IncompatibleEntityException<ExaminationLevelSpeciality, ExaminationStudent>(
                    examinationLevelSpeciality, examinationStudent);
            }

            examinationStudent.ExaminationLevelSpeciality = examinationLevelSpeciality;
            _repository.Update(examinationStudent);
        }


        public void RemoveExaminationLevelSpeciality(ExaminationStudent examinationStudent)
        {
            Assert.RequireNonNull(examinationStudent, nameof(examinationStudent));

            examinationStudent.ExaminationLevelSpeciality = null;
            examinationStudent.ExaminationLevelSpecialityId = null;

            _repository.Update(examinationStudent);
        }

        public void Delete(ExaminationStudent examinationStudent)
        {
            _repository.Delete(examinationStudent);
        }
    }
}