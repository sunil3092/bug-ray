using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistance
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Effort> Efforts { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectContributor> ProjectContributors { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<ProjectContributor>(x => x.HasKey(pc => new { pc.AppUserId, pc.ProjectId }));

            builder.Entity<ProjectContributor>()
            .HasOne(u => u.AppUser)
            .WithMany(p => p.Contributors)
            .HasForeignKey(pc => pc.AppUserId);

            builder.Entity<ProjectContributor>()
            .HasOne(u => u.Project)
            .WithMany(p => p.Contributors)
            .HasForeignKey(pc => pc.ProjectId);
        }

    }
}