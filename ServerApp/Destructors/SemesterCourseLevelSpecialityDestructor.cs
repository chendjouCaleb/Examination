using Exam.Entities.Periods;
using Exam.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Exam.Destructors
{
    public class SemesterCourseLevelSpecialityDestructor
    {
        private DbContext _dbContext;

        public SemesterCourseLevelSpecialityDestructor(DbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public void Destroy(SemesterCourseLevelSpeciality semesterCourseLevelSpeciality)
        {
            Assert.RequireNonNull(semesterCourseLevelSpeciality, nameof(semesterCourseLevelSpeciality));
            _dbContext.Remove(semesterCourseLevelSpeciality);
        }
    }
}