using System.Threading.Tasks;
using Exam.Entities;
using Microsoft.AspNetCore.SignalR;

namespace ServerApp.Hubs
{
    public interface ITestHub
    {
        Task TestCreated(Test test);
        
        Task TestDeleted(Test test);
        
        Task TestStarted(Test test);

        Task TestEnded(Test test);

        Task TestRestarted(Test test);
        
        Task TestClosed(Test test);
        
        Task TestOpened(Test test);
        
        Task TestPublished(Test test);
        
        Task TestUnPublished(Test test);
    }
    
    public class TestHub: Hub<ITestHub>
    {
        
    }
}