using System;
using Exam.Controllers;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace ServerAppTest
{
    public class TestExaminationBuilder
    {
        
        private IServiceProvider _serviceProvider;
        private DbContext _dbContext;
        public Semester Semester { get; private set; }
        public School School { get; private set; }
        public Year Year { get; private set; }
        public Examination Examination { get; private set; }

        public TestExaminationBuilder(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            _dbContext = serviceProvider.GetRequiredService<DbContext>();
        }

        public Examination Build()
        {
            SchoolBuilder schoolBuilder = new SchoolBuilder(_serviceProvider);
            School = schoolBuilder.CreateSchool();
            
            YearBuilder yearBuilder = new YearBuilder(School, _serviceProvider);
            Year = yearBuilder.Build();
            
            SemesterBuilder semesterBuilder = new SemesterBuilder(Year, _serviceProvider);
            Semester = semesterBuilder.Build();
            
            ExaminationBuilder examinationBuilder = new ExaminationBuilder(_serviceProvider);
            Examination = examinationBuilder.Create(Semester, new ExaminationForm
            {
                ExpectedStartDate = Semester.ExpectedStartDate.AddDays(2),
                ExpectedEndDate = Semester.ExpectedEndDate.AddDays(20)
            });

            return Examination;
        }
        
    }
}