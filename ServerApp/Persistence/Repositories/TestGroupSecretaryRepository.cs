using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Exam.Persistence.Repositories
{
    public interface ITestGroupSecretaryRepository : IRepository<TestGroupSecretary, long>
    {
        School GetSchool(TestGroupSecretary testGroupSecretary);

        Department GetDepartment(TestGroupSecretary testGroupSecretary);

        Examination GetExamination(TestGroupSecretary testGroupSecretary);
    }

    public class TestGroupSecretaryRepository : Repository<TestGroupSecretary, long>, ITestGroupSecretaryRepository
    {
        public TestGroupSecretaryRepository(DbContext dataContext) : base(dataContext)
        {
        }


        public School GetSchool(TestGroupSecretary testGroupSecretary)
        {
            return context.Set<School>()
                .First(s => s.Equals(testGroupSecretary.TestGroup.Test.Course.Level.Department.School));
        }

        public Examination GetExamination(TestGroupSecretary testGroupSecretary)
        {
            return context.Set<Examination>().First(s =>
                s.Equals(testGroupSecretary.TestGroup.Test.ExaminationLevel.ExaminationDepartment.Examination));
        }

        public Department GetDepartment(TestGroupSecretary testGroupSecretary)
        {
            return context.Set<Department>()
                .First(s => s.Equals(testGroupSecretary.TestGroup.Test.Course.Level.Department));
        }
    }
}