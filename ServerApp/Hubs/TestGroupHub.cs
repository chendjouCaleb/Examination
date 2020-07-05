using System.Threading.Tasks;
using Exam.Entities;
using Microsoft.AspNetCore.SignalR;

namespace ServerApp.Hubs
{
    public interface ITestGroupHub
    {
        Task TestGroupStarted(TestGroup testGroup);

        Task TestGroupEnded(TestGroup testGroup);

        Task TestGroupRestarted(TestGroup testGroup);
    }
    
    public class TestGroupHub: Hub<ITestGroupHub> {}
}