using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Exam.Infrastructure
{
    public class AccessTokenValidator
    {
        private IConfiguration _configuration;
        private ILogger<AccessTokenValidator> _logger;


        public AccessTokenValidator(IConfiguration configuration, ILogger<AccessTokenValidator> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }
        
        
    }
}