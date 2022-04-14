using System;
using System.IO;
using System.Threading.Tasks;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Exceptions;
using Everest.AspNetStartup.Infrastructure;
using Exam.Authorizers;
using Exam.Entities.Identity;
using Exam.Infrastructure;
using Exam.Loaders;
using Exam.Models;
using Exam.Models.Identity;
using Exam.Persistence;
using Exam.Services.Emails;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using User = Exam.Entities.Identity.User;

namespace Exam.Controllers.Identity
{
    [Route("api/users")]
    public class UserController : Controller
    {
        private readonly IdentityDataContext _dataContext;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly UserCodeController _userCodeController;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IEmailSender _emailSender;

        public UserController(IdentityDataContext dataContext,
            IPasswordHasher<User> passwordHasher,
            UserManager<User> userManager,
            IEmailSender emailSender,
            UserCodeController userCodeController,
            IConfiguration configuration)
        {
            _userCodeController = userCodeController;
            _dataContext = dataContext;
            _userManager = userManager;
            _passwordHasher = passwordHasher;
            _configuration = configuration;
            _emailSender = emailSender;
        }

        [HttpGet("{userId}")]
        public async Task<User> Find(string userId)
        {
            User user = await _userManager.FindByIdAsync(userId);
            SetUserUri(user);

            return user;
        }


        [HttpGet("find")]
        public async Task<User> Find([FromQuery] string username, [FromQuery] string email,
            [FromQuery] string phoneNumber)
        {
            User user = null;
            if (username != null)
            {
                user = await _userManager.FindByNameAsync(username).ConfigureAwait(true);
            }

            if (email != null)
            {
                user = await _userManager.FindByEmailAsync(email).ConfigureAwait(true);
            }

            if (phoneNumber != null)
            {
                user = await _dataContext.Users.FirstOrDefaultAsync(a => a.PhoneNumber == phoneNumber);
            }

            SetUserUri(user);

            return user;
        }
        
        public async Task<bool> EmailExists(string email)
        {
            return await _dataContext.Users.AnyAsync(e => e.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
        }
        
        public async Task<bool> UserNameExists(string userName)
        {
            return await _dataContext.Users
                .AnyAsync(e => e.UserName.Equals(userName, StringComparison.OrdinalIgnoreCase));
        }

        public async Task<long> Count()
        {
            return await _dataContext.Users.CountAsync();
        }


        [ValidModel]
        [HttpPost]
        public async Task<User> Create([FromBody] AddUserModel model)
        {
            Assert.RequireNonNull(model, nameof(model));

            if (await EmailExists(model.Email))
            {
                throw new InvalidOperationException("{user.constraints.uniqueEmail}");
            }
            
            if (await UserNameExists(model.UserName))
            {
                throw new InvalidOperationException("{user.constraints.uniqueUserName}");
            }
            
            UserCode userCode = _userCodeController.CheckCode(model.Email, model.Code);

            User user = new User
            {
                RegistrationDate = DateTime.Now,
                FirstName = model.FirstName.ToLowerInvariant(),
                LastName = model.LastName.ToLowerInvariant(),
                Email = model.Email,
                EmailConfirmed = !string.IsNullOrWhiteSpace(model.Email),
                UserName = model.UserName,
                Gender = model.Gender,
                BirthDate = model.BirthDate,
                
                IsPrincipal = await Count() == 0
            };


            IdentityResult result = await _userManager.CreateAsync(user, model.Password).ConfigureAwait(true);

            if (result.Succeeded)
            {
                _userCodeController.DeleteCode(userCode);
                return user;
            }

            throw new InvalidOperationException(result.ToString());
        }


        [LoadUser]
        [IsPrincipal]
        [HttpPut("{userId}/block")]
        public StatusCodeResult Block(User user)
        {
            Assert.RequireNonNull(user, nameof(user));
            if (user.Blocked)
            {
                user.BlockedDate = null;
            }
            else
            {
                user.BlockedDate = DateTime.UtcNow;
            }

            _dataContext.Update(user);
            _dataContext.SaveChanges();
            return Ok();
        }

        [LoadUser]
        [IsPrincipal]
        [HttpPut("{userId}/principal")]
        public StatusCodeResult Principal(User user)
        {
            Assert.RequireNonNull(user, nameof(user));
            user.IsPrincipal = !user.IsPrincipal;

            _dataContext.Update(user);
            _dataContext.SaveChanges();

            return Ok();
        }

        /// <summary>
        /// Permet de modifier l'email de connexion d'un compte.
        /// </summary>
        /// <param name="user">Le compte dont on souhaite modifier l'email.</param>
        /// <param name="form">Le nouvel email du compte & le code de vérification.</param>
        /// <returns>Un <see>StatusCodeResult</see> de code 201 indiquant que l'email a été modifié.</returns>
        /// <response code="201">Si l'email est mis à jour.</response>
        /// <exception cref="InvalidValueException">Si l'email renseigné est déjà utilisé par un autre compte.</exception>
        [ValidModel]
        [Authorize]
        [LoadUser]
        [IsUser]
        [HttpPut("{userId}/email")]
        public async Task<StatusCodeResult> UpdateEmail(User user, [FromBody] UserEmailForm form)
        {
            Assert.RequireNonNull(user, nameof(user));
            Assert.RequireNonNull(form, nameof(form));

            if (await EmailExists(form.Email))
            {
                throw new InvalidValueException("{user.constraints.uniqueEmail}");
            }

            UserCode userCode = _userCodeController.CheckCode(form.Email, form.Code);

            user.Email = form.Email;
            await _userManager.SetEmailAsync(user, form.Email);
            _userCodeController.DeleteCode(userCode);

            return StatusCode(StatusCodes.Status200OK);
        }

        /// <summary>
        /// Permet de modifier le nom d'utilisateur d'un compte.
        /// </summary>
        /// <param name="user">Le compte dont on souhaite modifier le nom d'utilisateur.</param>
        /// <param name="username">Le nouveau nom d'utilisateur du compte.</param>
        /// <returns>Un <see>StatusCodeResult</see> de code 201 indiquant que le nom d'utilisateur
        /// a été modifié.</returns>
        /// <response code="400"></response>
        /// <exception cref="InvalidValueException">Si le nom d'utilisateur renseigné 
        /// est déjà utilisé par un autre compte.</exception>
        [Authorize]
        [LoadUser]
        [IsUser]
        [HttpPut("{userId}/username")]
        public async Task<StatusCodeResult> UpdateUsername(User user, [FromQuery] string username)
        {
            Assert.RequireNonNull(user, nameof(user));
            if (string.IsNullOrWhiteSpace(username))
            {
                throw new ArgumentNullException(nameof(username));
            }

            if (await UserNameExists(username))
            {
                throw new InvalidValueException("{user.constraints.userName}");
            }

            await _userManager.SetUserNameAsync(user, username);

            return StatusCode(202);
        }

        /// <summary>
        /// Permet de modifier les informations d'état civil d'un compte.
        /// </summary>
        /// <param name="user">Le compte à modifier.</param>
        /// <param name="info">Les nouvelles informations du compte.</param>
        /// <returns>Le compte avec ses nouvelles informations.</returns>
        [Authorize]
        [LoadUser]
        [IsUser]
        [HttpPut("{userId}/info")]
        [ValidModel]
        public async Task<User> UpdateInfo(User user, [FromBody] UserInfoForm info)
        {
            Assert.RequireNonNull(user, nameof(user));
            Assert.RequireNonNull(info, nameof(info));

            user.FirstName = info.FirstName;
            user.LastName = info.LastName;
            user.BirthDate = info.BirthDate;
            user.Gender = info.Gender;

            _dataContext.Update(user);
            await _dataContext.SaveChangesAsync();

            return user;
        }


        /// <summary>
        /// Permet de modifier le mot de passe d'un compte.
        /// </summary>
        /// <param name="user">Le compte à modifier.</param>
        /// <param name="model">Les informations sur na nouvelle adresse du compte.</param>
        /// <returns>Un <see>StatusCodeResult</see> de code 201 indiquant que le mot de passe 
        /// a été modifié.</returns>
        [Authorize]
        [LoadUser]
        [IsUser]
        [ValidModel]
        [HttpPut("{userId}/password")]
        public StatusCodeResult ChangePassword(User user, [FromBody] UpdatePasswordModel model)
        {
            Assert.RequireNonNull(user, nameof(user));
            Assert.RequireNonNull(model, nameof(model));

            if (PasswordVerificationResult.Success !=
                _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, model.CurrentPassword))
            {
                throw new InvalidValueException("Votre mot de passe actuel est incorrect");
            }

            _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
            return StatusCode(StatusCodes.Status200OK);
        }


        /// <summary>
        ///     Permet de vérifier que le mot de passe fourni est celui qui compte fourni.
        /// </summary>
        /// <param name="user">Le compte à vérifier.</param>
        /// <param name="password">Le mot de passe à vérifier.</param>
        /// <returns>
        ///     <code>true</code> Si le mot de passe est bien celui du compte.
        /// </returns>
        /// 
        [LoadUser]
        [HttpPut("{userId}/password/check")]
        public bool CheckPassword(User user, [FromForm] string password)
        {
            Assert.RequireNonNull(user, nameof(user));

            if (string.IsNullOrEmpty(password))
            {
                return false;
            }

            return PasswordVerificationResult.Success ==
                   _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
        }


        /// <summary>
        /// Pour réinitialiser le mot de passe d'un compte.
        /// Celà peut arriver si le propriétaire du compte perd son mot de passe.
        /// </summary> 
        /// <param name="model">Contient le code de réinitialisation et le nouveau mot de passe.</param>
        /// <exception cref="InvalidValueException">Si le code de réinitialisation renseigné
        /// n'est pas celui assigné au compte.</exception>
        /// 
        /// <exception cref="InvalidOperationException"> Si le code de réinitialisation est expiré soit 
        /// 10 minutes après sa création.</exception>
        /// 
        /// <returns>Un <see>StatusCodeResult</see> de code 201 indiquant que le mot de passe 
        /// a été modifié.</returns>
        /// 
        [HttpPut("password/reset")]
        [ValidModel]
        public async Task<StatusCodeResult> ResetPassword([FromBody] ResetPasswordForm model)
        {
            Assert.RequireNonNull(model, nameof(model));

            User user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Email == model.Email);

            if (user == null)
            {
                throw new ElementNotFoundException($"There is not user with {model.Email} as email");
            }

            await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
            return StatusCode(202);
        }


        [HttpPut("password/resetToken")]
        [ValidModel]
        public async Task<OkResult> ResetPasswordCode([FromQuery] string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                throw new ArgumentNullException(nameof(email));
            }

            User user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                throw new ElementNotFoundException($"There is not user with {email} as phone or email");
            }

            string token = await _userManager.GeneratePasswordResetTokenAsync(user);

            Console.WriteLine("Reset password token: " + token);
            _emailSender.SendEmail(new EmailMessage(new[] {email},
                "Code de confirmation",
                $"Votre code de réinitialisation est : <br><br> {token}"));

            return Ok();
        }

        [HttpPut("password/checkResetToken")]
        [ValidModel]
        public async Task<OkObjectResult> CheckResetPasswordCode([FromBody] VerifyResetTokenForm form)
        {
            Assert.RequireNonNull(form, nameof(form));

            User user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Email == form.Email);

            if (user == null)
            {
                throw new ElementNotFoundException($"There is not user with {form.Email} as email");
            }

            var isCorrect = await _userManager
                .VerifyUserTokenAsync(user, _userManager.Options.Tokens.PasswordResetTokenProvider, "ResetPassword",
                    form.Token);

            return Ok(isCorrect);
        }

        /// <summary>
        /// Permet de télécharger l'image d'un compte.
        /// </summary>
        /// <param name="user">Le compte dont on souhaite obtenir l'image.</param>
        /// <returns>Le fichier qui est l'image du compte.</returns>
        [LoadUser]
        [HttpGet("{userId}/image")]
        public async Task<IActionResult> DownloadImage(User user)
        {
            Assert.RequireNonNull(user, nameof(user));
            if (!user.HasImage)
            {
                return NoContent();
            }

            string imageName = user.Id + ".png";
            string path = Path.Combine(_configuration["File:Paths:UserImages"], imageName);
            Stream memory = new MemoryStream();

            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory).ConfigureAwait(true);
            }

            memory.Position = 0;
            string mime = MimeTypes.GetMimeType(Path.GetExtension(path));
            return File(memory, mime, user.ImageName);
        }


        /// <summary>
        /// Permet de changer l'image d'un compte.
        /// </summary>
        /// <param name="user">Le compte à modifier.</param>
        /// <param name="image">Fichier image venant d'un formulaire et qui est la nouvelle image.</param>
        ///
        /// <returns>
        ///     Un <see>StatusCodeResult</see> de code 201 indiquant que l'image a été modifié.
        /// </returns>
        [HttpPut("{userId}/image")]
        [Authorize]
        [LoadUser]
        [IsUser]
        public async Task<StatusCodeResult> ChangeImage(User user, IFormFile image)
        {
            string fileName = user.Id + Path.GetExtension(image.FileName);

            string path = Path.Combine(_configuration["File:Paths:UserImages"], fileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await image.CopyToAsync(stream).ConfigureAwait(false);
            }

            user.HasImage = true;

            _dataContext.Users.Update(user);
            await _dataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{userId}")]
        [LoadUser]
        [IsUser]
        public async Task<StatusCodeResult> Delete(User user)
        {
            await _userManager.DeleteAsync(user);
            return NoContent();
        }


        public void SetUserUri(User user)
        {
            user.Url = GetUserUri(user.Id);
            if (user.HasImage)
            {
                user.ImageUrl = new Uri($"{GetUserUri(user.Id)}/image");
            }
        }

        public Uri GetUserUri(string userId)
        {
            return new Uri($"{Request.Scheme}://{Request.Host}{Request.PathBase}/api/users/{userId}");
        }
    }
}