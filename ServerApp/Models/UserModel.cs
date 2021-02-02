using System.Collections.Generic;
using Exam.Entities;

namespace Exam.Models
{
    public class UserModel
    {
        public List<School> Schools { get; set; }
        public List<Examination> Examinations { get; set; }
        
        public List<Student> Students { get; set; }
        public List<Application> Applications { get; set; }

        
        public List<Test> Tests { get; set; }
        public List<TestGroup> TestGroups { get; set; }
        public List<Paper> Papers { get; set; }
        
        public List<Corrector> Correctors { get; set; }
        public List<Supervisor> Supervisors { get; set; }
        public List<Secretary> Secretaries { get; set; }

        public List<TestGroupCorrector> TestGroupCorrectors { get; set; }
        public List<TestGroupSupervisor> TestGroupSupervisors { get; set; }
        public List<TestGroupSecretary> TestGroupSecretaries { get; set; }
        
    }
}