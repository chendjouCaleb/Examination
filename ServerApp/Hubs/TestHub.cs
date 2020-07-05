using System.Threading.Tasks;
using Exam.Entities;
using Microsoft.AspNetCore.SignalR;

namespace ServerApp.Hubs
{
    public interface ITestHub
    {
        Task TestStarted(Test test);

        Task TestEnded(Test test);

        Task TestRestarted(Test test);
    }
    
    public class TestHub: Hub<ITestHub>
    {
        
    }
}