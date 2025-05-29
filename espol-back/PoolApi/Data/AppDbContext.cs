using PoolApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace PoolApi.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }

    }
}