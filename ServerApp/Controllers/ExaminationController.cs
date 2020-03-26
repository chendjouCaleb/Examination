using System;
using System.Collections.Generic;
using System.Linq;
using Everest.AspNetStartup.Persistence;
using Exam.Authorizers;
using Exam.Entities;
using Exam.Loaders;
using Exam.Models;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    [Route("api/examinations")]
    public class ExaminationController
    {
        private IRepository< Examination, long> _examinationRepository;

        [HttpGet("{examinationId}")]
        public Examination Find( Examination examination) => examination;

        
        [HttpGet]
        public IEnumerable<Examination> List([FromQuery] int? start, [FromQuery]int? end)
        {
            if (start != null && end != null)
            {
                return _examinationRepository.Set.Skip(start.Value).Take(end.Value - start.Value);
            }
            return _examinationRepository.List();
        }

        
        [HttpPost]
        public CreatedAtActionResult Add(ExaminationForm model, string userId)
        {
            throw new NotImplementedException();
        }

        public StatusCodeResult ChangeStartDate(Examination examination, [FromQuery] DateTime startDate)
        {
            throw new NotImplementedException();
        }
        
        
        public StatusCodeResult ChangeEndDate(Examination examination, [FromQuery] DateTime endDate)
        {
            throw new NotImplementedException();
        }
        
        
        public StatusCodeResult ChangeAdminUserId(Examination examination, [FromQuery] string userId)
        {
            throw new NotImplementedException();
        }
        
        public StatusCodeResult ChangeName(Examination examination, [FromQuery] string name)
        {
            throw new NotImplementedException();
        }
        
        public StatusCodeResult ChangeRequireSpecialityState(Examination examination, [FromQuery] bool state)
        {
            throw new NotImplementedException();
        }

        public StatusCodeResult Start(Examination examination)
        {
            throw new NotImplementedException();
        }
        
        public StatusCodeResult End(Examination examination)
        {
            throw new NotImplementedException();
        }
        
        public StatusCodeResult Relaunc(Examination examination)
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