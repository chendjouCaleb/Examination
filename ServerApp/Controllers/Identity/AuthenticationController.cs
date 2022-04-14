using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Persistence;
using Exam.Entities.Identity;
using Exam.Models;
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
        private readonly IRepository<User, string> _userRepository;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly ILogger<AuthenticationController> _logger;


        public AuthenticationController(SignInManager<User> signInManager,
            ILogger<AuthenticationController> logger,
            IRepository<User, string> userRepository,
            IPasswordHasher<User> passwordHasher)
        {
            _signInManager = signInManager;
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _logger = logger;
        }
        
        
        [HttpGet("isLogged")]
        public bool IsLogged()
        {
            return _signInManager.IsSignedIn(User);
        }

        
        [HttpGet("loggedUser")]
        public User GetLoggedIn()
        {
           
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrWhiteSpace(userId))
            {
                return null;
            }
            
            User user = _userRepository.Find(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (user != null)
            {
                user.ImageUrl = user.ImageUrl = new Uri($"{Request.Scheme}://{Request.Host}{Request.PathBase}/api/users/{user.Id}/image");
            }

            return user;
        }
        


        
        [HttpPost]
        [ValidModel]
        public async Task<OkResult> Login([FromBody] LoginModel model)
        {
            if (_signInManager.IsSignedIn(User))
            {
                throw new InvalidOperationException(User.FindFirst(ClaimTypes.Name) + " is already logged");
            }

            string identifier = model.Email.ToUpperInvariant();
            User user = _userRepository.First(u => u.NormalizedEmail == identifier);

            if (user == null)
            {
                throw new EntityNotFoundException( "{user.constraints.exists}");
            }

            if (PasswordVerificationResult.Success !=
                _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, model.Password))
            {
                throw new InvalidValueException("Mot de passe incorrect");
            }
            
            await _signInManager.SignInAsync(user, model.IsPersisted);
            var cookieOptions = new CookieOptions( );
            if (model.IsPersisted)
            {
                
                cookieOptions.Expires = DateTimeOffset.Now.AddMonths(1);
            }

            _logger.LogInformation($"The user {user.FullName} is logged. Persisted = {model.IsPersisted}");

            return Ok();
        }

        
        [HttpPut("logout")]
        public StatusCodeResult Logout()
        {
            _signInManager.SignOutAsync();
            return NoContent();
        }
    }
}