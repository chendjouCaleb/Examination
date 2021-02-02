using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Loaders;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    [Route("api/schools/users")]
    public class UserSchoolController : Controller
    {
        [HttpGet]
        [RequireQueryParameters(new[] {"userId", "schoolId"})]
        [LoadSchool(Source = ParameterSource.Query)]
        public UserSchool Get(School school, [FromQuery] string userId)
        {
            return new UserSchool
            {
                UserId = userId,
                IsPrincipal = school.PrincipalUserId == userId
            };
        }
    }
}