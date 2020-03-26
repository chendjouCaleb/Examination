using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Filters;
using Exam.Loaders;
using Exam.Models;
using Microsoft.AspNetCore.Mvc;
using ServerApp.Filters;

namespace Exam.Controllers
{
    [Route("api/examinations")]
    public class ExaminationController
    {
        private IRepository<Examination, long> _examinationRepository;

        [HttpGet("{examinationId}")]
        [LoadExamination]
        public Examination Find(Examination examination) => examination;


        [HttpGet]
        public IEnumerable<Examination> List([FromQuery] int? start, [FromQuery] int? end)
        {
            if (start != null && end != null)
            {
                return _examinationRepository.Set.Skip(start.Value).Take(end.Value - start.Value);
            }

            return _examinationRepository.List();
        }


        [HttpPost]
        public CreatedAtActionResult Add([FromBody] ExaminationForm model, string userId)
        {
            throw new NotImplementedException();
        }

        [HttpPut("{examinationId}/startDate")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        [PeriodHaveState(ItemName = "examination", State = "PENDING", ErrorMessage = "{examination.requireState.pending")]
        public StatusCodeResult ChangeStartDate(Examination examination, [FromQuery] DateTime startDate)
        {
            throw new NotImplementedException();
        }


        [HttpPut("{examinationId}/endDate")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED", ErrorMessage = "{examination.requireNoState.finished")]
        public StatusCodeResult ChangeEndDate(Examination examination, [FromQuery] DateTime endDate)
        {
            throw new NotImplementedException();
        }


        [HttpPut("{examinationId}/admin")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        public StatusCodeResult ChangeAdminUserId(Examination examination, [FromQuery] string userId)
        {
            throw new NotImplementedException();
        }

        [HttpPut("{examinationId}/name")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        public StatusCodeResult ChangeName(Examination examination, [FromQuery] string name)
        {
            throw new NotImplementedException();
        }

        
        [HttpPut("{examinationId}/specialityState")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        public StatusCodeResult ChangeRequireSpecialityState(Examination examination, [FromQuery] bool state)
        {
            throw new NotImplementedException();
        }

        
        [HttpPut("{examinationId}/start")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        [PeriodDontHaveState(ItemName = "examination", State = "FINISHED", ErrorMessage = "{examination.requireState.finished")]

        public StatusCodeResult Start(Examination examination)
        {
            throw new NotImplementedException();
        }

        [HttpPut("{examinationId}/start")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        [PeriodHaveState(ItemName = "examination", State = "PROGRESS", ErrorMessage = "{examination.requireState.progress")]

        public StatusCodeResult End(Examination examination)
        {
            throw new NotImplementedException();
        }

        [HttpPut("{examinationId}/relaunch")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        [PeriodHaveState(ItemName = "examination", State = "FINISHED", ErrorMessage = "{examination.requireState.finished")] 
        public StatusCodeResult Relaunch(Examination examination)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{examinationId}")]
        [LoadExamination]
        [AuthorizeExaminationAdmin]
        public NoContentResult Delete(Examination examination)
        {
            throw new NotImplementedException();
        }
    }
}