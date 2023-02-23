using API.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Client> Clients { get; set; }

        public DbSet<Item> Items { get; set; }
        public DbSet<Package> Packages { get; set; }
        public DbSet<PackageItem> PackageItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PackageItem>()
            .HasKey(pi => new { pi.PackageId, pi.ItemId });

            modelBuilder.Entity<PackageItem>()
                .HasOne(pi => pi.Package)
                .WithMany(p => p.PackageItems)
                .HasForeignKey(pi => pi.PackageId);

            modelBuilder.Entity<PackageItem>()
                .HasOne(pi => pi.Item)
                .WithMany(i => i.PackageItems)
                .HasForeignKey(pi => pi.ItemId);

        }

    }
}
