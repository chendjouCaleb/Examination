using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Exam.Infrastructure
{
    public class AuthorizationMiddleware
    {
        private ILogger<AuthorizationMiddleware> _logger;
        private RequestDelegate nextDelegate;

        public AuthorizationMiddleware(ILogger<AuthorizationMiddleware> logger, RequestDelegate nextDelegate)
        {
            _logger = logger;
            this.nextDelegate = nextDelegate;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            Authorization authorization = new Authorization();
            httpContext.Items["Authorization"] = authorization;

            string bearerToken = httpContext.Request.Headers["Authorization"];

            if (string.IsNullOrWhiteSpace(bearerToken))
            {
                _logger.LogInformation("There are no access token");
                await nextDelegate.Invoke(httpContext);
                return;
            }

            string[] splitted = bearerToken.Split(" ");
            if (splitted.Length != 2)
            {
                _logger.LogDebug("The access token is malformed");
                await nextDelegate.Invoke(httpContext);
                return;
            }

            string accessToken = splitted[1];

            var handler = new JwtSecurityTokenHandler();

            var jsonToken = handler.ReadJwtToken(accessToken);

            string userId = jsonToken.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value;

            _logger.LogInformation($"Logged userId: {userId}");

            authorization.User = new User {Id = userId};
            authorization.UserId = userId;
            await nextDelegate.Invoke(httpContext);

        }
        
    }
    
    
    public static class AccessTokenMiddlewareExtension
    {
        public static void ParseAuthorization(this IApplicationBuilder app)
        {
            app.UseMiddleware<AuthorizationMiddleware>();
        }
    }
}