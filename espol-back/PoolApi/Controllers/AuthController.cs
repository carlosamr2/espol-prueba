using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PoolApi.Data;
using PoolApi.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;
    private readonly PasswordHasher<Usuario> _passwordHasher;

    public AuthController(AppDbContext context, IConfiguration config)
    {
        _context = context; _config = config; _passwordHasher = new PasswordHasher<Usuario>();
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserDto dto)
    {
        if (await _context.Usuarios.AnyAsync(u => u.Email == dto.Email))
            return BadRequest("El email ya est� registrado");

        var user = new Usuario
        {
            Name = dto.Name,
            Email = dto.Email,
            Username = dto.Email.Split('@')[0],
            Role = "Empleado"
        };

        user.PasswordHash = _passwordHasher.HashPassword(user, dto.Password);

        _context.Usuarios.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Cuenta creada correctamente" });
    }
    
}