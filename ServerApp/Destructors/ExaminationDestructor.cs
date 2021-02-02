using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Exam.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Exam.Destructors
{
    public class ExaminationDestructor
    {
        private DbContext _dbContext;
        private ILogger<ExaminationDestructor> _logger;

        public Examination Examination { get; private set; }
        public int Progression { get; private set; }
        public int Total { get; private set; }


        private List<ExaminationDepartment> _examinationDepartments;
        private List<ExaminationLevel> _examinationLevels;
        private List<ExaminationSpeciality> _examinationSpecialities;
        private List<ExaminationLevelSpeciality> _examinationLevelSpecialities;
        private List<ExaminationStudent> _examinationStudents;

        public ExaminationDestructor(IServiceProvider serviceProvider)
        {
            _dbContext = serviceProvider.GetRequiredService<DbContext>();
            _logger = serviceProvider.GetRequiredService<ILogger<ExaminationDestructor>>();
        }

        public void Destroy(Examination examination)
        {
            var watch = new Stopwatch();
            
            watch.Start();
            Init(examination);
            DestroyStudents();
            DestroyLevelSpecialities();
            DestroySpecialities();
            DestroyLevels();
            DestroyDepartments();
            DestroyExamination();
            _dbContext.SaveChanges();
            watch.Stop();
            
            _logger.LogInformation($"Examination deleted. {Total} entities in Duration: {watch.ElapsedMilliseconds} ms");
        }

        private void Init(Examination examination)
        {
            Examination = examination;
            _examinationDepartments = _dbContext.Set<ExaminationDepartment>()
                .Where(e => e.Examination.Equals(Examination)).ToList();

            _examinationLevels = _dbContext.Set<ExaminationLevel>()
                .Where(e => e.ExaminationDepartment.Examination.Equals(Examination)).ToList();

            _examinationSpecialities = _dbContext.Set<ExaminationSpeciality>()
                .Where(e => e.ExaminationDepartment.Examination.Equals(Examination)).ToList();

            _examinationLevelSpecialities = _dbContext.Set<ExaminationLevelSpeciality>()
                .Where(e => e.ExaminationLevel.ExaminationDepartment.Examination.Equals(Examination)).ToList();

            _examinationStudents = _dbContext.Set<ExaminationStudent>()
                .Where(e => e.ExaminationLevel.ExaminationDepartment.Examination.Equals(Examination)).ToList();

            Total = _examinationDepartments.Count + _examinationLevels.Count + _examinationSpecialities.Count +
                    _examinationLevelSpecialities.Count + _examinationStudents.Count + 1;
        }

        private void DestroyExamination()
        {
            _dbContext.Remove(Examination);
            Progression += 1;
        }

        private void DestroyDepartments()
        {
            _dbContext.RemoveRange(_examinationDepartments);
            Progression += _examinationDepartments.Count;
        }

        private void DestroyLevels()
        {
            _dbContext.RemoveRange(_examinationLevels);
            Progression += _examinationLevels.Count;
        }

        private void DestroySpecialities()
        {
            _dbContext.RemoveRange(_examinationSpecialities);
            Progression += _examinationSpecialities.Count;
        }

        private void DestroyLevelSpecialities()
        {
            _dbContext.RemoveRange(_examinationLevelSpecialities);
            Progression += _examinationLevelSpecialities.Count;
        }

        private void DestroyStudents()
        {
            _dbContext.RemoveRange(_examinationStudents);
            Progression += _examinationStudents.Count;
        }
    }
}