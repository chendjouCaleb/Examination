using Exam.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Exam.Persistence
{
    public class IdentityDataContext:IdentityDbContext<User>
    {
        public IdentityDataContext(DbContextOptions<IdentityDataContext> options)
            : base(options) { }

        public DbSet<UserCode> UserCodes { get; set; }
    }
}