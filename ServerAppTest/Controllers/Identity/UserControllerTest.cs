using System;
using System.Threading.Tasks;
using Exam.Controllers.Identity;
using Exam.Entities.Identity;
using Exam.Models;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ServerAppTest.Controllers.Identity
{
    public class UserControllerTest
    {
        private UserController _userController;


        [SetUp]
        public void BeforeEach()
        {
            ServiceConfiguration.InitServiceCollection();
            IServiceProvider serviceProvider = ServiceConfiguration.BuildServiceProvider();
            _userController = serviceProvider.GetRequiredService<UserController>();
        }


        [Test]
        public async Task AddUser()
        {
            AddUserModel model = new AddUserModel
            {
                FirstName = "Chendjou",
                LastName = "Caleb",
                Password = "123456",
                UserName = "chendjou",
                Email = "chendjou2016@outlook.fr"
            };

           User user = await _userController.Create(model);
           
           Assert.NotNull(user.Id);
           
           Assert.AreEqual(model.FirstName.ToLower(), user.FirstName);
           Assert.AreEqual(model.LastName, user.LastName);
           Assert.AreEqual(model.UserName, user.UserName);
           Assert.AreEqual(model.Email, user.Email);
        }
    }
}