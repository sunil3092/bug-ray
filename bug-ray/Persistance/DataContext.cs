using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistance
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Effort> Efforts { get; set; }
        public DbSet<Project> Projects { get; set; }
    }
}