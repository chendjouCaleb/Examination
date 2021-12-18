using System;
using Exam.Controllers.Periods;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Models;
using Microsoft.Extensions.DependencyInjection;

namespace ServerAppTest
{
    public class SemesterBuilder
    {
        private Year _year;
        private IServiceProvider _serviceProvider;
        public Semester Semester { get; private set; }

        public SemesterBuilder(Year year, IServiceProvider serviceProvider)
        {
            _year = year;
            _serviceProvider = serviceProvider;
        }

        public Semester Build(SemesterForm semesterForm = null)
        {
            if (semesterForm == null)
            {
                semesterForm = new SemesterForm
                {
                    ExpectedStartDate = _year.ExpectedStartDate.AddDays(2),
                    ExpectedEndDate = _year.ExpectedEndDate.AddMonths(5)
                };
            }

            var controller = _serviceProvider.GetRequiredService<SemesterController>();
            Semester semester = controller.Add(_year, semesterForm).Value as Semester;
            Semester = semester;

            return semester;
        }
    }
}