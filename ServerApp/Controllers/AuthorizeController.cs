using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Everest.AspNetStartup.Binding;
using Exam.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Exam.Controllers
{
    [Route("api/authorize")]
    public class AuthorizeController : ControllerBase
    {
        private AuthorizationConfiguration _configuration;

        public AuthorizeController(IConfiguration configuration)
        {
            _configuration = new AuthorizationConfiguration
            {
                BaseUri = configuration["Authorization:Url"],
                SecretCode = configuration["Authorization:SecretCode"],
                ClientId = configuration["Authorization:ClientId"]
            };
        }

        [HttpPost("accessToken")]
        public async Task<ObjectResult> Authorize([FromForm] string code)
        {
            if (string.IsNullOrWhiteSpace(code))
            {
                throw new ArgumentNullException(nameof(code));
            }
            
            var body = new Dictionary<string, string>();
            body.Add("SecretCode", _configuration.SecretCode);
            body.Add("ClientId", _configuration.ClientId);
            body.Add("code", code);
            
            HttpContent content = new FormUrlEncodedContent(body);

            HttpClient httpClient = new HttpClient();
            string uri = _configuration.BaseUri + "/accessToken";
            Console.WriteLine("Access token uri: " + uri + "/accessToken");
            var response = await httpClient.PostAsync(uri, content);

            if (response.IsSuccessStatusCode)
            {
                return Ok(await response.Content.ReadAsStringAsync());
            }

            return BadRequest(await response.Content.ReadAsStringAsync());
        }
        
        [ValidModel]
        [HttpPost("refreshToken")]
        public async Task<ObjectResult> Authorize([FromForm] RefreshTokenForm form)
        {
            if (form == null)
            {
                throw new ArgumentNullException(nameof(form));
            }
            
            var body = new Dictionary<string, string>( );
            body.Add("SecretCode", _configuration.SecretCode);
            body.Add("ClientId", _configuration.ClientId);
            body.Add("Code", form.Code);
            body.Add("RefreshToken", form.RefreshToken);
            body.Add("AccessToken", form.AccessToken);
            
            HttpContent content = new FormUrlEncodedContent(body);

            HttpClient httpClient = new HttpClient(); 
            var response = await httpClient.PostAsync(_configuration.BaseUri + "/refreshToken", content);

            if (response.IsSuccessStatusCode)
            {
                return Ok(await response.Content.ReadAsStringAsync());
            }

            return BadRequest(await response.Content.ReadAsStringAsync());
        }
    }
}