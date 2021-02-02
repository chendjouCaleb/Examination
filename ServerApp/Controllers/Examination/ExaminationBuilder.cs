using System;
using System.Collections.Generic;
using System.Linq;
using Exam.Entities;
using Exam.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    public class ExaminationBuilder
    {
        private IServiceProvider _services;
        private ILogger<ExaminationBuilder> _logger;
        private DbContext _dbContext;

        public double Total { get; private set; }
        public double Progression { get; private set; }

        private IEnumerable<Department> _departments;
        private IEnumerable<Level> _levels;
        private IEnumerable<Speciality> _specialities;
        private IEnumerable<LevelSpeciality> _levelSpecialities;
        private IEnumerable<Student> _students;

        public Examination Examination { get; private set; }
        public List<ExaminationDepartment> ExaminationDepartments { get; } = new List<ExaminationDepartment>();

        public List<ExaminationLevel> ExaminationLevels { get; } = new List<ExaminationLevel>();

        public List<ExaminationSpeciality> ExaminationSpecialities { get; } = new List<ExaminationSpeciality>();

        public List<ExaminationLevelSpeciality> ExaminationLevelSpecialities { get; } =
            new List<ExaminationLevelSpeciality>();

        public List<ExaminationStudent> ExaminationStudents { get; } = new List<ExaminationStudent>();


        public ExaminationBuilder(IServiceProvider services)
        {
            _services = services;
            _dbContext = _services.GetRequiredService<DbContext>();
            _logger = _services.GetService<ILogger<ExaminationBuilder>>();
        }

        public void Init(School school
        )
        {
            _departments = _dbContext.Set<Department>().Where(d => d.School.Equals(school));
            _levels = _dbContext.Set<Level>().Where(l => l.Department.School.Equals(school));
            _specialities = _dbContext.Set<Speciality>().Where(d => d.Department.School.Equals(school));

            _levelSpecialities = _dbContext.Set<LevelSpeciality>().Where(d => d.Level.Department.School.Equals(school));

            _students = _dbContext.Set<Student>().Where(l => l.Level.Department.School.Equals(school));

            Total = _departments.Count() + _levels.Count() + _specialities.Count() + _levelSpecialities.Count() +
                    _students.Count();


            _logger.LogInformation($"Total: {Total}");
        }

        public Examination Create(School school, ExaminationForm form)
        {
            var watch = new System.Diagnostics.Stopwatch();
            watch.Start();
            Init(school);

            AddExamination(school, form);
            AddDepartments();
            AddLevels();
            AddSpecialities();
            AddLevelSpecialities();
            AddStudents();

            _dbContext.Set<Examination>().Add(Examination);
            _dbContext.Set<ExaminationDepartment>().AddRange(ExaminationDepartments);
            _dbContext.Set<ExaminationLevel>().AddRange(ExaminationLevels);
            _dbContext.Set<ExaminationSpeciality>().AddRange(ExaminationSpecialities);
            _dbContext.Set<ExaminationLevelSpeciality>().AddRange(ExaminationLevelSpecialities);
            _dbContext.Set<ExaminationStudent>().AddRange(ExaminationStudents);

            _dbContext.SaveChanges();

            watch.Stop();

            _logger.LogInformation($"Total: ${Total}; Duration: {watch.Elapsed.TotalSeconds} s");
            return Examination;
        }

        private void AddExamination(School school, ExaminationForm form)
        {
            var examinationController = _services.GetRequiredService<ExaminationController>();
            Examination = examinationController._Add(form, school);
        }

        private void AddDepartments()
        {
            var examinationDepartmentController = _services.GetRequiredService<ExaminationDepartmentController>();
            foreach (var department in _departments)
            {
                var result = examinationDepartmentController._Add(Examination, department);
                ExaminationDepartments.Add(result);
            }

            Progression += _departments.Count() / Total;
        }

        private void AddLevels()
        {
            var examinationLevelController = _services.GetRequiredService<ExaminationLevelController>();
            foreach (var item in ExaminationDepartments)
            {
                var levels = _levels.Where(l => l.Department.Equals(item.Department)).ToList();
                foreach (var level in levels)
                {
                    ExaminationLevels.Add(examinationLevelController._Add(item, level));
                }

                Progression += levels.Count / Total;
            }
        }


        private void AddSpecialities()
        {
            var examinationSpecialityController = _services.GetService<ExaminationSpecialityController>();
            foreach (var item in ExaminationDepartments)
            {
                var specialities = _specialities.Where(l => l.Department.Equals(item.Department)).ToList();
                foreach (var speciality in specialities)
                {
                    ExaminationSpecialities.Add(examinationSpecialityController._Add(item, speciality));
                }

                Progression += specialities.Count / Total;
            }
        }

        private void AddLevelSpecialities()
        {
            var examinationLevelSpecialityController = _services.GetService<ExaminationLevelSpecialityController>();
            foreach (var item in ExaminationLevels)
            {
                var levelSpecialities = _levelSpecialities.Where(l => l.Level.Equals(item.Level)).ToList();

                foreach (var levelSpeciality in levelSpecialities)
                {
                    var examinationSpeciality = ExaminationSpecialities
                        .Find(e => e.Speciality.Equals(levelSpeciality.Speciality));

                    var examinationLevelSpeciality = examinationLevelSpecialityController
                        ._Add(item, examinationSpeciality, levelSpeciality);

                    ExaminationLevelSpecialities.Add(examinationLevelSpeciality);
                }

                Progression += levelSpecialities.Count / Total;
            }
        }


        public void AddStudents()
        {
            var examinationStudentController = _services.GetService<ExaminationStudentController>();
            foreach (var examinationLevel in ExaminationLevels)
            {
                var students = _students.Where(l => l.Level.Equals(examinationLevel.Level)).ToList();

                foreach (var student in students)
                {
                    var examinationLevelSpeciality = ExaminationLevelSpecialities
                        .Find(l => l.ExaminationLevel.Equals(examinationLevel) &&
                                   l.LevelSpeciality.Equals(student.LevelSpeciality));

                    ExaminationStudents.Add(
                        examinationStudentController._Add(student, examinationLevel, examinationLevelSpeciality)
                    );
                }

                Progression += students.Count / Total;
            }
        }
    }
}