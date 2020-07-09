using Microsoft.AspNetCore.SignalR;
using ServerApp.Hubs;

namespace ServerAppTest.Controllers
{
    public class StudentHubContext: IHubContext<StudentHub, IStudentHub>
    {
        public IHubClients<IStudentHub> Clients { get; }
        public IGroupManager Groups { get; }
    }
}