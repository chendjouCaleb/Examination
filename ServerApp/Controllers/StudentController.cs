using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Filters;
using Exam.Loaders;
using Exam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ServerApp.Filters;

namespace Exam.Controllers
{
    [Route("api/students")]
    public class StudentController : Controller
    {
        private IRepository<Examination, long> _examinationRepository;
        private IRepository<Student, long> _studentRepository;
        private ILogger<StudentController> _logger;




        [HttpGet("{studentId}")]
        [LoadStudent]
        public Student Find(Student student) => student;


        [HttpGet]
        [LoadExamination(Source = ParameterSource.Query)]
        public IEnumerable<Student> List(Examination examination, [FromQuery] string userId)
        {
            IQueryable<Student> set = _studentRepository.Set;
            if (examination != null)
            {
                set = set.Where(s => s.Examination.Id == examination.Id);
            }

            if (!string.IsNullOrWhiteSpace(userId))
            {
                set = set.Where(s => s.UserId == userId);
            }

            return set.ToList();
        }


        [HttpPost]
        [LoadExamination(Source = ParameterSource.Query)]
        [LoadSpeciality(Source = ParameterSource.Query)]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        [AuthorizeExaminationAdmin]
        
        public CreatedAtActionResult Add([FromBody] StudentForm form, Examination examination, Speciality  speciality)
        {
            throw new NotImplementedException();
        }

        [HttpPut("{studentId}")]
        [LoadStudent(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        [AuthorizeExaminationAdmin]
        public Student Edit(Student student, [FromBody] StudentForm form)
        {
            throw new NotImplementedException();
        }

        [HttpPut("{studentId}/speciality")]
        [LoadStudent(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        [LoadSpeciality(Source = ParameterSource.Query)]
        [AuthorizeExaminationAdmin]
        public StatusCodeResult ChangeSpeciality(Student student, Speciality speciality)
        {
            throw new NotImplementedException();
        }


        [HttpPut("{studentId}")]
        [LoadStudent(ExaminationItemName = "examination")]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED",
            ErrorMessage = "{examination.requireNoState.finished")]
        [AuthorizeExaminationAdmin]
        public NoContentResult Delete(Student student)
        {
            throw new NotImplementedException();
        }
    }
}