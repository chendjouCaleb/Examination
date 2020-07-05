using System.Threading.Tasks;
using Exam.Entities;
using Microsoft.AspNetCore.SignalR;

namespace ServerApp.Hubs
{
    public interface ITestGroupHub
    {
        Task TestStarted(TestGroup testGroup);

        Task TestEnded(TestGroup testGroup);

        Task TestRestarted(TestGroup testGroup);
    }
    
    public class TestGroupHub: Hub<ITestHub> {}
}