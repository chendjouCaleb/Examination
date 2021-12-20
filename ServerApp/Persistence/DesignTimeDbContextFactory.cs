using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Exam.Persistence
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<PersistenceContext>
    {
        public PersistenceContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.production.json")
                .AddJsonFile("appsettings.Development.json")
                .Build();

            var builder = new DbContextOptionsBuilder<PersistenceContext>();

            builder.UseSqlServer(configuration["Data:ConnectionStrings:Database"]);
            //builder.UseSqlite(configuration["Data:SQLiteConnectionStrings"]);

            return new PersistenceContext(builder.Options);
        }
    }
}