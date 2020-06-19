using System.Threading.Tasks;
using Exam.Entities;
using Microsoft.AspNetCore.SignalR;

namespace ServerApp.Hubs
{
    public interface IStudentHub
    {
        Task StudentCreated(Student student);
        Task StudentDeleted(Student student);
    }

    public class StudentHub : Hub<IStudentHub> { }
}