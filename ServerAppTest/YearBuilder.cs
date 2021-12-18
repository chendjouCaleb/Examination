using System;
using Exam.Controllers.Periods;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Models;
using Microsoft.Extensions.DependencyInjection;

namespace ServerAppTest
{
    public class YearBuilder
    {
        private School _school;
        private IServiceProvider _serviceProvider;
        private Year _year;

        public YearBuilder(School school, IServiceProvider serviceProvider)
        {
            _school = school;
            _serviceProvider = serviceProvider;
        }

        public Year Build(YearForm yearForm = null)
        {
            if (yearForm == null)
            {
                yearForm = new YearForm
                {
                    ExpectedStartDate = DateTime.Now.AddDays(2),
                    ExpectedEndDate = DateTime.Now.AddMonths(10)
                };
            }

            var controller = _serviceProvider.GetRequiredService<YearController>();
            Year year = controller.Add(_school, yearForm).Value as Year;
            _year = year;

            return year;
        }
    }
}