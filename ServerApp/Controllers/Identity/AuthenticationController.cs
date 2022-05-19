using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Entities.Identity;
using Exam.Models;
using Exam.Models.Identity;
using Exam.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers.Identity
{
    [ApiController]
    [Route("api/authentication")]
    public class AuthenticationController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IdentityDataContext _dataContext;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly ILogger<AuthenticationController> _logger;


        public AuthenticationController(SignInManager<User> signInManager,
            UserManager<User> userManager,
            ILogger<AuthenticationController> logger,
            IdentityDataContext dataContext,
            IPasswordHasher<User> passwordHasher)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _dataContext = dataContext;
            
            _passwordHasher = passwordHasher;
            _logger = logger;
        }
        
        
        [HttpGet("isLogged")]
        public bool IsLogged()
        {
            return _signInManager.IsSignedIn(User);
        }

        
        [HttpGet("loggedUser")]
        public async Task<ActionResult> GetLoggedIn()
        {
           
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Console.WriteLine("UserId: " + userId);
            if (string.IsNullOrWhiteSpace(userId))
            {
                return NoContent();
            }
            
            User user = await _dataContext.Users.FindAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (user != null)
            {
                user.ImageUrl = user.ImageUrl = new Uri($"{Request.Scheme}://{Request.Host}{Request.PathBase}/api/users/{user.Id}/image");
            }

            return Ok(user);
        }
        


        
        [HttpPost]
        [ValidModel]
        public async Task<OkObjectResult> Login([FromBody] LoginModel model)
        {
            if (_signInManager.IsSignedIn(User))
            {
                throw new InvalidOperationException(User.FindFirst(ClaimTypes.Name) + " is already logged");
            }

            User user = await _userManager.FindByNameAsync(model.Id);

            if (user == null)
            {
                user = await _userManager.FindByEmailAsync(model.Id);
            }
            
            if (user == null)
            {
                throw new EntityNotFoundException( "{user.constraints.exists}");
            }

            if (PasswordVerificationResult.Success !=
                _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, model.Password))
            {
                throw new InvalidValueException("{user.invalidPassword}");
            }
            
            await _signInManager.SignInAsync(user, model.IsPersisted);
            
            _logger.LogInformation($"The user {user.FullName} is logged. Persisted = {model.IsPersisted}");

            return Ok(user);
        }

        
        [HttpPut("logout")]
        public StatusCodeResult Logout()
        {
            _signInManager.SignOutAsync();
            return NoContent();
        }
    }
}