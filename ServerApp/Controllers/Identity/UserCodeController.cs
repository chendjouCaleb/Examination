using System;
using System.Linq;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Persistence;
using Exam.Entities.Identity;
using Exam.Infrastructure;
using Exam.Models.Identity;
using Exam.Persistence;
using Exam.Services.Emails;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Exam.Controllers.Identity
{
    
    [Route("api/users/code")]
    public class UserCodeController
    {
        private IdentityDataContext _dataContext;
        private IConfiguration _configuration;
        private IEmailSender _emailSender;

        public UserCodeController(
            IdentityDataContext dataContext,
            IEmailSender emailSender,
            IConfiguration configuration)
        {
            _dataContext = dataContext;
            _configuration = configuration;
            _emailSender = emailSender;
        }
        
        
        [HttpPost]
        [ValidModel]
        public void AddOrUpdate([FromBody] AddUserCodeForm form)
        {
            Assert.RequireNonNull(form, nameof(form));
            UserCode userCode = AddOrUpdate(form.EmailOrPhone);

             _emailSender.SendEmail(new EmailMessage(new[] {form.EmailOrPhone},
                "Code de confirmation", 
                $"Votre code de confirmation est {userCode.Code}"));
        }

        [HttpPut("check")]
        [ValidModel]
        public void CheckCode([FromBody] CheckCodeForm form)
        {
            Assert.RequireNonNull(form, nameof(form));
            CheckCode(form.EmailOrPhone, form.Code);
        }

        public UserCode AddOrUpdate(string emailOrPhone)
        {
            UserCode code = _dataContext.UserCodes.FirstOrDefault(u => u.EmailOrPhone == emailOrPhone);

            if (code != null)
            {
                code.Code = _GenerateCode();
                code.UpdateDate = DateTime.Now;
                _dataContext.Update(code);
                _dataContext.SaveChanges();
            }
            else
            {
                code = AddCode(emailOrPhone);
            }

            Console.WriteLine("Generated Code: " + code.Code);
            return code;
        }


        public UserCode CheckCode(string emailOrPhone, string code)
        {
            if (string.IsNullOrWhiteSpace(emailOrPhone))
            {
                throw new ArgumentNullException(nameof(emailOrPhone));
            }

            UserCode userCode = _dataContext.UserCodes.FirstOrDefault(u => u.EmailOrPhone == emailOrPhone);

            if (userCode == null)
            {
                throw new InvalidOperationException("{code.constraints.exists}");
            }

            if (userCode.Code != code)
            {
                throw new InvalidOperationException("{code.constraints.valid}");
            }

            return userCode;
        }

        public void DeleteCode(UserCode userCode)
        {
            Assert.RequireNonNull(userCode, nameof(userCode));
            _dataContext.UserCodes.Remove(userCode);
            _dataContext.SaveChanges();
        }

        public UserCode AddCode(string emailOrPhone)
        {
            if (string.IsNullOrWhiteSpace(emailOrPhone))
            {
                throw new ArgumentNullException(emailOrPhone);
            }

            UserCode userCode = new UserCode
            {
                EmailOrPhone = emailOrPhone,
                Code = _GenerateCode(),
                UpdateDate = DateTime.UtcNow
            };
            _dataContext.Add(userCode);
            _dataContext.SaveChanges();

            return userCode;
        }

        private string _GenerateCode()
        {
            return Guid.NewGuid().ToString().Substring(0, 5);
        }
    }
}