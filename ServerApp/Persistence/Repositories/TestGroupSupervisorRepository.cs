using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Exam.Persistence.Repositories
{
    public interface ITestGroupSupervisorRepository : IRepository<TestGroupSupervisor, long>
    {
        School GetSchool(TestGroupSupervisor testGroupSupervisor);
        
        Department GetDepartment(TestGroupSupervisor testGroupSupervisor);

        Examination GetExamination(TestGroupSupervisor testGroupSupervisor);

    }

    public class TestGroupSupervisorRepository : Repository<TestGroupSupervisor, long>, ITestGroupSupervisorRepository
    {
        public TestGroupSupervisorRepository(DbContext dataContext) : base(dataContext)
        {
        }
        

        public School GetSchool(TestGroupSupervisor testGroupSupervisor)
        {
            return context.Set<School>().First(s => s.Equals(testGroupSupervisor.TestGroup.Test.Course.Level.Department.School));
        }

        public Department GetDepartment(TestGroupSupervisor testGroupSupervisor)
        {
            return context.Set<Department>().First(s => s.Equals(testGroupSupervisor.TestGroup.Test.Course.Level.Department));
        }
        
        public Examination GetExamination(TestGroupSupervisor testGroupSupervisor)
        {
            return context.Set<Examination>().First(s =>
                s.Equals(testGroupSupervisor.TestGroup.Test.ExaminationLevel.ExaminationDepartment.Examination));
        }

        
    }
}