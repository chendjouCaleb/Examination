using System.Threading.Tasks;
using Exam.Destructors;
using Exam.Entities;
using Microsoft.AspNetCore.SignalR;

namespace Exam.Hubs
{
    public interface ISchoolDestructorHub
    {
        Task Log(School school, string message);
    }
    
    
    public class SchoolDestructorHub: Hub<ISchoolDestructorHub> {}
}