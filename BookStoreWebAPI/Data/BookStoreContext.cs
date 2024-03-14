using BookStoreWebAPI.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookStoreWebAPI.Data
{
    public class BookStoreContext : IdentityDbContext<ApplicationUser>
    {
        public BookStoreContext(DbContextOptions<BookStoreContext> options)
         : base(options)
        {
        }

        public DbSet<Books> Books { get; set; }


        //  public DbSet<ApplicationUser> ApplicationUsers { get; set; }


        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // {
        //     optionsBuilder.UseNpgsql("{PostgresConnectionString}");
        //     base.OnConfiguring(optionsBuilder);
        // }
    }
}