using System;
using System.Collections.Generic;
using System.Linq;
using Exam.Entities;
using Exam.Entities.Periods;
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

        private IQueryable<SemesterDepartment> _semesterDepartments;
        private IQueryable<SemesterLevel> _semesterLevels;
        private IQueryable<SemesterSpeciality> _semesterSpecialities;
        private IQueryable<SemesterLevelSpeciality> _semesterLevelSpecialities;
        private IQueryable<SemesterStudent> _semesterStudents;

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

        public void Init(Semester semester)
        {
            _semesterDepartments = _dbContext.Set<SemesterDepartment>().Where(d => d.Semester.Equals(semester));
            _semesterLevels = _dbContext.Set<SemesterLevel>().Where(l => l.SemesterDepartment.Semester.Equals(semester));
            _semesterSpecialities = _dbContext.Set<SemesterSpeciality>()
                .Where(d => d.SemesterDepartment.Semester.Equals(semester));

            _semesterLevelSpecialities = _dbContext.Set<SemesterLevelSpeciality>().
                Where(d => d.SemesterLevel.SemesterDepartment.Semester.Equals(semester));

            _semesterStudents = _dbContext.Set<SemesterStudent>()
                .Where(l => l.SemesterLevel.SemesterDepartment.Semester.Equals(semester));

            Total = _semesterDepartments.Count() + _semesterLevels.Count() + _semesterSpecialities.Count() 
                    + _semesterLevelSpecialities.Count() + _semesterStudents.Count() + 1;


            _logger.LogInformation($"Total: {Total}");
        }

        public Examination Create(Semester semester, ExaminationForm form)
        {
            var watch = new System.Diagnostics.Stopwatch();
            watch.Start();
            Init(semester);

            AddExamination(semester, form);
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

        private void AddExamination(Semester semester, ExaminationForm form)
        {
            var examinationController = _services.GetRequiredService<ExaminationController>();
            Examination = examinationController._Add(form, semester);
            Progression += 1 / Total;
        }

        private void AddDepartments()
        {
            var examinationDepartmentController = _services.GetRequiredService<ExaminationDepartmentController>();
            foreach (var semesterDepartment in _semesterDepartments)
            {
                var result = examinationDepartmentController._Add(Examination, semesterDepartment);
                ExaminationDepartments.Add(result);
            }

            Progression += _semesterDepartments.Count() / Total;
        }

        private void AddLevels()
        {
            var examinationLevelController = _services.GetRequiredService<ExaminationLevelController>();
            foreach (var item in ExaminationDepartments)
            {
                var levels = _semesterLevels.Where(l => l.SemesterDepartment.Equals(item.SemesterDepartment)).ToList();
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
                var specialities = _semesterSpecialities
                    .Where(l => l.SemesterDepartment.Equals(item.SemesterDepartment)).ToList();
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
                var levelSpecialities = _semesterLevelSpecialities
                    .Where(l => l.SemesterLevel.Equals(item.SemesterLevel)).ToList();

                foreach (var levelSpeciality in levelSpecialities)
                {
                    var examinationSpeciality = ExaminationSpecialities
                        .Find(e => e.SemesterSpeciality.Equals(levelSpeciality.SemesterSpeciality));

                    var examinationLevelSpeciality = examinationLevelSpecialityController
                        ._Add(item, examinationSpeciality);

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
                var students = _semesterStudents
                    .Where(l => l.SemesterLevel.Equals(examinationLevel.SemesterLevel)).ToList();

                foreach (var student in students)
                {
                    var examinationLevelSpeciality = ExaminationLevelSpecialities
                        .FirstOrDefault(l => l.ExaminationLevel.Equals(examinationLevel) &&
                                   l.SemesterLevelSpeciality.Equals(student.SemesterLevelSpeciality));

                    ExaminationStudents.Add(
                        examinationStudentController._Add(student, examinationLevel, examinationLevelSpeciality)
                    );
                }

                Progression += students.Count / Total;
            }
        }
    }
}