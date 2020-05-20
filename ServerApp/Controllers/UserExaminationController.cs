using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Loaders;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    [Route("api/examinations/users")]
    public class UserExaminationController : Controller
    {
        private IRepository<Examination, long> _examinationRepository;
        private IRepository<Corrector, long> _correctorRepository;
        private IRepository<Principal, long> _principalRepository;
        private IRepository<Secretary, long> _secretaryRepository;
        private IRepository<Supervisor, long> _supervisorRepository;
        private IRepository<Student, long> _studentRepository;

        public UserExaminationController(IRepository<Examination, long> examinationRepository,
            IRepository<Corrector, long> correctorRepository, IRepository<Principal, long> principalRepository,
            IRepository<Secretary, long> secretaryRepository, IRepository<Supervisor, long> supervisorRepository,
            IRepository<Student, long> studentRepository)
        {
            _examinationRepository = examinationRepository;
            _correctorRepository = correctorRepository;
            _principalRepository = principalRepository;
            _secretaryRepository = secretaryRepository;
            _supervisorRepository = supervisorRepository;
            _studentRepository = studentRepository;
        }


        [HttpGet]
        [RequireQueryParameters(new[] {"userId", "examinationId"})]
        [LoadExamination(Source = ParameterSource.Query)]
        public UserExamination Get(Examination examination, [FromQuery] string userId)
        {
            return new UserExamination
            {
                UserId = userId,
                IsCorrector = _correctorRepository.Exists(o => o.ExaminationId == examination.Id && o.UserId == userId),
                IsPrincipal = _principalRepository.Exists(o => o.ExaminationId == examination.Id && o.UserId == userId),
                IsSecretary = _secretaryRepository.Exists(o => o.ExaminationId == examination.Id && o.UserId == userId),
                IsSupervisor = _supervisorRepository.Exists(o => o.ExaminationId == examination.Id && o.UserId == userId),

                IsStudent = _studentRepository.Exists(o => o.ExaminationId == examination.Id && o.UserId == userId) 
                
            };
        }
    }
}