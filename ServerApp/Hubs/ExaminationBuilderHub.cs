using System.Threading.Tasks;
using Exam.Entities;
using Microsoft.AspNetCore.SignalR;

namespace Exam.Hubs
{
    public interface IExaminationBuilderHub
    {
        Task Log(Examination examination, string message);
    }
    
    
    public class ExaminationBuilderHub: Hub<IExaminationBuilderHub> {}
}