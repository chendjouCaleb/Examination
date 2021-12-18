using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Exam.Persistence.Repositories
{
    public interface ITestGroupCorrectorRepository : IRepository<TestGroupCorrector, long>
    {
        School GetSchool(TestGroupCorrector testGroupCorrector);

        Department GetDepartment(TestGroupCorrector testGroupCorrector);

        Examination GetExamination(TestGroupCorrector testGroupCorrector);
    }

    public class TestGroupCorrectorRepository : Repository<TestGroupCorrector, long>, ITestGroupCorrectorRepository
    {
        public TestGroupCorrectorRepository(DbContext dataContext) : base(dataContext)
        {
        }


        public School GetSchool(TestGroupCorrector testGroupCorrector)
        {
            return context.Set<School>()
                .First(s => s.Equals(testGroupCorrector.TestGroup.Test.SemesterCourse.Course.Level.Department.School));
        }

        public Examination GetExamination(TestGroupCorrector testGroupCorrector)
        {
            return context.Set<Examination>().First(s =>
                s.Equals(testGroupCorrector.TestGroup.Test.ExaminationLevel.ExaminationDepartment.Examination));
        }

        public Department GetDepartment(TestGroupCorrector testGroupCorrector)
        {
            return context.Set<Department>()
                .First(s => s.Equals(testGroupCorrector.TestGroup.Test.SemesterCourse.Course.Level.Department));
        }
    }
}